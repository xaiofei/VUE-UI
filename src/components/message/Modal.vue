<template>
    <transition name='fade'>
        <div class="alert" v-show="showAlert">
            <div class="wrap">
                <div class="head">{{title}}</div>
                    <span class="delete_log" @click="cancel">x</span>
                    <div class="body">
                        <slot>
                            <p>{{message}}</p>
                            <div v-for="item in detailData">{{item}}</div>
                        </slot>
                    </div>
                    <div class="foot">
                    <div>
                        <button class="btn-base" @click.stop="sure">确定</button>
                        <button class="btn-gray" @click.stop="cancel">取消</button>
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
            title: "编辑页面",
            message: "这是编辑页面"
        };
    },
    props: ['detailData','tableConfig'],
    methods: {
        cancel() {
            this.close();
        },
        sure() {
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
    },
};
</script>

<style scoped lang='less'>
.alert {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0, 0.6);
    z-index: 1000;
    overflow: hidden;
    //transition: all .3s ease-in-out;
}
.wrap {
    position: absolute;
    z-index: 1002;
    min-width: 400px;
    height:400px;
    background: #fff;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 4px;
}
.head {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #dedede;
    padding-left: 15px;
    color: #333;
    font-size:16px;
}
.body {
    padding: 40px 20px;
    text-align: left;
    font-size:16px;
}
.foot {
    position:absolute;
    bottom:1px;
    right:1px;
    height: 40px;
    text-align: right;
    button {
    margin-right: 15px;
        width:60px;
        height:30px;
        cursor: pointer;
        border-width:0;
        outline:none;
        border:1px solid #409eff;
    }
    .btn-base{
        background:#409eff;
        color:#fff;
        &:hover{
            background:#66b1ff;
            color:#fff;
        }
        &:active{
            background:#66b1ff;
            color:#fff;
        };
    }
    .btn-gray{
        background:#fff;
        color:#409eff;
        &:hover{
            background:#409eff;
            color:#fff;
        }
        &:active{
            background:#66b1ff;
            color:#fff;
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
.fade-enter-active {
    animation: modal-fade-in .3s;
}

.fade-leave-active {
    animation: modal-fade-out .3s;
}

@keyframes modal-fade-in {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

@keyframes modal-fade-out {
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}
</style>