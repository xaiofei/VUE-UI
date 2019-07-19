<style lang="less" scoped>
.page-bar{
	/*position:relative;*/
    width:100%;
    text-align:center;
}	
.allData{
	padding-left:10px;
}
.page-bar {
	-webkit-touch-callout: none;
	-webkit-user-select: none;
	-khtml-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
}
.page-button-disabled {
	color:#ddd !important;
    cursor: not-allowed;
}
.page-bar li {
	list-style: none;
	display: inline-block;
}
.page-bar li:first-child > a {
	margin-left: 0px;
}
.page-bar a {
	/*border: 1px solid #ddd;*/
	text-decoration: none;
	position: relative;
	/*float: left;*/
	padding: 6px 12px;
	margin-left: -1px;
	line-height: 1.42857143;
	color: #337ab7;
	currentPagesor: pointer;
	margin-right:5px;
}
.page-bar a:hover {
    cursor: default;
	background-color: #eee;
}
.page-bar .active a {
	color: #fff;
	cursor: default;
	background-color: #337ab7;
	border-color: #337ab7;
}
.page-bar i {
	font-style: normal;
	color: #d44950;
	margin: 0px 4px;
	font-size: 12px;
}
.tex{
    border: 1px solid #ddd;
    text-decoration: none;
    width:34px;
    height:30px;
    font-size:15px;
}
.select{
    border: 1px solid #ddd;
    text-decoration: none;
    min-width:70px;
    height:33px;
    font-size:15px;
}
.select option{
    height:30px;
    line-height:30px;
}
</style>
<template>
	<div class="page-bar"> 
	 	
     <ul> 
       <li>
        <select name="" id="" class="select" @change="selectData" v-model="name">
            <option v-for="item in options" v-bind:value="item.name">{{item.name}}</option>
        </select>
      </li>
       <li><a :class="setButtonClass(0)" @click="prvePage(currentPage)"><</a></li> 
       <li v-for="index in indexs" :class="{ active: currentPage == index }"> 
          <a @click="btnClick(index)">{{ index < 1 ? "..." : index }}</a> 
       </li> 
       <li><a :class="setButtonClass(1)" @click="nextPage(currentPage)">></a></li>
       <li>跳至 <input type="number" v-model="texNum" class="tex" min="0" @keyup.enter.32="skip(texNum)" @blur="skip(texNum)"> 页</li>
       <span class="allData">共{{this.allPages}}页，{{this.all}}项</span>
     </ul> 
    </div>
</template>
<script>
export default {
    name: 'pagination',
	props: ['currentPage', 'all'],
    data(){
        return {
            texNum:1,
            num:23,
            name:"15条/页",
            options: [{
            　　"indexId":1,
            　　"name": "15条/页"
            　　}, {
            　　"indexId":2,
            　　"name": "50条/页"
            　　}, {
            　　"indexId":3,
            　　"name": "100条/页"
            　　}]
        }
    },
    computed: {
        allPages (){
          return Math.ceil(this.all/parseInt(this.name))
        },
        indexs: function () {
            var left = 1
            var name = this.name
            var right = Math.ceil(this.all/parseInt(name))
            var ar = []
            if (Math.ceil(this.all/parseInt(name)) >= 11) {
                if (this.currentPage > 5 && this.currentPage < Math.ceil(this.all/parseInt(name)) - 4) {
                    left = this.currentPage - 5
                    right = this.currentPage + 4
                } else {
                    if (this.currentPage <= 5) {
                        left = 1
                        right = 10
                    } else {
                        right = Math.ceil(this.all/parseInt(name))
                        left = Math.ceil(this.all/parseInt(name)) - 9
                    }
                }
            }
            while (left <= right) {
                ar.push(left)
                left++
            }
            if (ar[0] > 1) {
                ar[0] = 1;
                ar[1] = -1;
            }
            if (ar[ar.length - 1] < Math.ceil(this.all/parseInt(name))) {
                ar[ar.length - 1] = Math.ceil(this.all/parseInt(name));
                ar[ar.length - 2] = 0;
            }
            return ar
        }
    },
    methods: {
        btnClick(data) {
            this.texNum = data;
            if (data < 1) return;
            if (data != this.currentPage) {
                this.$emit('getNum', Number(data));
                // console.log(this.currentPage)
            }
        },
        selectData(){
          // console.log(parseInt(this.name))
          this.texNum = 1;
          this.$emit("selectChange",parseInt(this.name))
        },
        nextPage(data) {
            if (this.currentPage >= this.allPages) return false;
            this.btnClick(this.currentPage + 1);
        },
        prvePage(data) {
            if (this.currentPage <= 1) return false;
            this.btnClick(this.currentPage - 1);
        },
        skip(data){
          this.btnClick(data);
        },
        setButtonClass(isNextButton) {
            if (isNextButton) {
                return this.currentPage >= this.allPages ? "page-button-disabled" : ""
            }
            else {
                return this.currentPage <= 1 ? "page-button-disabled" : ""
            }
        }
    }
}
</script>