<template>
    <div class="input-text"
         v-bind:class="{'input-text-active': this.focus}"
         @mouseenter.stop="enter"
         @mouseleave.stop="leave"
         v-clickOutSide.stop="closeOptions"
    >
        <input
            :value="value"
            type="text"
            :name="name"
            :placeholder="placeholder"
            :disabled="disabled === true"
            @input="onInput"
            @focus="onfocus"
            @blur="onblur"
            autocomplete="off"
            :style="paddingStyle"
        />
        <span class="el-input-close" v-if="this.showClearIcon" ref="inputTextClose">
            <i class="fa fa-times-circle form-clear-Icon" aria-hidden="true" @click.stop="close"></i>
        </span>
        <span class="input-length input-text-length" :style="this.lengthStyle" v-if="this.max" ref="inputTextLength">
            {{value.length}}/{{max}}
        </span>
        <transition name="slide">
            <scroll-container :height="220" v-if="fetchSuggestions" class="input-select-container">
                <slot name="optionPrefix"></slot>
                <ul
                    class="input-select-options"
                    v-if="fetchSuggestions && config.options.length > 0"
                >
                    <SelectOption
                        v-for="option in config.options"
                        :option="option"
                        :active="isActive(option)"
                        @onClick="onchecked"
                    >
                    </SelectOption>
                </ul>
                <slot name="optionSuffix"></slot>
                <slot></slot>
            </scroll-container>
        </transition>
    </div>
</template>

<script>

    import ScrollContainer from '../../basic/ScrollContainer.vue';
    import SelectOption from './select/Option.vue';
    import Vue from 'vue';
    import ClickOutSide from '../../../utils/ClickOutSide';
    Vue.use(ClickOutSide);

    export default {
        name: 'inputText',
        props: {
            config: {
                type: Object,
            }
        },
        data() {
            return {
                show: false,
                focus: false,
                fetchSuggestions: false,
                options: [],
                optionsAll: [],
                currentValue: this.config.value,
                paddingStyle: {}
            }
        },
        computed: {
            value: {
                get() {
                    return this.config.value;
                },
                set(v) {
                    this.currentValue = v;
                    this.config.value = v;
                }
            },
            placeholder() {
                return this.config.placeHolder;
            },
            disabled() {
                return this.config.disabled;
            },
            name() {
                return this.config.name;
            },
            max() {
                return this.config.max || false;
            },
            showClearIcon() {
                return this.config.clearable && this.show;
            },
            lengthStyle() {
                return {
//                    display: this.focus ? 'inline-block' : 'none',
                    right: this.showClearIcon ? '32px' : '8px',
                }
            }
        },
        methods: {
            changePaddingStyle() {
                let paddingRight = 0;
                if (this.showClearIcon) {
                    paddingRight += 30;
                }
                if (this.config.max) {
                    paddingRight += this.$refs.inputTextLength.offsetWidth;
                }
                if ((this.config.clearable && this.show) || this.config.max) {
                    paddingRight = (paddingRight + 10)+"px";
                }
                Vue.set(this.paddingStyle, 'paddingRight', paddingRight);
            },
            onInput (e) {
                const value = e.target.value;
                this.show = value !== '';
                let res = true;
                if (typeof this.config.onChange === 'function') {
                    res = this.config.onChange(value,{});
                }
                const oldV = this.currentValue;
                this.value = value;
                if (res === false) {
                    this.value = oldV;
                }
                else if (this.max) {
                    if (value.length > this.max) {
                        this.value = oldV;
                    }
                }
                if (this.config.fetchSuggestions && !this.config.triggerOnFocus) {
                    this.openOptions();
                }
                this.$emit('onChange', {value: this.value, name: this.config.name});
                this.changePaddingStyle();
            },
            enter() {
                if (this.config.value) {
                    this.show = true;
                    this.changePaddingStyle();
                }
            },
            leave() {
                this.show = false;
                this.changePaddingStyle();
            },
            close() {
                this.$emit('onChange', {value: ''});
            },
            openOptions() {
                this.fetchSuggestions = true;
            },
            closeOptions() {
                this.fetchSuggestions = false;
            },
            onfocus() {
                this.focus = true;
                if (this.config.fetchSuggestions && this.config.triggerOnFocus) {
                    this.openOptions();
                }
                if (typeof this.config.onFocus === 'function') {
                    this.config.onFocus(this.value);
                }
            },
            onblur() {
                this.focus = false;
            },
            isActive(option) {
                return this.value == option.value;
            },
            onchecked(option) {
                let res = true;
                if (typeof this.config.onChange === 'function') {
                    res = this.config.onChange(option.label, option);
                }
                if (res === false) {
                    return false;
                }
                this.$emit('onChange', {value: option.label, name: this.config.name});
                this.closeOptions();
                return true;
            },
            loadData(url, str) {
                // 根据url, post 或者get 请求 需重新定义
                // 此处实现的是模拟
                if (!this.config.fetchSuggestions) {
                    return false;
                }
                // 如果url 存在，则查询url中的数据，如果url不存在则使用config 中的数据
                if (url) {
                    if (str) {
                        let optionsAll = this.optionsAll;
                        return optionsAll.length && optionsAll.filter((item) => {
                            return String(item.value).toLowerCase().indexOf(str.toLowerCase()) === 0;
                        });
                    } else {
                        return [
                            {
                                key: 2,
                                label: '121',
                                value: 121,
                                disabled: false
                            },
                            {
                                key: 3,
                                label: '131',
                                value: 131,
                                disabled: false
                            },
                            {
                                key: 4,
                                label: '1311',
                                value: 1311,
                                disabled: false
                            },
                            {
                                key: 5,
                                label: '1211',
                                value: 1211,
                                disabled: false
                            },
                            {
                                key: 6,
                                label: '6',
                                value: 6,
                                disabled: false
                            },
                            {
                                key: 7,
                                label: '711',
                                value: 711,
                                disabled: false
                            },
                        ];
                    }
                } else {
                    if (str) {
                        let optionsAll = this.config.options;
                        return optionsAll.length && optionsAll.filter((item) => {
                            return String(item.value).toLowerCase().indexOf(str.toLowerCase()) === 0;
                        });
                    } else {
                        return  this.config.options;
                    }
                }

            }
        },
        created() {
            this.$emit('onChange', {value: this.config.value || ''});
        },
        mounted() {
            this.changePaddingStyle();
        },
        components: {
            SelectOption,
            ScrollContainer
        }
    }
</script>
