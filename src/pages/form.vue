<template>
    <div class="form page-container">
        <div class="form-demo">
            <div class="form-head">
            </div>
            <div class="form-body">
                <common-form
                    :options="formOptions"
                    @onChange="onFormUpdated"
                    :formConfig="formConfig"
                >
                </common-form>
            </div>
        </div>
    </div>
</template>

<script>
    import commonForm from '@/components/form/CommonForm';
    import Radio from '@/components/basic/Radio';
    import ScrollContainer from '../components/basic/ScrollContainer';

    export default {
        name: 'form',
        data () {
            const that = this
            return {
                formOptions: [
                    {
                        name: 'title',
                        title: '课程',
                        require: true,
                        type: 'text',
                        value: '11',
                        placeHolder: '仅能输入数字或字母',
                        disabled: false,
                        clearable: true,
                        extClass: 'lv',
                        fetchSuggestions: true, // 是否开启 可带输入建议的输入框
                        triggerOnFocus: true,  // 是否在输入框 focus 时显示建议列表
                        options: [
                            {
                                key: 2,
                                label: 'lala',
                                value: 21,
                                disabled: false
                            },
                            {
                                key: 3,
                                label: '31',
                                value: 31,
                                disabled: false
                            },
                            {
                                key: 4,
                                label: '311',
                                value: 311,
                                disabled: false
                            },
                            {
                                key: 5,
                                label: '211',
                                value: 211,
                                disabled: false
                            },
                            {
                                key: 6,
                                label: '6',
                                value: 6,
                                disabled: false
                            },
                            {
                                key: 7,
                                label: '711',
                                value: 711,
                                disabled: false
                            },
                        ],  //
                        queryUrl: "", // 查询url 如果url 存在则数据从url中查询获取
                        autoErrorMsg: true,
                        max: 1198,
                        onChange (v, item) {

                            let reg=/(^\s+)|(\s+$)/g.test(v);
                            if(reg) {
                                return false;
                            }
                        },
                        onFocus(v) {
                            console.log("获取焦点事件", v)
                        }
                    },
                    {
                        name: 'desc',
                        title: '简介',
                        desc: '20~1000个字符',
                        require: true,
                        type: 'textarea',
                        value: 'a',
                        placeHolder: '仅能输入英文字母',
                        disabled: false,
                        max: 12342,
                        onChange (v) {
                            // 当输入值未three时，Select自动选择第二项
                            if (v === 'three') {
                                this.N('duration').value = 2;
                            }
                            if (v === 'abc') {
                                return false;
                            }
                        }
                    },
                    {
                        name: 'duration',
                        title: '从业时间',
                        require: true,
                        type: 'select',
                        value: 1,
                        placeHolder: '请选择',
                        disabled: false,
                        collapseTages:3,
                        multiple: true,
                        checkAll: false,
                        collapseTags: 4,
                        clearable: true,
                        filterable: true,
                        beforeChanged(v) {
                            return v != 1;
                        },
                        onChange (v) {
                            console.log(v, this.value);
                        },
                        options: [
                            {
                                key: 1,
                                label: '1~3年',
                                value: 1,
                                disabled: false
                            },
                            {
                                key: 2,
                                label: '3~5年',
                                value: 2,
                                disabled: false
                            },
                            {
                                key: 3,
                                label: '5~6年',
                                value: 3,
                                disabled: false
                            },
                            {
                                key: 4,
                                label: '6年',
                                value: 4,
                                disabled: false
                            },
                            {
                                key: 5,
                                label: '7年',
                                value: 5,
                                disabled: false
                            },
                            {
                                key: 6,
                                label: '8年',
                                value: 6,
                                disabled: false
                            }
                        ]
                    },
                    {
                        name: 'classify',
                        title: '类别',
                        require: true,
                        type: 'checkbox',
                        options: [
                            [{
                                key: 1,
                                label: 'html5',
                                value: 'html5',
                                checked: true,
                                disabled: true
                            }, {
                                key: 2,
                                label: 'css3',
                                value: 'css3',
                                checked: true
                            }, {
                                key: 3,
                                label: 'angular',
                                value: 'angular',
                                checked: false
                            }],
                            [{
                                key: 4,
                                label: 'react',
                                value: 'react',
                                checked: false
                            }, {
                                key: 5,
                                label: 'vue',
                                value: 'vue',
                                checked: true
                            }]
                        ],
                        disabled: false,
                        value: ['css3'],
                        onChange (v) {

                        }
                    },
                    {
                        name: 'position',
                        title: '角色',
                        require: true,
                        type: 'radio',
                        value: '后端',
                        options: [
                            [{
                                key: 1,
                                value: '前端',
                                label: '前端',
                                checked: true
                            }, {
                                key: 2,
                                value: '后端',
                                label: '后端',
                                checked: true
                            }, {
                                key: 4,
                                value: '测试',
                                label: '测试',
                                checked: true
                            }],
                            [{
                                key: 3,
                                value: '产品',
                                label: '产品',
                                checked: true,
                                disabled: true
                            }, {
                                key: 5,
                                value: '运营',
                                label: '运营',
                                checked: true
                            }]
                        ],
                        disabled: false,
                        onChange (v) {
                            if (v == '前端') {
                                // 'css3', 'angular', 'react', 'vue'
                                // 选择前端后，CheckBox自动选择React
                                this.N('classify').value = ['react'];
                            }
                        }
                    },
                    {
                        name: 'inputNumber',
                        type: 'number',
                        title: '数量',
                        require: true,
                        value: 0,
                        step: 2,
                        min: -10,
                        max: 40,
                        size: 'large',
                        disabled: false,
                        onChange (v) {
                            return v
                        }
                    },
                    {
                        name: 'age',
                        title: '年龄',
                        type: 'range',
                        require: true,
                        value: [0, 100],
                        disabled: false,
                        placeHolder: ['开始', '结束'],
                        onChange (v) {
                            console.log(v)
                        },
                        onStartBlur(v, fv) {

                        }
                    },
                    {
                        name: 'date',
                        title: '时间',
                        type: 'datetime',
                        require: true,
                        value: '2017-12-21 15:00:00',
                        onChange(v) {

                        }
                    },
                    {
                        name: 'dateRange',
                        title: '时间范围',
                        type: 'datetimerange',
                        require: true,
                        curDateTime: new Date((+new Date() - 3600 * 1000 * 24 * 7)),
                        tarDateTime: new Date(),
                        splitStr: ' ~ ',
                        value: '',
                        format: 'yyyy-MM-dd HH:mm',
                        onChange(v) {

                        }
                    },
                    {
                        name: 'submit',
                        title: '提交',
                        type: 'submit',
                        style: 'default',
                        text: '<s>submit</s>',
                        value: '',
                        disabled: false,
                        onClick (v) {
                            console.log(v)
                        }
                    }
                ],
                formConfig: {
                    enctype: '',
                    modal: 'horizontal', //
                    onSubmit (v) {
                        console.table(v)
                    },
                    validate: {
                        title: {
                            rules: /^[0-9a-zA-Z]*$/,
                            msg: '请输入数字',
                            onError (msg, rule, value) {

                            },
                            onSuccess (v) {

                            }
                        },
                        desc: {
                            rules: [/.+/, /^[a-z]*$/],
                            msg: ['必填', '只能为a-z'],
                            onError (msg, rule, value) {
                            }
                        },
                        duration: {
                            rules: [
                                v => {return v != 6},
                                v => {return v != 5},
                            ],
                            msg: ['不能选择8年', '不能选择7年'],
                            onError(msg, rule, value) {
                            }
                        }
                    }
                }
            }
        },
        components: {
            commonForm,
            Radio,
            ScrollContainer
        },
        methods: {
            onFormUpdated ({formData, name, value, error}) {
                console.log('更新校验')
                console.log(formData, error)
            }
        },
        mounted () {
            setTimeout(() => {
                this.formOptions[4].value = '前端';
//                this.formOptions[1].value = '前端';
            }, 2000);
        }
    }
</script>

<style lang="less" scoped>
    .form-demo {
        position: relative;
        display: block;
        background-color: #fff;
        height: 100%;
        width: 800px;
        margin: 40px auto;
        .form-head {
            position: relative;
            display: block;
            background-color: rgba(0, 0, 0, 0);
            color: #404a58;
            font-size: 15px;
            font-weight: 600;
            padding: 13px 18px 10px 18px;
            line-height: 25px;
            min-height: 50px;
            &:after {
                display: block;
                position: absolute;
                width: calc(100% - 30px);
                left: 15px;
                margin-top: 1px;
                content: "";
                padding-bottom: 11px;
                opacity: 0.5;
                border-bottom: 1px solid #dce2e9;
            }
        }
        .form-body {
            padding: 30px;
        }
    }
</style>
