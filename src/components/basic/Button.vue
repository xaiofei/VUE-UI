<template>
    <button
        class="btn"
        v-bind:class="[btnClass, disabled ? 'disabled' : '']"
        :type="btnType"
        :name="name"
        :value="value"
        :disabled="disabled"
        @click="clickBtn"
    >
        <slot></slot>
    </button>
</template>

<script>
    export default {
        name: 'Button',
        props: {
            type: {
                type: String,
                default: 'default'
            },
            ghost: {
                type: Boolean,
                default: false
            },
            name: {
                type: String,
                default: ''
            },
            value: {
                type: String,
                default: ''
            },
            disabled: {
                type: Boolean,
                default: false
            },
            submit: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            /**
             * 计算按钮样式
             * @return {string}
             */
            btnClass() {
                const typeArray = ['default'];
                let className = 'btn-';
                const type = typeArray.includes(this.type) ? this.type : 'default';
                className += type ? type : 'default';
                if (this.ghost) {
                    className += '-ghost';
                }
                return className;
            },
            /**
             * 按钮类型
             * @return {string}
             */
            btnType() {
                return this.submit ? 'submit' : 'button';
            }
        },
        methods: {
            /**
             * 按钮点击事件
             */
            clickBtn() {
                if (this.btnType === 'button') {
                    this.$emit('onClick');
                }
            }
        }
    }
</script>
