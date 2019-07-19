<template>
    <div class="input-text"
         v-bind:class="{'input-text-active': this.focus}"
         @mouseenter.stop="enter"
         @mouseleave.stop="leave"
    >
        <input
            :value="value"
            type="text"
            :name="name"
            :placeholder="placeholder"
            :disabled="disabled === true"
            @input="onInput"
            @focus="onfocus"
            @blur="onblur"
            autocomplete="off"
        />
        <span class="el-input-close" v-if="this.config.clearable && this.show">
            <i class="fa fa-times-circle form-clear-Icon" aria-hidden="true" @click.stop="close"></i>
        </span>
    </div>
</template>

<script>

    import ScrollContainer from './ScrollContainer.vue';

    export default {
        name: 'Text',
        props: {
            config: {
                type: Object,
            }
        },
        data() {
            return {
                show: false,
                focus: false,
            }
        },
        computed: {
            value() {
                return this.config.value;
            },
            placeholder() {
                return this.config.placeHolder;
            },
            disabled() {
                return this.config.disabled;
            },
            name() {
                return this.config.name;
            }
        },
        methods: {
            onInput (e) {
                const value = e.target.value;
                this.show = value !== '';
                if (typeof this.config.onChange === 'function') {
                    this.config.onChange(value,{});
                }
                this.$emit('onChange', {value, name: this.config.name});
            },
            enter() {
                if (this.config.value) {
                    this.show = true;
                }
            },
            leave() {
                this.show = false;
            },
            close() {
                this.$emit('onChange', {value: ''});
            },
            onfocus() {
                this.focus = true;
            },
            onblur() {
                this.focus = false;
            }
        },
        created() {
            this.$emit('onChange', {value: this.config.value || ''});
        },
        mounted() {

        },
        components: {
            ScrollContainer
        }
    }
</script>
