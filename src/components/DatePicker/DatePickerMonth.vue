<template>
    <div class="picker-month">
        <ul class="picker-options">
            <li
                class="picker-option"
                v-for="(month, index) in months"
                :class="{active: isCurrentMonth(index + 1)}"
                @click="onClick(index + 1)"
            >
                {{month}}月
            </li>
        </ul>
    </div>
</template>

<script>
    import {getMonth, getYear} from './Date';
    export default {
        name: 'DatePickerMonth',
        props: {
            year: {
                type: [String, Number],
                required: true
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
        data() {
            return {
                months: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二']
            }
        },
        computed: {
        },
        methods: {
            onClick(month) {
                this.$emit('onClick', {month})
            },
            isCurrentMonth(M) {
                if (this.year != getYear(this.currentDate)) {
                    return false;
                }
                return parseInt(M, 10) == parseInt(getMonth(this.currentDate), 10);
            }
        }
    };
</script>
