<template>
    <div :class="{lh36: lineList.length === 1}">
        <div
            v-for="(line,index) in lineList"
            :key="index"
            :style="inlineGroup"
        >
            <Radio
                class="radio-position"
                v-for="(radio,index) in line"
                :key="radio.key"
                :isChecked="value == radio.value"
                :disabled="isDisabled(radio)"
                @onClick="onClick(radio)"
            >
                {{radio.label || radio.key}}
            </Radio>
        </div>
    </div>
</template>

<script>
    import Radio from './Radio.vue';

    export default {
        name: 'RadioGroup',
        props: {
            options: {
                type: Array,
                default: []
            },
            value: {
                default: ''
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            lineList() {
                return Array.isArray(this.options[0])
                    ? this.options
                    : [this.options];
            },
            inlineGroup() {
                if (this.lineList.length === 1) {
                    return {
                        display: 'inline-block'
                    }
                }
                return null;
            }
        },
        methods: {
            onClick(radio) {
                if (this.disabled) {
                    return false;
                }
                if (radio.value == this.value) {
                    return false;
                }
                this.$emit('onChange', {value: radio.value, item: radio});
                return true;
            },
            isDisabled(radio) {
                return this.disabled === true || radio.disabled === true;
            }
        },
        components: {
            Radio
        }
    };
</script>

<style lang="less" scoped>
    .radio-position {
        margin-right: 15px;
        margin-bottom: 5px;
    }
</style>
