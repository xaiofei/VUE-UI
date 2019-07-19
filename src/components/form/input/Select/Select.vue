<template>
        <div class="input-select"
             :class="{disabled: disabled === true}"
             v-clickOutSide="closeOptions"
        >
            <!--input box-->
            <div
                class="input-select-text"
                :class="{disabled: disabled, focus: showOptions}"
                @click="toggleOptions"
                @mouseenter.stop="enter"
                @mouseleave.stop="leave"
            >
                <div v-if="multiple && !showMultipCollapseText">
                    <Tag
                        v-for="(item, index) in value"
                        :key="index"
                        @onClose="removeItem(item)"
                        closeable
                    >
                        {{optionsObject[item]}}
                    </Tag>
                </div>
                <div v-if="showMultipCollapseText">
                    {{multipCollapseText}}
                </div>
                <input
                    class="input-select-input"
                    type="text"
                    :placeholder="placeholder"
                    :value="inputValue"
                    :readonly="!filterable"
                    :disabled="disabled"
                    v-if="showInputComponent"
                    @input="onInputChange"
                />
                <span class="input-select-clear" :class="{disabled: disabled}" v-show="showClearIcon">
                    <i class="fa fa-times-circle form-clear-Icon" aria-hidden="true" @click.stop="clearValue"></i>
                </span>
                <span class="input-select-clear" :class="{disabled: disabled}" v-show="!showClearIcon">
                    <i
                        class="fa form-clear-Icon"
                       :class="[showOptions ? 'fa-angle-up' : 'fa-angle-down']"
                        aria-hidden="true"
                    >
                    </i>
                </span>
            </div>
            <!--options list-->
            <transition name="slide">
                <scroll-container :height="186" v-if="showOptions" class="input-select-container">
                    <ul
                        class="input-select-options"
                    >
                        <SelectOption
                            v-if="multiple && checkAll"
                            @onClick="clickSelectAll"
                            :active="isCheckedAll"
                            :multiple="multiple"
                            class="underline"
                        >
                            全部
                        </SelectOption>
                        <SelectOption
                            v-for="(option, index) in filteredOptions"
                            :key="option.key || index"
                            :option="option"
                            :active="isActive(option)"
                            :multiple="multiple"
                            @onClick="onChange"
                        >
                        </SelectOption>
                    </ul>
                </scroll-container>
            </transition>
        </div>
