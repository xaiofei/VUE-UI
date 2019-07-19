<template>
  <div class="table page-container">
    <alert ref="alert_delete" :cancelBtn="cancelBtn">
    </alert>
    <modal ref="alert_detail" :detail-data="detailData" :table-config="tableConfig.dataConfig"></modal>
    <div class="table-demo">
        <div class="table-head">
        </div>
        <div class="table-body">
            <common-table
            :class="{stripe:tableConfig.baseConf.stripe}"
            :table-data="tableData"
            :table-config="tableConfig.dataConfig"
            :selectCheckbox="tableConfig.baseConf.selection"  
            @getItem="getItem"
            @selectionCheckbox="selectionCheckbox"
            @clickTr="clickTr"
            >
            <!--自定义thead(基础)-->
             <thead class="table-thead" slot="customThead">
                <tr>
                    <th v-if="tableConfig.baseConf.selection" class="selection">
                        <check-box :isChecked="Allchecked" @onClick="clickEvent"></check-box>
                    </th>
                    <th class="table-title" :class="{'cell':item.sort,'active':item.sortflag}" v-for="item in tableConfig.dataConfig" @click="touchcol($event,item)" :style="{width:item.extra.width ? item.extra.width:''}">
                        <span class="title">{{item.title}}</span>
                        <span class="symbol" v-if="item.sort" ></span>
                    </th>
                </tr>
            </thead>
            <!--自定义thead(扩展)-->  
<!--             <thead class="table-thead" slot="customThead">
                <tr>
                    <th v-if="tableConfig.baseConf.selection" class="selection">
                        <check-box :isChecked="Allchecked" @onClick="clickEvent"></check-box>
                    </th>
                    <th class="table-title" :class="{'cell':item.sort,'active':item.sortflag}" @click="clickTh(item)" v-for="item in tableConfig.dataConfig">
                        <span class="title">{{item.title}}</span>
                        <span class="triangle"  v-if="item.sort" ></span>
                        <span :class="{'tips':item.tips}" v-if="item.tips"></span>
                        <span class="pop" v-if="item.tips">{{item.tipsContent}}</span>
                        <div class="sortOptionBox" v-if="item.sort">
                            <span class="options" v-for="opt in item.sortOptions" @click="sortOptionEvent(opt)">{{opt.optionName}}</span>
                        </div>
                    </th>
                </tr>
            </thead>   -->       
            </common-table>
        </div>
        <!-- <pagination
          class="pagination"
          :currentPage.sync="tableConfig.baseConf.currentPage"
          :all.sync="tableConfig.baseConf.all"
           @getNum="getNum">
       </pagination> -->
    </div>
  </div>
</template>

