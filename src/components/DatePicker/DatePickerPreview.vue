<template>
    <div class="picker-preview">
        <!--double-left-->
        <span class="picker-preview-icon double-left" @click="clickDoubleLeft">
            <i class="fa fa-angle-double-left" aria-hidden="true"></i>
        </span>
        <!--double-right-->
        <span class="picker-preview-icon double-right" @click="clickDoubleRight">
            <i class="fa fa-angle-double-right" aria-hidden="true"></i>
        </span>
        <!--single-left-->
        <span
            class="picker-preview-icon single-left"
            v-if="month && year"
            @click="clickSingleLeft"
        >
            <i class="fa fa-angle-left" aria-hidden="true"></i>
        </span>
        <!--single-right-->
        <span
            class="picker-preview-icon single-right"
            v-if="month && year"
            @click="clickSingleRight"
        >
            <i class="fa fa-angle-right" aria-hidden="true"></i>
        </span>
        <!--picker-preview-text-->
        <div class="picker-preview-text">
            <span @click="clickYear" v-if="year">{{formatYear}}</span>
            <span @click="clickMonth" v-if="month">{{formatMonth}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'DatePickerPreview',
        props: {
            year: {
                type: String,
                default: ''
            },
            month: {
                type: String,
                default: ''
            }
        },
        computed: {
            formatYear() {
                return this.year ? (this.year + '年') : '';
            },
            formatMonth() {
                return this.month ? (this.month + '月') : '';
            },
        },
        methods: {
            clickYear() {
                this.$emit('clickYear', {year: this.year})
            },
            clickMonth() {
                this.$emit('clickMonth', {month: this.month})
            },
            clickDoubleLeft() {
                this.$emit('onClickDoubleLeft');
            },
            clickDoubleRight() {
                this.$emit('onClickDoubleRight');
            },
            clickSingleLeft() {
                this.$emit('onClickSingleLeft');
            },
            clickSingleRight() {
                this.$emit('onClickSingleRight');
            }
        }
    }
</script>
