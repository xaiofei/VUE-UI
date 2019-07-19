<template>
    <div>
        <div ref="popover" class="popover" :style="curPos" :class="directionClass">
            <slot name="popoverContent"></slot>
        </div>
        <slot name="triggerEl"></slot>
    </div>
</template>


<script>
    export default {
        name:'popover',
        props: ['trigger','direction'],
        data() {
            return {
                directionClass: this.direction || '',
                curStyle: {
                    x: '0',
                    y: '0',
                    opacity: 0,
                    visibility: 'hidden'
                },
                deltaOffset: 20,// pop与触发元素间距
                bannerTop: document.querySelector('.top-header').offsetHeight
            }
        },
        computed: {
            curPos() {
                return {
                    transform: "translate3d("+this.curStyle.x+"px,"+this.curStyle.y+"px,"+ "0)",
                    opacity: this.curStyle.opacity,
                    visibility: this.curStyle.visibility
                }
            }
        },
        methods: {
            activePopover(tarEl, popover) {
                // 触发元素
                let tarX = tarEl.getBoundingClientRect().left,
                    tarY = tarEl.getBoundingClientRect().top,
                    tarWidth = tarEl.offsetWidth,
                    tarHeight = tarEl.offsetHeight;
                    // console.log(tarX)

                // pop元素
                let popWidth = popover.offsetWidth,
                    popHeight = popover.offsetHeight-10;
                // y轴方向位置
                if(tarY >= popHeight + this.bannerTop){// 目标上方显示
                    this.directionClass = "top";
                    this.curStyle.y = tarY - popHeight - this.deltaOffset + window.scrollY;
                }else {// 目标下方显示
                    this.directionClass = "bottom";
                    this.curStyle.y = tarY  + tarHeight + this.deltaOffset + window.scrollY;
                }

                // x轴方向位置
                if(tarX + popWidth > window.innerWidth){
                    this.curStyle.x = tarX - popWidth + tarWidth;
                    this.directionClass += " " + this.directionClass+"-right";
                }else if(tarEl.offsetLeft > popWidth / 2){
                    this.curStyle.x = tarX - popWidth / 4;
                }else {
                    this.curStyle.x = tarX;
                    this.directionClass += " " + this.directionClass+"-left";
                }

                this.curStyle.opacity = 1;    
                this.curStyle.visibility = 'visible';           
            },
            resetPopover() {
                this.curStyle.opacity = 0;
                this.curStyle.visibility = 'hidden';
            }
        },
        mounted() {
            let triggerEl = this.$slots.triggerEl[0].elm;
            let popover = this.$refs.popover; 

            document.body.appendChild(popover);

            if(this.trigger == 'hover'){
                triggerEl.addEventListener("mouseenter",(e) => {
                    let tarEl = e.target;
                    this.activePopover(tarEl, popover)
                },false);   

                triggerEl.addEventListener("mouseleave",(e) => {
                    this.resetPopover();
                },false);  

                popover.addEventListener("mouseenter",(e) => {
                    this.activePopover(triggerEl, popover)
                },false);   

                popover.addEventListener("mouseleave",(e) => {
                    this.resetPopover();
                },false);     
            }
            if(this.trigger == 'click'){
                triggerEl.addEventListener("click",(e) => {
                    let tarEl = e.target;
                    this.activePopover(tarEl, popover)
                },false);  

                document.addEventListener("click",(e) => {
                    let tarEl = e.target;

                    if(!this.$el || !triggerEl || triggerEl.contains(tarEl) || !popover || popover.contains(tarEl)){
                        return ;
                    }
                    this.resetPopover();
                },false);  
            }
            
        },
        beforeDestory(){
            let popover = this.$refs.popover; 
            document.body.removeChild(popover);
        }
    }
</script>