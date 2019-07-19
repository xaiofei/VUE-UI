<template>
    <div class="picker">
        <!--顶部文本框-->
        <div
            class="picker-text"
            :class="[
                showPicker ? 'focus' : '',
                disabled ? 'disabled' : ''
            ]"
            @click="clickTextBox"
        >
            <input
                type="text"
                :value="currentFormatDataTime"
                :readonly="readonly"
                :disabled="disabled"
                @focus="onFocus"
                @blur="onBlur"
                @keyup.enter="onEnter"
            >
            <i class="fa fa-calendar picker-icon" aria-hidden="true"></i>
        </div>
        <!--主体区域-->
        <transition name="slide">
            <div class="picker-content" v-if="showPicker" v-clickOutSide="closePicker">
                <!--单个picker-->
                <date-picker-item :format="format" :datetime="currentDateTime" @onChange="onDateTimeChange"></date-picker-item>
            </div>
        </transition>
    </div>
</template>

<script>
    import DatePickerItem from './DatePickerItem.vue';
    import ClickOutSide from '../../utils/ClickOutSide';
    import Vue from 'vue';
    import { pattern } from './Date';
    Vue.use(ClickOutSide);

    export default {
        name: 'DatePicker',
        props: {
            // 传递一个日期时间，可以为Date对象也可以为格式化字符串，默认当前时间
            datetime: {
                type: [String, Date],
                default() {
                    return new Date();
                }
            },
            // 格式化
            format: {
                type: String,
                default: 'yyyy-MM-dd HH:mm:ss'
            },
            // 是否只读，仅允许复制
            readonly: {
                type: Boolean,
                default: false
            },
            // 是否禁用，禁止复制
            disabled: {
                type: Boolean,
                default: false
            },
            // 是否支持直接编辑文本框
            editable: {
                type: Boolean,
                default: true
            },
            // 是否支持一键清除值 TODO 优先级比较低，先不做
            clearable: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                // 是否显示时间选择界面
                showPicker: false,
                // 临时记录时间值
                tempDateTime: this.datetime
            };
        },
        computed: {
            // 当前日期对象
            currentDateTime: {
                get() {
                    if (this.tempDateTime instanceof Date) {
                        return this.tempDateTime;
                    }
                    return new Date(this.tempDateTime);
                },
                set(v) {
                    this.tempDateTime = v;
                }
            },
            // 格式化后的日期字符串
            currentFormatDataTime() {
                return pattern(this.format, this.currentDateTime);
            }
        },
        methods: {
            /**
             * Input获得焦点
             */
            onFocus() {
//                this.isFocus = true;
            },
            /**
             * input失去焦点
             * @param {Event} e 事件对象
             */
            onBlur(e) {
                this.changeCurrentDateTime(e.target.value);
            },
            /**
             * 按下回车键
             * @param {Event} e 事件对象
             */
            onEnter(e) {
                this.changeCurrentDateTime(e.target.value);
                this.showPicker = false;
                e.target.blur();
            },
            changeCurrentDateTime(v) {
                if (!this.editable) {
                    return false;
                }
                const newDate = new Date(v);
                if ('Invalid Date' === newDate.toString()) {
                    return false;
                }
                this.currentDateTime = newDate;
                // TODO 触发onChange 方法
            },
            /**
             * 点击了文本显示区域
             */
            clickTextBox() {
                if (this.readonly) {
                    return false;
                }
                if (this.disabled) {
                    return false;
                }
                this.showPicker = true;
            },
            closePicker() {
                this.showPicker = false;
            },
            onDateTimeChange({date}) {
                this.currentDateTime = date;
                this.$emit('onChange', {date, format: this.currentFormatDataTime});
            }
        },
        watch: {
            datetime(val, oldVal) {
                this.currentDateTime = val;
            }
        },
        mounted() {

        },
        components: {
            DatePickerItem
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
