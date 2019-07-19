<template>
    <div>
        <div v-for="(line,index) in lineList" :key="index" :class="{lh36: lineList.length === 1}">
            <Checkbox
                v-for="(checkbox,index) in line"
                :key="checkbox.key"
                :disabled="isDisabled(checkbox)"
                @onClick="onClick(checkbox)"
                :isChecked="value.has(checkbox.value)"
                class="checkbox-position"
            >
                {{checkbox.label || checkbox.key}}
            </Checkbox>
        </div>
    </div>
</template>
<script>

    import Checkbox from '../../basic/CheckBox.vue';

    export default {
        name: 'inputCheckBox',
        props: {
            config: {
                type: Object
            }
        },
        computed: {
            value: {
                get() {
                    return this.tempValue;
                },
                set(v) {
                    this.tempValue = v;
                }
            },
            configValue() {
                return this.config.value;
            },
            options() {
                return this.config.options;
            },
            disabled() {
                return this.config.disabled;
            },
            lineList() {
                return Array.isArray(this.options[0])
                    ? this.options
                    : [this.options];
            }
        },
        data () {
            // get default value
            // if have value field, use it
            // else get all checked options
            let value = this.config.value;
            const options = this.config.options;
            if (!value) {
                value = []
            }
            if (!Array.isArray(value)) {
                throw new TypeError('value for checkbox must be an Array');
            }
            if (value.length <= 0) {
                let lineList = Array.isArray(options[0])
                    ? options
                    : [options];
                lineList.forEach(option => {
                    const tmp = option.filter(opt => opt.checked === true)
                        .map(item => item.value);
                    value = [...value, ...tmp];
                });
            }
            this.$emit('onChange', {value})

            return {
                tempValue: new Set(value)
            }
        },
        methods: {
            onClick (checkbox) {
                // if disabled attr is true, click is not allowed
                if (this.isDisabled(checkbox)) {
                    return false;
                }

                // if custom onChange method return a false
                // nothing will done
                const res = this.config.onChange(checkbox.value, checkbox);
                if (res === false) {
                    return false;
                }

                let valueArray;
                if (this.value.has(checkbox.value)) {
                    this.value.delete(checkbox.value)
                    valueArray = [...this.value];
                }
                else {
                    valueArray = [...this.value.add(checkbox.value)];
                }

                this.value = new Set(valueArray);
                this.$emit('onChange', {value:valueArray, item: checkbox})
            },
            isDisabled(checkbox) {
                return this.disabled === true || checkbox.disabled === true;
            }
        },
        watch: {
            configValue(v) {
                this.value = new Set(v);
            }
        },
        components: {
            Checkbox
        }
    }
</script>
<style scoped lang="less">
    .checkbox-position {
        margin-right: 15px;
        margin-bottom: 5px;
    }
</style>
