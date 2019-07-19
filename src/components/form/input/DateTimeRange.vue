<template>
    <DateRangePicker
        :curDateTime="curDateTime"
        :tarDateTime="tarDateTime"
        :splitStr="splitStr"
        :format="format"
        :readonly="readonly"
        :disabled="disabled"
        :editable="editable"
        @onChange="onChange"
    >
    </DateRangePicker>
</template>

<script>
    import DateRangePicker from '../../DatePicker/DateRangePicker.vue';

    export default {
        name: 'InputDateTimeRange',
        props: {
            config: {
                type: Object
            }
        },
        date() {
            return {}
        },
        computed: {
            curDateTime() {
                return this.config.curDateTime;
            },
            tarDateTime() {
                return this.config.tarDateTime;
            },
            splitStr() {
                return this.config.splitStr;
            },
            format() {
                return this.config.format;
            },
            readonly() {
                return this.config.readonly;
            },
            disabled() {
                return this.config.disabled;
            },
            editable() {
                return this.config.editable;
            }
        },
        methods: {
            onChange({date, value}) {
                if (this.config.onChange) {
                    if (typeof this.config.onChange === 'function') {
                        this.config.onChange(value);
                    }
                    else {
                        throw new TypeError('Method onChange for datetime mast be a function!');
                    }
                }
                this.$emit('onChange', {value: value});
            }
        },
        components: {
            DateRangePicker
        }
    };
</script>
