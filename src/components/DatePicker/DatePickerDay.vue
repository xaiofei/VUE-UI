<template>
    <div class="picker-day">
        <ul class="picker-day-options">
            <!--week-->
            <li class="picker-day-title">日</li>
            <li class="picker-day-title">一</li>
            <li class="picker-day-title">二</li>
            <li class="picker-day-title">三</li>
            <li class="picker-day-title">四</li>
            <li class="picker-day-title">五</li>
            <li class="picker-day-title">六</li>
            <!--day-->
            <template v-for="week in weeks">
                <li
                    class="picker-day-option"
                    :class="{
                        today: isToday(day),
                        active: isActive(day),
                        'not-month': !isCurMonth(day)
                    }"
                    v-for="day in week"
                    @click="onClick(day)"
                >
                    {{isToday(day) ? '今天' : day.day}}
                </li>
            </template>
            <!--<li class="picker-day-option disabled">6</li>-->
        </ul>
    </div>
</template>

<script>
    import {getYear, getMonth, getDay, getDayListByMonth} from './Date';
    export default {
        name: 'DatePickerDay',
        props: {
            day: {
                type: [String, Number],
                required: true,
            },
            year: {
                type: [String, Number],
                required: true,
            },
            month: {
                type: [String, Number],
                required: true
            },
            currentDate: {
                type: Date,
                required: true
            }
        },
        computed: {
            currentDay() {
                return getDay();
            },
            weeks() {
                return getDayListByMonth(this.year, this.month);
            }
        },
        methods: {
            isToday(d) {
                return this.isSameDay(d, new Date());
            },
            isActive(d) {
                return this.isSameDay(d, this.currentDate);
            },
            isCurMonth(d) {
                return d.current;
            },
            isSameDay(firDay, secDay) {
                if (this.year != getYear(secDay)) {
                    return false;
                }
                if (this.month != getMonth(secDay)) {
                    return false;
                }
                return firDay.current && firDay.day == getDay(secDay);
            },
            onClick(day) {
                if (day.last) {
                    this.$emit('onClickLastMonth', {day: day.day});
                }
                else if (day.current) {
                    this.$emit('onClick', {day: day.day});
                }
                else if (day.next) {
                    this.$emit('onClickNextMonth', {day: day.day});
                }
            }
        }
    }
</script>
