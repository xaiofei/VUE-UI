<template>
    <div class="input-textarea">
        <textarea
            :value="value"
            :id="id"
            :name="name"
            :placeholder="placeholder"
            :disabled="disabled"
            @input="onInput"
            @focus="onfocus"
            @blur="onblur"
            ref="textarea"
        >
        </textarea>
        <span class="input-length input-textarea-length" v-if="this.max">
            {{value.length}}/{{max}}
        </span>
    </div>
</template>

<script>
    export default {
        name: 'inputTextArea',
        props: {
            config: {
                type: Object
            }
        },
        data() {
            return {
                tempValue: this.config.value,
                focus: false,
            }
        },
        computed: {
            value: {
                get() {
                    return this.config.value;
                },
                set(v) {
                    this.tempValue = v;
                    this.config.value = v;
                }
            },
            id() {
                return this.config.id;
            },
            placeholder() {
                return this.config.placeHolder;
            },
            disabled() {
                return this.config.disabled;
            },
            name() {
                return this.config.name;
            },
            max() {
                return this.config.max || false;
            },
        },
        methods: {
            onInput (e) {
                const value = e.target.value
                let res = true;
                if (typeof this.config.onChange === 'function') {
                    res = this.config.onChange(value);
                }
                const oldV = this.tempValue;
                this.value = value;
                if (res === false) {
                    this.value = oldV;
                }
                else if (this.max) {
                    if (value.length > this.max) {
                        this.value = oldV;
                    }
                }
                this.$emit('onChange', {value: this.value})
            },
            onfocus(e) {
                this.focus = true;
            },
            onblur(e) {
                this.focus = false;
            }
        },
        created() {
            this.$emit('onChange', {value: this.config.value || ''})
        }
    }
</script>
