<template>
    <li
        class="input-select-option"
        :class="{
            disabled: option.disabled === true,
            active: active === true && option.value
        }"
        @click="onClick"
    >
        <CheckBox :isChecked="active" v-if="multiple" @onClick="onClick"></CheckBox>
        {{option.label}}
        <slot></slot>
    </li>
</template>
<script>

    import CheckBox from '../../../basic/CheckBox.vue';

    export default {
        name: 'SelectOption',
        props: {
            option: {
                type: Object,
                default() {
                    return {};
                }
            },
            active: {
                type: Boolean,
                default: false
            },
            multiple: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            onClick() {
                if (this.option.disabled === true) {
                    return false;
                }
                this.$emit('onClick', this.option)
                return true;
            }
        },
        components: {
            CheckBox
        }
    };
</script>
