<template>
    <div class="picker-item">
        <date-picker-preview
            :year="previewYear"
            :month="currentView === 'day' ? month : ''"
            @clickYear="openYearSelectView"
            @clickMonth="openMonthSelectView"
            @onClickDoubleLeft="onDoubleLeftClick"
            @onClickDoubleRight="onDoubleRightClick"
            @onClickSingleLeft="onSingleLeftClick"
            @onClickSingleRight="onSingleRightClick"
        >
        </date-picker-preview>
        <!--year-->
        <date-picker-year
            v-if="currentView === 'year'"
            :years="yearSelect"
            :currentDate="datetime"
            :currentYear="year"
            @onClick="onYearViewClick"
        >
        </date-picker-year>
        <!--month-->
        <date-picker-month
            v-if="currentView === 'month'"
            :year="year"
            :month="month"
            :currentDate="datetime"
            @onClick="onMonthViewClick"
        >
        </date-picker-month>
        <date-picker-day
            v-if="currentView === 'day'"
            :year="year"
            :month="month"
            :day="day"
            :currentDate="datetime"
            @onClickLastMonth="onSingleLeftClick"
            @onClickNextMonth="onSingleRightClick"
            @onClick="onDayViewClick"
        >
        </date-picker-day>
        <date-picker-time
            :hour="hour"
            :minute="minute"
            :second="second"
            @onChange="onTimeChange"
        >
        </date-picker-time>
    </div>
</template>

<script>
    import DatePickerPreview from './DatePickerPreview.vue';
    import DatePickerYear from './DatePickerYear.vue';
    import DatePickerMonth from './DatePickerMonth.vue';
    import DatePickerDay from './DatePickerDay.vue';
    import DatePickerTime from './DatePickerTime.vue';
    import {
        pattern,
        getDay,
        getHour,
        getMonth,
        getYear,
        getMinute,
        getSecond,
        getDayListByMonth
    } from './Date';

    const views = {
        year: 'year',
        month: 'month',
        day: 'day',
    };

    export default {
        name: 'DatePickerItem',
        props: {
            format: {
                type: String,
                default: 'yyyy-MM-dd HH:mm:ss'
            },
            datetime: {
                type: Date,
                default() {
                    return new Date();
                }
            }
        },
        data() {
            return {
                tempDateTime: this.datetime,
                currentView: views.day,
                // 年视图年份
                yearSelect: [],
                // day视图
                daySelect: []
            }
        },
        computed: {
            year: {
                get() {
                    return getYear(this.tempDateTime);
                },
                set(v) {
                    this.tempDateTime = this.getDate({y: v});
                }
            },
            month: {
                get() {
                    return getMonth(this.tempDateTime);
                },
                set(v) {
                    this.tempDateTime = this.getDate({M: v});
                }
            },
            day: {
                get() {
                    return getDay(this.tempDateTime);
                },
                set(v) {
                    console.log(v)
                    this.tempDateTime = this.getDate({d: v});
                    console.log(this.tempDateTime)
                }
            },
            hour: {
                get() {
                    return getHour(this.tempDateTime);
                },
                set(v) {
                    this.tempDateTime = this.getDate({H: v});
                }
            },
            minute: {
                get() {
                    return getMinute(this.tempDateTime);
                },
                set(v) {
                    this.tempDateTime = this.getDate({m: v});
                }
            },
            second: {
                get() {
                    return getSecond(this.tempDateTime);
                },
                set(v) {
                    this.tempDateTime = this.getDate({s: v});
                }
            },
            // 年视图显示的年份范围
            previewYear() {
                if (this.currentView === views.year) {
                    return this.yearSelect[0] + '年 - ' + this.yearSelect[this.yearSelect.length - 1];
                }
                else {
                    return this.year;
                }
            },
        },
        methods: {
            /**
             * 根据年月日生成新的时间
             * @param {string|number} y 年
             * @param {string|number} M 月
             * @param {string|number} d 日
             * @param {string|number} H 时
             * @param {string|number} m 分
             * @param {string|number} s 秒
             * @return {Date}
             */
            getDate({y, M, d, H, m, s}) {
                return new Date(
                    y || this.year,
                    M ? parseInt(M, 10) - 1 : parseInt(this.month, 10) - 1,
                    d || this.day,
                    H || this.hour,
                    m || this.minute,
                    s || this.second
                );
            },
            openYearSelectView() {
                // 初始化年视图年份范围
                const num = this.year % 10;
                let arr = [];
                for (let i = 0; i < 10; i++) {
                    arr.push(this.year - num + i);
                }
                this.yearSelect = arr;
                this.currentView = views.year;
            },
            openMonthSelectView() {
                this.currentView = views.month;
            },
            /**
             * 点击了年份视图中的年
             * @param year
             */
            onYearViewClick({year}) {
                this.year = year;
                this.currentView = views.month;
            },
            /**
             * 点击了向左的双箭头
             */
            onDoubleLeftClick() {
                if (this.currentView === views.year) {
                    this.changeYearSelect(-10);
                }
                else if (this.currentView === views.month) {
                    this.year = parseInt(this.year, 10) - 1;
                }
                else if (this.currentView === views.day) {
                    this.year = parseInt(this.year, 10) - 1;
                }
            },
            /**
             * 点击了向右的双箭头
             */
            onDoubleRightClick() {
                if (this.currentView === views.year) {
                    this.changeYearSelect();
                }
                else if (this.currentView === views.month) {
                    this.year = parseInt(this.year, 10) + 1;
                }
                else if (this.currentView === views.day) {
                    this.year = parseInt(this.year, 10) + 1;
                }
            },
            /**
             * 点击了向左的单箭头
             */
            onSingleLeftClick() {
                if (this.currentView === views.day) {
                    const temp = parseInt(this.month, 10) - 1;
                    if (temp < 1) {
                        this.month = 12;
                        this.year = parseInt(this.year, 10) - 1;
                    }
                    else {
                        this.month = temp;
                    }
                }
            },
            /**
             * 点击了向右的单箭头
             */
            onSingleRightClick() {
                if (this.currentView === views.day) {
                    const temp = parseInt(this.month, 10) + 1;
                    if (temp > 12) {
                        this.month = 1;
                        this.year = parseInt(this.year, 10) + 1;
                    }
                    else {
                        this.month = temp;
                    }
                }
            },
            /**
             * 点击了月视图中的月份
             */
            onMonthViewClick({month}) {
                this.month = month;
                this.currentView = views.day;
            },
            /**
             * 点击了天视图中的天
             */
            onDayViewClick({day}) {
                this.day = day;
                // console.log(day)
                // if(day == new Date().getDate()){
                //     this.hour = new Date().getHours()
                //     this.minute = new Date().getMinutes()
                //     this.second = new Date().getSeconds()
                // }else{
                //     this.hour = 23
                //     this.minute = 59
                //     this.second = 59
                    
                // }

                this.$emit('onChange', {date: this.tempDateTime});
            },
            /**
             * 时间视图中的时间发生了变化
             */
            onTimeChange({H, m, s}) {
                this.hour = H;
                this.minute = m;
                this.second = s;
                this.$emit('onChange', {date: this.tempDateTime});
            },
            /**
             * 更改年份选择范围
             * @param num
             */
            changeYearSelect(num = 10) {
                this.yearSelect = this.yearSelect.map(i => i + num);
            }
        },
        mounted() {
            this.daySelect = getDayListByMonth(this.year, this.month);
        },
        beforeDestroy() {
        },
        components: {
            DatePickerPreview,
            DatePickerYear,
            DatePickerMonth,
            DatePickerDay,
            DatePickerTime
        }
    }
</script>
