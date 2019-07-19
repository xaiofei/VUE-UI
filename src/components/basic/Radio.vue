<template>
    <div class="input-radio" :class="{disabled: disabled}" @click="click">
        <span class="input-radio-icon" :class="{active: isChecked}">
            <i class="fa fa-circle" aria-hidden="true"></i>
        </span>
        <span class="input-radio-label" :class="{active: isChecked}">
            <slot></slot>
        </span>
    </div>
</template>

<script>
    export default {
        name: 'Radio',
        props: {
            isChecked: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            click() {
                if (this.disabled) {
                    return false;
                }
                this.$emit('onClick');
                return true;
            }
        }
    };
</script>
