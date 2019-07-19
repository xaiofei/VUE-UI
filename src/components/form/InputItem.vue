<template>
    <div class="form-item" :class="config.extClass">
        <!--label-->
        <div class="form-label" :class="{require:config.require}">
            <label :for="config.id" :class="{empty: !config.title}">{{config.title}}</label>
        </div>
        <!--control-->
        <div class="form-control" :class="{error: autoErrorMsg && hasError}">
            <component :is="'input-'+config.type" :config="config" @onChange="onInput" ></component>
            <p class="help-text" v-if="autoErrorMsg && hasError">{{errorMsg}}</p>
        </div>
        <!--ext slot-->
        <slot name="input-ext"></slot>
    </div>
</template>

<script>
    import inputText from './input/Text.vue';
    import inputTextArea from './input/Textarea.vue';
    import inputRadio from './input/Radio.vue';
    import inputSelect from './input/Select/Select.vue';
    import inputCheckBox from './input/CheckBox.vue';
    import InputButton from './input/InputButton';
    import InputNumber from './input/InputNumber.vue';
    import InputRange from './input/Range.vue';
    import InputDateTime from './input/DateTime.vue';
    import InputDateTimeRange from './input/DateTimeRange.vue';
    import { isRegExp, isFunction, isUndefined } from '../../utils/typeTools';

    export default {
        name: 'inputItem',
        components: {
            'input-text': inputText,
            'input-textarea': inputTextArea,
            'input-radio': inputRadio,
            'input-select': inputSelect,
            'input-checkbox': inputCheckBox,
            'input-button': InputButton,
            'input-submit': InputButton,
            'input-reset': InputButton,
            'input-number': InputNumber,
            'input-range': InputRange,
            'input-datetime': InputDateTime,
            'input-datetimerange': InputDateTimeRange
        },
        props: ['config', 'value', 'rules'],
        data () {
            return {
                hasError: false,
                errorMsg: ''
            }
        },
        computed: {
            autoErrorMsg() {
                return this.config.autoErrorMsg !== false;
            }
        },
        methods: {
            onInput ({value}) {
                const res = this.doValidate(value);
                if (res === true) {
                    this.setSuccess();
                }
                else {
                    this.setError(res.msg);
                }
                this.$emit('onChange', {
                    value,
                    name: this.config.name,
                    error: res === true ? null : res
                });
            },
            setError(m) {
                this.hasError = true;
                this.errorMsg = m;
            },
            setSuccess() {
                this.hasError = false;
                this.errorMsg = '';
            },
            doValidate(value) {
                if (!this.rules || isUndefined(this.rules)) {
                    return true;
                }
                const rules =  this.rules.rules;
                // 然后检测是不是数组，是就遍历检测，
                if (Array.isArray(rules)) {
                    // 遍历检测
                    let res = null;
                    rules.every((rule, index) => {
                        if (isRegExp(rule)) {
                            const checkRes = this.checkRegExp(rule, value);
                            if (!checkRes) {
                                res = index;
                            }
                            return checkRes;
                        }
                        else if (isFunction(rule)) {
                            const checkRes = rule(value);
                            if (typeof checkRes !== 'boolean') {
                                throw new Error('Rules function must return a boolean!');
                            }
                            if (checkRes === false) {
                                res = index;
                            }
                            return checkRes;
                        }
                        else {
                            throw new TypeError(`Rules for ${name} must be a RegExp Array or a Function Array.`);
                        }
                    });
                    if (res !== null) {
                        if (!Array.isArray(this.rules.msg)) {
                            throw new TypeError('Msg for ${name} must be an Array.')
                        }
                        const msg = this.rules.msg[res];
                        const rule = rules[res];
                        if (this.rules.onError && isFunction(this.rules.onError)) {
                            this.rules.onError(msg, rule, value);
                        }
                        return {
                            rule,
                            msg
                        }
                    }
                    else {
                        if (this.rules.onSuccess && isFunction(this.rules.onSuccess)) {
                            this.rules.onSuccess(value);
                        }
                        return true;
                    }
                }

                // 不是就检测是否是 [object RegExp] 是就检测
                if (isRegExp(rules)) {
                    const res = this.checkRegExp(rules, value);
                    if (res) {
                        if (this.rules.onSuccess && isFunction(this.rules.onSuccess)) {
                            this.rules.onSuccess(value);
                        }
                        return true;
                    }
                    else {
                        if (this.rules.onError && isFunction(this.rules.onError)) {
                            this.rules.onError(this.rules.msg, rules, value);
                        }
                        return {
                            rule: rules,
                            msg: this.rules.msg
                        }
                    }
                }

                if (isFunction(rules)) {
                    const res = rules(value);
                    if (res === true) {
                        if (this.rules.onSuccess && isFunction(this.rules.onSuccess)) {
                            this.rules.onSuccess(value);
                        }
                        return true;
                    }
                    else if (res === false) {
                        if (this.rules.onError && isFunction(this.rules.onError)) {
                            this.rules.onError(this.rules.msg, rules, value);
                        }
                        return {
                            rule: rules,
                            msg: this.rules.msg
                        }
                    }
                    throw new Error('Rules function must return a boolean!');
                }

                // 不是就抛出异常
                throw new TypeError(`Rules for ${name} must be a RegExp Object, function, RegExp Array or a function Array.`);
            },
            checkRegExp(reg, value) {
                return reg.test(value);
            },
        },
        created () {
            let {value, name} = this.config
            this.$emit('input', {value, name})
        }
    }
</script>
