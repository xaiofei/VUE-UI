<template>
    <tbody class="table-tbody">
    <tr class="table-tr" v-for="(data,index) in tableData" @click.stop="clickTr(data,index)">
        <td v-if="showSelect" class="table-td selection">
            <check-box :isChecked="data.checkboxConfig" @onClick="clickEvent(data,index)"></check-box>
        </td>
        <td class="table-td" v-for="item in tableConfig" :class="tdExtClass(data,item)" :style="extraStyle(item)">
            <div class="item-cell">
                <span v-if="item.type=='number'">{{data[item.name]}}</span>
                <template v-if="item.type=='text'">
                    <span v-if="!item.useExtComponent">{{data[item.name]}}</span>
                    <popover v-if="!!item.useExtComponent" :trigger="item.extComponent.trigger">
                        <div slot="popoverContent">
                            <div v-for="content in item.extComponent.popoverContent">
                                <img v-if="content.type=='img'" :src="data[item.name]" :style="content.style">
                                <span v-if="content.type=='text'&&!!content.propName" :style="content.style">{{data[content.propName]}}</span>
                                <span v-if="content.type=='text'&&!content.propName" :style="content.style">{{content.content}}</span>
                            </div>
                        </div>
                        <span slot="triggerEl">{{data[item.name]}}</span>
                    </popover>
                </template>
                <template v-if="item.type=='img'">
                    <!-- <div class="originImg"> -->
                        <img v-if="!item.useExtComponent" :src="data[item.name]" alt="item.name"/>
                    <!-- </div> -->
                    <popover v-if="!!item.useExtComponent" :trigger="item.extComponent.trigger">
                        <div slot="popoverContent">
                            <div v-for="content in item.extComponent.popoverContent">
                                <div class="minImg">
                                     <img v-if="content.type=='img'" :src="data[item.name]" :style="content.style">
                                </div>
                                <span v-if="content.type=='text'&&!!content.propName" :style="content.style">{{data[content.propName]}}</span>
                                <span v-if="content.type=='text'&&!content.propName" :style="content.style">{{content.content}}</span>
                            </div>
                        </div>
                        <img slot="triggerEl" :src="data[item.name]" alt="item.name"/>
                    </popover>
                </template>
                <template v-if="item.type=='btnGroup'">
                    <button class="item-btn" v-for="btn in item.extra" @click="getItem([{dataRow:data},btn])">
                        <span slot="triggerEl" v-html="btn.name"></span>
                    </button>
                </template>
            </div>
        </td>
    </tr>
    </tbody>
</template>

<script>
    import popover from '../message/Popover';
    import checkBox from '../basic/CheckBox.vue'

    export default {
        name: "tableTr",
        props: ["tableData","tableConfig","showSelect"],
        components: {
            checkBox,
            popover
        },
        data() {
            return {

            }
        },
        methods: {
            tdExtClass(data,item) {
                if(!item.extraClass){
                    return ;
                }
                return item.extraClass + (!!item.extraClassProperty ? ('-' + data[item.extraClassProperty]) : '');
            },
            extraStyle(item) {
                return item.extra
            },
            extraWidthStyle(item) {
                if(item.extra && item.extra.width) {
                    return {
                        width: item.extra.width
                    }
                }else {
                    return ;
                }
            },
            getItem(item) {
                this.$emit('getItem', item);
            },
            clickEvent(data,index){
                this.tableData[index].checkboxConfig = !this.tableData[index].checkboxConfig
                var len = this.tableData.length;
                // console.log(len)
                var data = [];
                for(var i=0;i<len;i++){
                   if(this.tableData[i].checkboxConfig){
                      data.push(this.tableData[i]);
                   }
                }
                // console.log(data)
                var dataL = data.length;
                if(dataL == len){
                   this.$emit('selectAlls',{state:true,num:data})
                }else{
                   this.$emit('selectAlls',{state:false,num:data})
                }
            },
            clickTr(data,index){
                this.$emit('clickTr',{data,index})
            }
            // changeSate() {
            //     console.log(this.tableData)
            //     var len = this.tableData.length;
            //     console.log(len)
            //     var data = [];
            //     for(var i=0;i<len;i++){
            //        if(this.tableData[i].checkboxConfig.checked){
            //           data.push(this.tableData[i].checkboxConfig.checked);
            //        }
            //     }
            //     console.log(data)
            //     var dataL = data.length;
            //     if(dataL == len){
            //        this.$emit('selectAlls',true)
            //     }else{
            //        this.$emit('selectAlls',false)
            //     }
            // }

        }
    }
</script>
