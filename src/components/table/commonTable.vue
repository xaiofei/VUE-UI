<template>
    <table class="common-table" cellpadding="0" cellspacing="0" border="0">
        <slot name="customThead"></slot>
       <!--  <thead class="table-thead" v-if="customFlag">
            <tr>
                <th v-if="selectCheckbox" class="selection">
                    <check-box :isChecked="Allchecked" @onClick="clickEvent"></check-box>
                </th>
                <th class="table-title" :class="{'cell':item.sort,'active':sortflag}" @click="clicked" v-for="item in tableConfig">
                    <span class="title">{{item.title}}</span>
                    <span class="triangle"  v-if="item.sort" ></span>
                    <span :class="{'tips':item.tips}" v-if="item.tips"></span>
                    <span class="pop" v-if="item.tips">{{item.tipsContent}}</span>
                    <div class="sortOptionBox" v-if="item.sort">
                        <span class="options" v-for="opt in item.sortOptions" @click="sortOptionEvent(opt)">{{opt.optionName}}</span>
                    </div>
                </th>
            </tr>
        </thead> -->
        <table-tbody :table-data="tableData" :table-config="tableConfig" @getItem="getItem" 
        :showSelect="selectCheckbox" @selectAlls="selectAlls" @clickTr="clickTr"></table-tbody>
    </table>
</template>

<script>
    import popover from '../message/Popover';
    import tableTbody from './tableTbody.vue'
    import checkBox from '../basic/CheckBox.vue'
    export default {
        name: 'commonTable',
        props: ['tableData','tableConfig','selectCheckbox'],
        data() {
            return {
                // Allchecked:false,
                // sortflag: false  
            }
        },
        components: {
            tableTbody,
            checkBox,
            popover
        },
        methods: {
            imgStyle(item) {
                return {
                    width: item.extra.width,
                    height: item.extra.height
                }

            },
            getItem(item) {
                this.$emit('getItem', item);
            },
            // clickEvent(){
            //     this.Allchecked = !this.Allchecked
            //     let len = this.tableData.length;
            //     if(this.Allchecked){
            //         this.tableData.forEach(row => {
            //         row.checkboxConfig = true;
            //         })
            //         this.$emit("checkAll",len)
            //     }else{
            //         this.tableData.forEach(row => {
            //         row.checkboxConfig = false;
            //         })
            //         this.$emit("checkAll",0)
            //     }    
            // },
         selectAlls(item){
            // console.log(item)
            this.$emit("selectionCheckbox",item)
            // this.Allchecked = item.state
         },
         // sortOptionEvent(opt){
         //    console.log(opt.optionName)
         //    this.$emit('sortOptionEvent',opt)
         // },
         // clicked(){
         //   this.sortflag = !this.sortflag
         // },
         // touchcol(e,item){
         //    if(item.sort){
         //        var arr = []
         //        this.sortflag = !this.sortflag
         //        if(this.sortflag == false){
         //            for(var i=0;i<this.tableData.length-1;i++){
         //                for(var j=0;j<this.tableData.length-1-i;j++){
         //                    if(this.tableData[j][item.name]>this.tableData[j+1][item.name]){
         //                        var temp = this.tableData[j]
         //                        this.tableData[j] = this.tableData[j+1]
         //                        this.tableData[j+1] = temp

         //                    }
         //                }
         //            }
         //        }
         //        if(this.sortflag == true){
         //            for(var i=0;i<this.tableData.length-1;i++){
         //                for(var j=0;j<this.tableData.length-1-i;j++){
         //                    if(this.tableData[j][item.name]<this.tableData[j+1][item.name]){
         //                        var temp = this.tableData[j]
         //                        this.tableData[j] = this.tableData[j+1]
         //                        this.tableData[j+1] = temp

         //                    }
         //                }
         //            }
         //        }
         //            arr=JSON.parse(JSON.stringify(this.tableData))
                  
         //            // console.log(arr)
         //            this.$emit('changeTableData',arr)
         //    }
         // },
         clickTr(data){
            // console.log(data)
            this.$emit('clickTr',data)
         }
        }
    }

</script>
<style scoped>

 
</style>