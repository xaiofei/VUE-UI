<template>
    <DatePicker
        :datetime="datetime"
        :format="format"
        :readonly="readonly"
        :disabled="disabled"
        :editable="editable"
        @onChange="onChange"
    >
    </DatePicker>
</template>

<script>
    import DatePicker from '../../DatePicker/DatePicker.vue';

    export default {
        name: 'InputDateTime',
        props: {
            config: {
                type: Object
            }
        },
        date() {
            return {}
        },
        computed: {
            datetime() {
                return this.config.value;
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
            onChange({date, format}) {
                if (this.config.onChange) {
                    if (typeof this.config.onChange === 'function') {
                        this.config.onChange(format);
                    }
                    else {
                        throw new TypeError('Method onChange for datetime mast be a function!');
                    }
                }
                this.$emit('onChange', {value: format});
            }
        },
        components: {
            DatePicker
        }
    };
</script>
