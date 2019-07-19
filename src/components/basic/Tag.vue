<template>
    <span class="tag">
        <slot></slot>
        <i class="fa fa-times tag-close" aria-hidden="true" @click.stop="close"></i>
    </span>
</template>

<script>
    export default {
        name: 'Tag',
        props: {
            closeable: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                currentIcon: 'fa-times'
            }
        },
        computed: {

        },
        methods: {
            close() {
                this.$emit('onClose');
            }
        }
    };
</script>
