<template>
    <RadioGroup :options="options" :value="value" :disabled="disabled" @onChange="onClick">
    </RadioGroup>
</template>

<script>
    import RadioGroup from '../../basic/RadioGroup.vue';

    export default {
        name: 'inputRadio',
        props: {
            config: {
                type: Object
            }
        },
        computed: {
            disabled() {
                return this.config.disabled;
            },
            options() {
                return this.config.options;
            },
            value: {
                set(v) {
                    this.config.value = v;
                },
                get() {
                    return this.config.value;
                }
            }
        },
        data () {
            return {
                tempValue: this.config.value
            }
        },
        methods: {
            onClick ({value, item}) {
                // if custom onChange method return a false
                // nothing will done
                const res = this.config.onChange(value, item);
                if (res === false) {
                    return false;
                }
                this.value = value;
                this.$emit('onChange', {value, item});
            },
            initValue() {
                // get default value
                // if have value field, use it
                // else get the first checked option
                let value = this.config.value;
                const options = this.options;
                if (typeof value !== 'string') {
                    value = '';
                }
                if (value === '') {
                    const lineList = Array.isArray(options[0])
                        ? options
                        : [options];
                    lineList.every(option => {
                        let shouldFound = true;
                        option.every(item => {
                            if (item.checked === true) {
                                value = item.value;
                                shouldFound = false;
                                // console.log(1);
                                return false;
                            }
                        })
                        return shouldFound;
                    })
                }
                this.value = value;
                this.$emit('onChange', {value})
            }
        },
        mounted() {
            this.initValue();
        },
        components: {
            RadioGroup
        }
    }
</script>
