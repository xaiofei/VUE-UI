<template>
    <div class="picker-year">
        <ul class="picker-options">
            <li
                class="picker-option"
                :class="{active: year == currentYear}"
                v-for="year in years"
                @click="onClick(year)"
            >
                {{year}}
            </li>
        </ul>
    </div>
</template>

<script>
    import {getYear} from './Date';
    export default {
        name: 'DatePickerYear',
        props: {
            years: {
                type: Array,
                default: []
            },
            currentDate: {
                type: Date,
                required: true
            }
        },
        computed: {
            currentYear() {
                return getYear(this.currentDate);
            }
        },
        methods: {
            onClick(year) {
                this.$emit('onClick', {year})
            }
        }
    };
</script>
