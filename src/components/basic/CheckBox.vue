<template>
    <div class="input-checkbox" :class="{disabled: disabled}" @click.stop="click">
        <span class="input-checkbox-icon" :class="{active: isChecked}">
            <i class="fa fa-check" aria-hidden="true"></i>
        </span>
        <span class="input-checkbox-label">
            <slot></slot>
        </span>
    </div>
</template>

<script>
    export default {
        name: 'CheckBox',
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
                // this.isChecked =!this.isChecked
                this.$emit('onClick');
                return true;
            }
        }
    };
</script>
