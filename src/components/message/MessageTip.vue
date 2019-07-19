<template>
    <transition name='msg-fade'>
        <div class="message" :class="type" v-show="showAlert">
            <span class="icon"></span>
            <p class="content">{{content}}</p>
            <span class="delete_log" @click="cancel">×</span>
        </div>
    </transition>
</template>

<script>
const Msg = {
    name: 'message',
    data() {
        return {
            showAlert: false,
            content:'',
            type:''
        };
    },
    watch: {
        showAlert (v) {
            if(v) {
                setTimeout(()=>{
                    this.close();
                },3000);
                
            }
        }
    },
    methods: {
        cancel() {
            if (this.cancelBtn) {
                this.cancelBtn.apply(this.context);
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
        }
    }
};

Msg.install = (Vue) => {
    Vue.prototype.$message = (conf) => {
        let MessageConstructor = Vue.extend(Msg);
        let instance = new MessageConstructor({
            data: conf
        });

        instance.vm = instance.$mount();
        document.body.appendChild(instance.vm.$el);
        instance.vm.showAlert = true;
        instance.dom = instance.vm.$el;
    };
}

export default Msg;
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
.message {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%,-50%,0);
    background: rgba(0,0,0, 0.6);
    z-index: 1000;
    min-width: 288px;
    height: 32px;
    box-sizing: border-box;
    .icon{
        display: inline-block;
        width: 12px;
        height: 12px;
        margin-left: 16px;
        background: url(../../assets/default.svg) no-repeat;
        background-size: 12px 12px;
        vertical-align: middle;
        
    }
    &.success {
        background: #EBF8F2;
        border: 1px solid #A7E1C4;
        border-radius: 4px;   
        .icon{
            background: url(../../assets/success.svg)no-repeat;
            background-size: 12px 12px;
        }   
    }
    &.warn {
        background: #FFFAEB;
        border: 1px solid #FCCCA7;
        border-radius: 4px;
        .icon{
            background: url(../../assets/remind.svg)no-repeat;
            background-size: 12px 12px;
        }
    }
    &.error {
        background: #FEF3EB;
        border: 1px solid #FFE9A7;
        border-radius: 4px;
        .icon{
            background: url(../../assets/error.svg)no-repeat;
            background-size: 12px 12px;
        }
    }
    .content{
        display: inline-block;
        font-size: 12px;
        color: rgba(0,0,0,0.65);
        letter-spacing: 0;
        line-height: 30px;
        margin-left: 8px;
    }
    .delete_log{
        display: block;
        width: 10px;
        height: 10px;
        position:absolute;
        top:9px;
        right:12px;
        font-size:18px;
        line-height: 10px;
        cursor: pointer;
        color: #000;
        opacity: .43;
    }
}


.msg-fade-enter-active {
    animation: alert-fade-in .3s;
}

.msg-fade-leave-active {
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