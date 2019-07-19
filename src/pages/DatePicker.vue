<template>
    <div class="page-container" :style="{padding: '10px'}">
<!--         <dp
            :datetime="datetime"
            :format="format"
            :readonly="readonly"
            :disabled="disabled"
            :editable="editable"
        ></dp> -->
        <dp
            :tarDateTime="tarDateTime"
            :curDateTime="curDateTime"
            :format="format"
            :readonly="readonly"
            :disabled="disabled"
            :editable="editable"
        ></dp>
    </div>
</template>

<script>
    // import DatePicker from '../components/DatePicker/DatePicker.vue';
    // export default {
    //     name: 'DatePicker',
    //     data() {
    //         return {
    //             datetime: new Date('2018-01-01'),
    //             format: 'yyyy-MM-dd HH:mm:ss',
    //             readonly: false,
    //             disabled: false,
    //             editable: true
    //         }
    //     },
    //     components: {
    //         dp: DatePicker
    //     }
    // }
    import DateRangePicker from '../components/DatePicker/DateRangePicker.vue';
    export default {
        name: 'DateRangePicker',
        data() {
            return {
                curDateTime: new Date((+new Date() - 3600 * 1000 * 24 * 7)),
                tarDateTime: new Date(),
                format: 'yyyy-MM-dd HH:mm',
                readonly: false,
                disabled: false,
                editable: true
            }
        },
        components: {
            dp: DateRangePicker
        }
    }
</script>