<script>
import checkBox from '../components/basic/CheckBox.vue'
import {getData} from '@/utils/apiTools.js';
import commonTable from '@/components/table/CommonTable'
import alert from '@/components/message/Alert'
import modal from '@/components/message/Modal'
import pagination from '@/components/pagination/pagination'
export default {
    name: 'table',
    data() {
        return {
            xx:'xiaofei',
            Allchecked:false,
            tableData: [],
            detailData: [],
            tableConfig:{
            baseConf:{
                selection:true,
                currentPage:1,
                all:500,
                stripe:false,
            },
            dataConfig: [{
                title: "序号",
                type: "number",
                name: "num",
                sort:true,
                sortflag:false,
                extra: {
                    width: '100px',
                },
                sortOptions:[{
                    optionName:"从大到小",

                },{
                    optionName:"从小到大"
                }]
            },{
                title: "标题",
                type: "text",
                name: "title",
                tips:true,
                tipsContent:'支持同一问题的不同问法，此列仅展示其中一种问法',
                extra: {
                    width: '20%'
                },
                useExtComponent: true,
                extComponent: {
                    name:"popover",
                    trigger:"hover",
                    popoverContent:[{
                        type:"text",
                        propName:'title',
                    }]
                }
            }, {
                title: "来源",
                type: "text",
                name: "source",
                extra: {
                    width: 'auto',
                },
                tips:true,
                tipsContent:"支持同一问题的多种答案，此列仅展示其中一种答案",
                useExtComponent: true,
                extComponent: {
                    name:"popover",
                    trigger:"hover",
                    popoverContent:[{
                        type:"text",
                        propName:'title',
                    }]
                }
            }, {
                title: "图片",
                type: "img",
                name: "picInfo",
                extra: {
                    width: '100px'
                },
                useExtComponent: true,
                extraClass:'img',
                extComponent: {
                    name:"popover",
                    trigger:"hover",
                    popoverContent:[{
                        type:"img",
                        style:{
                            width:'100px'
                        }
                        //url:""
                    }, {
                        type:"text",
                        propName:'name'
                    }]
                }
            }, {
                title: "发布时间",
                type: "text",
                name: "ptime",
                sort:true,
                sortflag:false,                
                extra: {
                    width: 'auto',
                }
            }, {
                title: "操作",
                type: "btnGroup",
                name: "",
                extra: [{
                    name: "编辑",
                    style: ""
                }, {
                    name: "删除",
                    style: ""
                }]
            }]

            }
        }
    },
    components: {
        commonTable,
        alert,
        modal,
        pagination,
        checkBox
    },
    mounted() {
        getData("../../src/mock/tableTest.json").then((data)=>{
            console.log(data);
            var checkboxConfig=false
            for(var i = 0; i < data.data.length;i++){
                // data.data[i].checkboxConfig = JSON.parse(JSON.stringify(checkboxConfig))
                data.data[i].checkboxConfig = checkboxConfig
            }
            console.log(data.data)
            this.tableData = data.data;
        }).catch((e)=>{
            console.log(e)
        })
    },
    methods: {
        selectionCheckbox(item){   //tbody的checkbox点击事件
            console.log(item)
            this.Allchecked=item.state
         },
        getItem(item) {
             if(item[1].name == '删除'){
                this.$refs.alert_delete.show();
            }
            if(item[1].name == '编辑'){
                this.$refs.alert_detail.show();
                this.detailData = item[0].dataRow;
                console.log(this.detailData)
            }
        },
        getNum(data){
           this.tableConfig.baseConf.currentPage = data;
        },
        clickTr(data){    //点击tr事件
            console.log(data)
        },
        cancelBtn() {
            this.$refs.alert_delete.close();
        },
        clickEvent(){   //thead全选checkbox点击事件
            this.Allchecked = !this.Allchecked
            let len = this.tableData.length;
            if(this.Allchecked){
                this.tableData.forEach(row => {
                row.checkboxConfig = true;
                })
                // this.$emit("checkAll",len)
            }else{
                this.tableData.forEach(row => {
                row.checkboxConfig = false;
                })
                // this.$emit("checkAll",0)
            }    
        },
        clickTh(item){
            item.sortflag=!item.sortflag
        },
        sortOptionEvent(opts){   //thead排序下拉点击事件
            console.log(opts)
        },
         touchcol(e,item){     //点击排序
            if(item.sort){
                var arr = []
                item.sortflag = !item.sortflag
                if(item.sortflag == false){
                    for(var i=0;i<this.tableData.length-1;i++){
                        for(var j=0;j<this.tableData.length-1-i;j++){
                            if(this.tableData[j][item.name]>this.tableData[j+1][item.name]){
                                var temp = this.tableData[j]
                                this.tableData[j] = this.tableData[j+1]
                                this.tableData[j+1] = temp

                            }
                        }
                    }
                }
                if(item.sortflag == true){
                    for(var i=0;i<this.tableData.length-1;i++){
                        for(var j=0;j<this.tableData.length-1-i;j++){
                            if(this.tableData[j][item.name]<this.tableData[j+1][item.name]){
                                var temp = this.tableData[j]
                                this.tableData[j] = this.tableData[j+1]
                                this.tableData[j+1] = temp

                            }
                        }
                    }
                }
                    arr=JSON.parse(JSON.stringify(this.tableData))
                  this.tableData=arr
                    // console.log(arr)
                    // this.$emit('changeTableData',arr)
            }
    }
}
}
</script>

<style lang="less">
.table-demo{
    position: relative;
    display: block;
    background-color: #fff;
    height: 100%;
    margin: 0 auto;
    .table-head{
        position: relative;
        display: block;
        background-color: rgba(0,0,0,0);
        color: #404a58;
        font-size: 15px;
        font-weight: 600;
        padding: 13px 18px 10px 18px;
        line-height: 25px;
        //min-height: 50px;
        &:after{
            display: block;
            position: absolute;
            width: calc(100% - 30px);
            left: 15px;
            margin-top: 1px;
            content: "";
            padding-bottom: 11px;
            opacity: 0.5;
            border-bottom: 1px solid #dce2e9;
        }
    }
    .table-body{
        margin-bottom: 30px;
        .img {
            width: 300px;
            img {
                width: 100%;
            }
        }
    }

}

</style>
