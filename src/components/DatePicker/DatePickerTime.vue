<template>
    <div class="picker-time">
        <span class="picker-time-label">{{label}}</span>
        <input type="text" class="picker-time-input" :value="currentHour" @input="onHourChange">
        <span class="minute">
            ：<input type="text" class="picker-time-input" :value="currentMinute" @input="onMinuteChange">
        </span>
        <span class="second">
            ：<input type="text" class="picker-time-input" :value="currentSecond" @input="onSecondChange">
        </span>
    </div>
</template>

<script>
    export default {
        name: 'DatePickerTime',
        props: {
            label: {
                type: String,
                default: '时间'
            },
            hour: {
                type: [Number, String],
                default: 0
            },
            minute: {
                type: [Number, String],
                default: 0
            },
            second: {
                type: [Number, String],
                default: 0
            }
        },
        data() {
            return {
                currentHour: this.hour,
                currentMinute: this.minute,
                currentSecond: this.second
            }
        },
        methods: {
            onHourChange(e) {
                const old = this.currentHour;
//                console.log('old value = ' + old);
                this.currentHour = e.target.value;
//                console.log('current value = ' + this.currentHour);
                let value = parseInt(e.target.value, 10);
//                console.log('format value = ' + value);
                if (isNaN(value)) {
                    value = '00'
                }
                else if (value < 0) {
                    value = '00'
                }
                else if (value > 23) {
                    value = 23;
                }
                this.currentHour = value;
                if (old != value) {
                    this.$emit('onChange', {H: this.currentHour, m: this.currentMinute, s: this.currentSecond});
                }
            },
            onMinuteChange(e) {
                const old = this.currentMinute;
                this.currentMinute = e.target.value;
                let value = parseInt(e.target.value, 10);
                if (isNaN(value)) {
                    value = '00'
                }
                else if (value < 0) {
                    value = '00'
                }
                else if (value > 59) {
                    value = 59;
                }
                this.currentMinute = value;
                if (old != value) {
                    this.$emit('onChange', {H: this.currentHour, m: this.currentMinute, s: this.currentSecond});
                }
            },
            onSecondChange(e) {
                const old = this.currentSecond;
                this.currentSecond = e.target.value;
                let value = parseInt(e.target.value, 10);
                if (isNaN(value)) {
                    value = '00'
                }
                else if (value < 0) {
                    value = '00'
                }
                else if (value > 59) {
                    value = 59;
                }
                this.currentSecond = value;
                if (old != value) {
                    this.$emit('onChange', {H: this.currentHour, m: this.currentMinute, s: this.currentSecond});
                }
            },
        },
        watch: {
            hour(val) {
                this.currentHour = val;
            },
            minute(val) {
                this.currentMinute = val;
            },
            second(val) {
                this.currentSecond = val;
            }
        }
    }
</script>
