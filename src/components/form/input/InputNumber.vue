<template>
    <div class="input-number" v-bind:class="customClass" >
            <span @click="sub(currentValue)"
                  class="input-number__decrease"
                  v-bind:class="{'is-disabled': currentValue<=this.min || this.config.disabled == true}">
                <i>-</i>
            </span>
        <span @click="add(currentValue)"
              class="input-number__increase"
              v-bind:class="{'is-disabled': currentValue>=this.max || this.config.disabled == true}">
                <i>+</i>
            </span>
        <div class="el-input" v-bind:class="{'is-disabled': this.config.disabled === true}" >
            <input type="text"
                   v-model="currentValue"
                   class="content"
                   :placeholder="placeholder"
                   @input="onInput"
                   @focus="focus"
                   @blur="blur"
                   :disabled="this.config.disabled === true"
            />
        </div>
    </div>
</template>

<script>
    export default {
        name: "inputNumber",
        props: {
            config: {
                type: Object,
            }
        },
        data() {
            return {
                // currentValue: this.config.value,
                precision: 0,
                isFocus: false
            }
        },
        computed: {
            currentValue: {
                get() {
                    return this.config.value;
                },
                set(v) {
                    this.config.value = v;
                }
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
            step() {
               if (this.config.step === 0 || this.config.step) {
                   return this.config.step;
               } else {
                   return 1;
               }
            },
            min() {
                if (this.config.min === undefined) {
                    return 0;
                } else {
                    return this.config.min;
                }
            },
            max() {
                if (this.config.max === undefined) {
                    return Infinity;
                } else {
                    return this.config.max;
                }
            },
            customClass() {
                const size = this.config.size;
                return {
                    'input-number-small': size === 'small' ,
                    'input-number-middle': size === 'middle',
                    'input-number-large': size === 'large',
                    'disabled': this.config.disabled === true,
                    'focus': this.isFocus
                }
            }
        },
        methods: {
            sub(value) {
                if (value <= this.min || this.config.disabled) {
                   return;
                }
                let curValue = Number(value);
                let curStep = Number(this.step);
                const precision = Math.max(this.getPrecision(curValue),this.getPrecision(curStep));
                const precisionFactor = Math.pow(10, precision);
                curValue = this.toPrecision((precisionFactor * curValue - precisionFactor * curStep) / precisionFactor,precision);
                this.setCurrentValue(curValue);
            },
            add(value) {
                if (value >= this.max || this.config.disabled) {
                    return;
                }
                let curValue = Number(value);
                let curStep = Number(this.step);
                const precision = Math.max(this.getPrecision(curValue),this.getPrecision(curStep));
                const precisionFactor = Math.pow(10, precision);
                curValue = this.toPrecision((precisionFactor * curValue + precisionFactor * curStep) / precisionFactor,precision);
                this.setCurrentValue(curValue);
            },
            setCurrentValue(newVal) {
                newVal = Number(newVal);
                if(String(newVal)=='NaN'){
                    newVal = this.config.defaultVal
                }
                if (newVal > this.max) newVal = this.max;
                if (newVal <= this.min) newVal = this.min;
                this.currentValue = Number(newVal);
                this.$emit('onChange', {value: this.currentValue});
                this.config.onChange(this.currentValue)
            },
            onInput(e) {
                this.setCurrentValue(this.currentValue);
                this.$emit('onChange', {value: this.currentValue})
            },
            getPrecision(value) {
                const valueString = value.toString();
                const dotPosition = valueString.indexOf('.');
                let precision = 0;
                if (dotPosition !== -1) {
                    precision = valueString.length - dotPosition - 1;
                }
                return precision;
            },
            toPrecision(num, precision) {
                if (precision === undefined) precision = this.precision;
                return parseFloat(parseFloat(Number(num).toFixed(precision)));
            },
            focus() {
                this.isFocus = true;
            },
            blur() {
                this.isFocus = false;
            }
        },
        created() {
            this.$emit('onChange', {value: this.config.value || ''})
        }

    }

</script>
