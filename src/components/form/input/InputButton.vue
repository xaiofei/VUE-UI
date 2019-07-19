<template>
    <Btn
        :type="style"
        :name="name"
        :submit="type === 'submit'"
        :value="value"
        :disabled="disabled"
        :ghost="ghost"
        @onClick="onClick"
        v-html="text"
    >
    </Btn>
</template>

<script>

    import Button from '../../basic/Button';

    const defaultProps = {
        name: 'button',
        title: 'title',
        type: 'button',
        style: 'default',
        text: 'button',
        value: '',
        disabled: false,
        onClick() {}
    }

    export default {
        name: 'InputButton',
        props: {
            config: {
                type: Object
            }
        },
        data() {
            return {};
        },
        computed: {
            style() {
                return this.config.style;
            },
            text() {
                return this.config.text;
            },
            value() {
                return this.config.value;
            },
            disabled() {
                return this.config.disabled;
            },
            ghost() {
                return this.config.ghost;
            },
            name() {
                return this.config.name;
            },
            type() {
                return this.config.type;
            }
        },
        methods: {
            /**
             * 按钮点击事件
             */
            onClick() {
                if (this.type === 'button') {
                    if (!this.config.onClick) {
                        return false;
                    }
                    if (typeof this.config.onClick !== 'function') {
                        throw new TypeError('OnClick must be a function!')
                    }
                    this.config.onClick();
                    return true;
                }
            }
        },
        components: {
            Btn: Button
        }
    }
</script>
