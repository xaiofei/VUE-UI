<template>
    <form action="" class="form" :class="formClass" v-on:submit.prevent="onSubmit">
        <template v-for="config in options">
            <input-item
                :config="config"
                :value="config.value"
                :ref="config.name"
                :rules="validate[config.name]"
                @onChange="onInput"
            >
            </input-item>
        </template>
    </form>
    <!--</div>-->
</template>

<script>
    import InputItem from './InputItem.vue'
    import { isRegExp, isFunction, isUndefined } from '../../utils/typeTools';

    export default {
        name: 'commonForm',
        props: {
            options: {
                type: Array,
                default: []
            },
            formConfig: {
                type: Object,
                default: {}
            }
        },
        data () {
            return {
                formData: {},
                errors: {}
            }
        },
        methods: {
            onInput ({value, name, error}) {
                this.formData[name] = value
                this.options.find((input) => input.name == name).value = value;
                this.errors[name] = error !== null;
                this.$emit('onChange', {formData: this.formData, name, value, error});
            },
            onSubmit () {
                // 表单数据是否全部通过验证
                let temp = [];
                for (let k in this.errors) {
                    temp.push(this.errors[k]);
                }
                const res = temp.every(i => i === false);
                if (!res) {
                    return false;
                }

                if (this.formConfig.onSubmit) {
                    if (typeof this.formConfig.onSubmit !== 'function') {
                        throw new TypeError('Method onSubmit must be a function!');
                    }
                    this.formConfig.onSubmit(this.formData);
                    return true;
                }
                const btnObjArray = this.options.filter(i => i.type === 'submit');
                if (btnObjArray.length > 0) {
                    const btnObj = btnObjArray[0];
                    btnObj.onClick && btnObj.onClick(this.formData);
                    return true;
                }
                return false;
            },
            N(name) {
                return this.options.filter(i => i.name == name)[0];
            },
            F(key, value) {
                return this.options.filter(i => i[key] == value);
            }
        },
        computed: {
            formModal() {
                return this.formConfig.modal;
            },
            /**
             * get form className by formModal prop
             * @return {string}
             */
            formClass () {
                let classStr = 'form-'
                if (this.formModal === 'inline') {
                    classStr += 'inline'
                }
                else if (this.formModal === 'horizontal') {
                    classStr += 'horizontal'
                }
                else {
                    classStr = ''
                }
                return classStr
            },
            /**
             * get form validate config
             * @return Object
             */
            validate() {
                return this.formConfig.validate || {};
            }
        },
        components: {
            'input-item': InputItem
        },
        updated() {
            this.options.forEach(i => {
                if (!i.N) {
                    i.N = this.N;
                }
                if (!i.F) {
                    i.F = this.F;
                }
            })
        }
    }

</script>
