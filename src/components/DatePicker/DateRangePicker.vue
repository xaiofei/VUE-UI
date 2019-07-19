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
                :value="selectedDataTime"
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
                <div class="quick-btns">
                    <span class="q-btn" @click="quickSelectDate(0)">今天</span>
                    <span class="q-btn" @click="quickSelectDate(1)">昨天</span>
                    <span class="q-btn" @click="quickSelectDate(6)">最近7天</span>
                    <span class="q-btn" @click="quickSelectDate(29)">最近30天</span>
                </div>
                <date-picker-item :format="format" :datetime="currentDateTime" @onChange="onCurDateTimeChange"></date-picker-item>
                <date-picker-item :format="format" :datetime="targetDateTime" @onChange="onTarDateTimeChange"></date-picker-item>
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
        name: 'DateRangePicker',
        props: {
            // 传递一个日期时间，可以为Date对象也可以为格式化字符串，默认当前时间
            curDateTime: {
                type: [String, Date],
                default() {
                    return new Date();
                }
            },
            tarDateTime: {
                type: [String, Date],
                default() {
                    return new Date();
                }
            },
            splitStr: {
                type: String,
                default: ' ~ '
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
                // 临时记录当前时间值
                tempCurDateTime: this.curDateTime,
                // 临时记录目标时间值
                tempTarDateTime: this.tarDateTime
            };
        },
        computed: {
            // 当前日期对象
            currentDateTime: {
                get() {
                    if (this.tempCurDateTime instanceof Date) {
                        return this.tempCurDateTime;
                    }
                    return new Date(this.tempCurDateTime);
                },
                set(v) {
                    this.tempCurDateTime = v;
                }
            },
            // 格式化后的日期字符串
            currentFormatDataTime() {
                return pattern(this.format, this.currentDateTime);
            },
            // 目标日期对象
            targetDateTime: {
                get() {
                    if (this.tempTarDateTime instanceof Date) {
                        return this.tempTarDateTime;
                    }
                    return new Date(this.tempTarDateTime);
                },
                set(v) {
                    this.tempTarDateTime = v;
                }
            },
            // 格式化后的日期字符串
            targetFormatDataTime() {
                return pattern(this.format, this.targetDateTime);
            },
            // 输入框显示内容
            selectedDataTime() {
                let _cur = +new Date(this.currentDateTime);
                let _tar = +new Date(this.targetDateTime);

                let ret = _cur > _tar ? (this.targetFormatDataTime + this.splitStr + this.currentFormatDataTime) : (this.currentFormatDataTime + this.splitStr + this.targetFormatDataTime);

                return ret;
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
                this.changeDateTime(e.target.value);
            },
            /**
             * 按下回车键
             * @param {Event} e 事件对象
             */
            onEnter(e) {
                this.changeDateTime(e.target.value);
                this.showPicker = false;
                e.target.blur();
            },
            changeDateTime(v) {
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

                let _cur = +new Date(this.currentDateTime);
                let _tar = +new Date(this.targetDateTime);

                if (_cur > _tar) {
                    this.tempCurDateTime = new Date(_tar);
                    this.tempTarDateTime = new Date(_cur);
                }
            },
            onCurDateTimeChange({date}) {
                let _this = this;
                this.currentDateTime = date;

                this.$emit('onChange', {date, value: _this.selectedDataTime});
            },
            onTarDateTimeChange({date}) {
                let _this = this;
                this.targetDateTime = date;
                this.$emit('onChange', {date, value: _this.selectedDataTime});
            },
            quickSelectDate(num) {
                this.tempCurDateTime = new Date(new Date(new Date().toLocaleDateString()).getTime() - 24*60*60*1000*num);
                this.tempTarDateTime = new Date();
                if (num == 1) {
                    this.tempTarDateTime = new Date(new Date(new Date().toLocaleDateString()).getTime() - 1);
                }
                this.currentDateTime = this.tempCurDateTime;
                this.targetDateTime = this.tempTarDateTime;
                this.$emit('onChange', { value: this.selectedDataTime});
                this.closePicker();
            }
        },
        watch: {
            curDateTime(val, oldVal) {
                this.currentDateTime = val;
            },
            tarDateTime(val, oldVal) {
                this.targetDateTime = val;
            }
        },
        mounted() {
            this.$emit('onChange', {value:this.selectedDataTime})
        },
        components: {
            DatePickerItem
        }
    }
</script>

<style lang="less" scoped>
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
    .picker {
        width: 280px;
    }
    .picker-content {
        width: 604px;
        .picker-item {
            float: left;
            min-height: 313px;
            position: relative;
            .picker-time {
                position: absolute;
                bottom: 20px;
                left: 20px;
                .second{
                    display: none;
                }
            }
        }
        .quick-btns{
            width: 80px;
            min-height: 313px;
            float: left;
            background: #F6F7FB;
            border: 1px solid #E5E5E5;
            border-radius: 2px 0 0 2px;
            .q-btn{
                display: block;
                text-align: center;
                width: 80px;
                height: 32px;
                font-size: 12px;
                color: #333333;
                line-height: 32px;
                cursor: pointer;
                &:hover{
                    background: rgba(16,142,233,0.1);
                }
            }
        }
    }
</style>
