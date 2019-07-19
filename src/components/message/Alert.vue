<template>
    <transition name='fade'>
        <div class="alert" @click="close" v-show="showAlert">
            <div class="wrap" @click.stop="crv">
                <span class="icon" :class="iconType"></span>
                <div class="head">{{title}}</div>
                <span class="delete_log" @click="cancel" v-if="showCloseBtn">×</span>
                <div class="body">
                    <slot>
                        <p>{{message}}</p>
                    </slot>
                </div>
                <div class="foot">
                    <div>
                        <button class="btn-base" @click.stop="sureBtn" :disabled="type.disabled" :class="{'disabled':type.disabled}">{{type.sure}}</button>
                        <button class="btn-gray" @click.stop="cancelBtn">{{type.cancel}}</button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'alert',
    data() {
        return {
            showAlert: false,
        };
    },
    props: {
        // showAlert: {
        //     type: Boolean,
        //     default: false
        // },
        showCloseBtn:{
            type: Boolean,
            default: false
        },
        iconType:{
            type:String,
            default:''
            //弹框类型支持success、warning、error
        },
        title: {
            type: String,
            default: ''
        },
        message: {
            type: String,
            default: '确定要删除该项内容吗？',
        },
        type: { // 可以有confirm, 和inform两个类型
            type: Object,
            default() {
                return { 
                    sure: '确定',
                    cancel: '取消'
                }
              
            }
        },
        sureBtn: {
            type: Function,
        },
        cancelBtn: {
            type: Function,
        },
        context: {
            type: Object,
        },
    },
    methods: {
        cancel() {
            if (this.cancelBtn) {
                this.cancelBtn.apply(this.context);
            }
             this.close();
        },
        sure() {
            if (this.sureBtn) {
                this.sureBtn.apply(this.context);
            }
            this.close();
        },
        show() {
            this.showAlert = true;
            // document.body.style.overflow = "hidden";// 锁屏禁止滚动
        },
        close() {
            this.showAlert = false;
            // document.body.style.overflow = "auto";
        },
        crv(){

        }
    }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
.alert {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0, 0.6);
    z-index: 1000;
    //transition: all .3s ease-in-out;
}
.wrap {
    position: absolute;
    z-index: 1002;
    /*min-width: 400px;*/
    width:416px;
    height: 166px;
    background: #fff;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 4px;
}
.head {
    display: inline-block;
    height: 21px;
    line-height: 21px;
    margin-top: 21px;
    margin-left: 64px;
    color: rgba(0,0,0,0.75);
    font-size:16px;
    font-family: "微软雅黑";
    font-weight: bold
}
.body {
    height:42px;
    padding: 8px 64px 22px 64px;
    text-align: left;
    font-size:12px;
}
.foot {
    height: 32px;
    text-align: right;
    button {
        margin-right: 20px;
        width:65px;
        height:32px;
        cursor: pointer;
        border-width:0;
        outline:none;
        border:1px solid #108ee9;
        border-radius:4px
    }
    .btn-base{
        background:#108ee9;
        color:#fff;
        &:hover{
            background:#108ee9;
            color:#fff;
        }
        &:active{
            background:#108ee9;
            color:#fff;
        };
    }
    .btn-gray{
        background:#fff;
        color:#333;
        border-color: #d9d9d9;
        &:hover{
            background:#fff;
            color:#333;
        }
        &:active{
            background:#fff;
            color:#333;
        };
    }
}
.delete_log{
    position:absolute;
    top:10px;
    right:10px;
    width:15px;
    height:15px;
    font-size:20px;
    cursor: pointer;
    &:hover{
      color:#409eff;
    }
}
.disabled{
    background:#d9d9d9!important;
    border:1px solid #d9d9d9!important
}
.icon{
    width: 24px;
    height: 24px;
    position: absolute;
    border-radius: 50%;
    top: 20px;
    left: 20px;
    background: url(../../assets/default.svg)no-repeat;
}

.success{
    background: url(../../assets/success.svg)no-repeat;
}

.error{
    background: url(../../assets/error.svg)no-repeat;
}
.warning{
    background: url(../../assets/remind.svg)no-repeat;
}
.fade-enter-active {
    animation: alert-fade-in .3s;
}

.fade-leave-active {
    animation: alert-fade-out .3s;
}

@keyframes alert-fade-in {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

@keyframes alert-fade-out {
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}
</style>