</template>
<script>
    import Vue from 'vue';
    import SelectOption from './Option.vue';
    import Tag from '../../../basic/Tag.vue';
    import CheckBox from '../../../basic/CheckBox.vue';
    import ClickOutSide from '../../../../utils/ClickOutSide';
    import ScrollContainer from '../../../basic/ScrollContainer.vue';
    Vue.use(ClickOutSide);

    export default {
        name: 'InputSelect',
        props: {
            config: {
                type: Object
            }
        },
        data() {
            return {
                showOptions: false,
                showClearIcon: false,
                filterString: '',
            };
        },
        computed: {
            placeholder() {
                return this.config.placeHolder;
            },
            disabled() {
                return this.config.disabled;
            },
            /**
             * 计算value，自动返回字符串或数组
             */
            value: {
                get() {
                    const value = this.config.value;
                    if (!this.multiple) {
                        return value;
                    }
                    if (Array.isArray(value)) {
                        return value;
                    }
                    return [];
                },
                set(v) {
                    if (!this.multiple) {
                        this.config.value = v;
                    }
                    else {
                        // 若v是数组则直接替换
                        if (Array.isArray(v)) {
                            this.config.value = v;
                            return;
                        }
                        let value = this.config.value;
                        value = Array.isArray(value) ? value : [];

                        // 如果有value需要判断是否重复
                        if (value.includes(v)) {
                            this.config.value = value.filter(i => i != v);
                        }
                        else {
                            this.config.value = [...value, v];
                        }
                    }

                }
            },
            options() {
                return this.config.options || [];
            },
            /**
             * 过滤后的options
             */
            filteredOptions() {
                return this.config.options.filter(i => new RegExp(`${this.filterString}`).test(i.label));
            },
            multiple() {
                return this.config.multiple || false;
            },
            filterable() {
                return this.config.filterable || false;
            },
            clearable() {
                return typeof this.config.clearable === 'boolean' ? this.config.clearable : true;
            },
            checkAll() {
                return typeof this.config.checkAll === 'boolean' ? this.config.checkAll : true;
            },
            /**
             * 是否需要折叠多选标签
             * @return {boolean|number}
             */
            collapseTags() {
                let v = this.config.collapseTags || false;
                if (typeof v === 'boolean') {
                    return v ? 3 : false;
                }
                v = parseInt(v, 10);
                return isNaN(v) ? 3 : v;
            },
            /**
             * 将选项转成对象，方便索引
             * @return {Object}
             */
            optionsObject() {
                let obj = {};
                this.options.forEach(item => {
                    obj[item.value] = item.label;
                });
                return obj;
            },
            /**
             * 获取单选值
             * @return {string}
             */
            singleValue() {
                return this.optionsObject[this.value];
            },
            /**
             * 获取多选值（数组）
             * @return {Array}
             */
            multipleValue() {
                return this.value.map(i => this.optionsObject[i]);
            },
            /**
             * 值是否为空
             * @return {boolean}
             */
            isEmpty() {
                if (this.multiple) {
                     return this.value.length <= 0;
                }
                else {
                    return this.value === '';
                }
            },
            /**
             * 是否选择了全部值
             */
            isCheckedAll: {
                set(v) {
                    if (v === true) {
                        // select all
                        let tempSet = new Set(this.value);
                        this.filteredOptions.forEach(i => {
                            tempSet.add(i.value);
                        });
                        this.value = [...tempSet];
                    }
                    else {
                        // cancel all
                        let tempSet = new Set(this.value);
                        this.filteredOptions.forEach(i => {
                            tempSet.delete(i.value);
                        });
                        this.value = [...tempSet];
                    }
                    this.$emit('onChange', {value: this.value, item: {}});
                },
                get() {
                    // 检测filterOptions的值是否被全选中了
                    return this.filteredOptions.every(i => this.value.includes(i.value));
                }
            },
            /**
             * 是否显示多选模式下的标签折叠文本
             * @return {boolean}
             */
            showMultipCollapseText() {
                if (this.multiple) {
                    if (this.isEmpty) {
                        return true;
                    }
                    if (this.collapseTags) {
                        return this.multipleValue.length > this.collapseTags;
                    }
                    return false;
                }
                return false;
            },
            /**
             * Input文本输入框的值
             * @return {string}
             */
            inputValue() {
                if (this.multiple) {
                    return this.filterString;
                }
                return this.filterString || this.singleValue;
            },
            /**
             * 多选标签折叠后的文字
             * @return {string}
             */
            multipCollapseText() {
                if (this.multiple) {
                    return this.multipleValue.length > this.collapseTags ? `已选择${this.multipleValue.length}项` : '';
                }
                return '';
            },
            /**
             * 是否显示文本输入框
             * 多选模式下能够搜索时显示
             * 单选模式下始终显示
             */
            showInputComponent() {
                if (this.multiple) {
                    return this.filterable || this.isEmpty;
                }
                return true;
            }
        },
        methods: {
            /**
             * Select值变化
             * @param {Object} option
             * @return {boolean}
             */
            onChange(option) {
                let res = true;
                if (typeof this.config.beforeChanged === 'function') {
                    if (this.config.beforeChanged(option.value, option) === false) {
                        res = false;
                    }
                }
                if (res === false) {
                    return false;
                }
                this.value = option.value;
                this.config.onChange(option.value, option);
                this.$emit('onChange', {value: this.value, item: option});
                // 单选模式下关闭选框
                // 同时清空搜索字符串
                if (this.multiple === false) {
                    this.filterString = '';
                    this.closeOptions();
                }
                return true;
            },
            /**
             * 切换下拉选框开启/关闭
             * @return {boolean}
             */
            toggleOptions(e) {
                if (this.disabled) {
                    return false;
                }
                // 搜索模式下，如果点击了文本框
                // 不执行隐藏选框操作
                if (this.filterable && e.target.className === 'input-select-input') {
                    this.showOptions = true;
                    return true;
                }
                this.showOptions = !this.showOptions;
                return true;
            },
            /**
             * 打开下拉选框
             */
            openOptions() {
                this.showOptions = true;
            },
            /**
             * 关闭下拉选框
             */
            closeOptions() {
                // 清空搜索字符串
                this.filterString = '';
                // 关闭选框
                this.showOptions = false;
            },
            /**
             * 选项值是否是选中状态
             */
            isActive(option) {
                if (this.multiple) {
                    return this.value.includes(option.value);
                }
                return this.value == option.value;
            },
            /**
             * 移除多选选项
             * @param {string} v
             */
            removeItem(v) {
                if (this.disabled) {
                    return false;
                }
                let res = true;
                if (typeof this.config.beforeChanged === 'function') {
                    if (this.config.beforeChanged(v) === false) {
                        res = false;
                    }
                }
                if (res === false) {
                    return false;
                }
                this.value = v;
                this.config.onChange(v);
                this.$emit('onChange', {value: this.value, item: {}});
                return true;
            },
            /**
             * 鼠标移入事件，显示/隐藏清除按钮
             */
            enter() {
                if (this.clearable) {
                    this.showClearIcon = !this.isEmpty;
                }
            },
            /**
             * 鼠标移出事件，显示/隐藏清除按钮
             */
            leave() {
                this.showClearIcon = false;
            },
            /**
             * 点击了清除按钮，清除Select value
             */
            clearValue() {
                if (this.disabled) {
                    return false;
                }
                if (this.multiple) {
                    this.value = [];
                    this.$emit('onChange', {value: [], item: {}});
                }
                else {
                    this.value = '';
                    this.$emit('onChange', {value: '', item: {}});
                }
                this.filterString = '';
                return true;
            },
            /**
             * 点击了多选模式下的选择全部
             */
            clickSelectAll() {
                this.isCheckedAll = !this.isCheckedAll;
            },
            /**
             * InputText变化，准备搜索字符串
             * @param e
             */
            onInputChange(e) {
                this.filterString = e.target.value;
            },
        },
        watch: {
            disabled(val) {
                if (val === true) {
                    this.closeOptions();
                }
            }
        },
        created() {
            this.$emit('onChange', {value: this.value, item: this.options.find(i => i.value == this.value)});
        },
        components: {
            SelectOption,
            Tag,
            CheckBox,
            ScrollContainer
        }
    }
</script>

<style scoped lang="less">
    .slide-enter, .slide-leave-to {
        max-height: 0px;
        opacity: 0.5;
    }
    .slide-enter-to, .slide-leave {
        max-height: 186px;
        opacity: 1;
    }
    .slide-enter-active, .slide-leave-active {
        transition: all .2s ease-in-out;
    }
</style>
