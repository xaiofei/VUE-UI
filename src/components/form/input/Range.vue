<template>
    <div class="input-range">
        <input
            type="text"
            class="input-range-text"
            :disabled="disabled"
            :placeholder="startPlaceHolder"
            v-model="startValue"
            @blur="onStartBlur"
        >
        &nbsp;-&nbsp;
        <input
            type="text"
            class="input-range-text"
            :disabled="disabled"
            :placeholder="endPlaceHolder"
            v-model="endValue"
            @blur="onEndBlur"
        >
    </div>
</template>

<script>
    import { isBoolean } from '../../../utils/typeTools';

    export default {
        name: 'InputRange',
        props: {
            config: {
                type: Object,
                default: {}
            }
        },
        data() {
            return {
            };
        },
        computed: {
            value: {
                get() {
                    if (!Array.isArray(this.config.value)) {
                        return [];
                    }
                    return this.config.value;
                },
                set(v) {
                    this.config.value = v;
                    if (this.config.onChange) {
                        if (typeof this.config.onChange !== 'function') {
                            throw new TypeError('OnChange for InputRange must be a function!');
                        }
                        else {

                            this.config.onChange(v);
                        }
                    }
                    this.$emit('onChange', {value: v})
                }
            },
            startValue: {
                get() {
                    return this.value[0];
                },
                set(v) {
                    let [s, e] = this.value;
                    this.value = [v, e];
                }
            },
            endValue: {
                get() {
                    return this.value[1];
                },
                set(v) {
                    let [s, e] = this.value;
                    this.value = [s, v];
                }
            },
            disabled() {
                return this.config.disabled;
            },
            placeHolder() {
                if (!Array.isArray(this.config.placeHolder)) {
                    return ['', ''];
                }
                return this.config.placeHolder;
            },
            startPlaceHolder() {
                return this.placeHolder[0];
            },
            endPlaceHolder() {
                return this.placeHolder[1];
            },
        },
        methods: {
            onStartBlur() {
                if (typeof this.config.onStartBlur === 'function') {
                    this.$emit('onStartBlur', {value: this.value, startValue: this.value[0]});
                    this.config.onStartBlur(this.value, this.value[0]);
                }
            },
            onEndBlur() {
                if (typeof this.config.onEndBlur === 'function') {
                    this.$emit('onEndBlur', {value: this.value, endValue: this.value[1]});
                    this.config.onEndBlur(this.value, this.value[1]);
                }
            }
        },
        created() {
            this.$emit('onChange', {value: this.value})
        }
    }
</script>
