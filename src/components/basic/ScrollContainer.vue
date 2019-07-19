<template>
    <div class="scroll" :style="{height: containerHeight + 'px'}">
        <div class="scroll-container" ref="scrollContainer">
            <div>
                <slot></slot>
            </div>
        </div>
        <span
            class="scroll-bar"
            :style="{height: barHeight + 'px', top: scrollBarTop + 'px', backgroundColor: color}"
            v-if="showScrollBar"
            ref="scrollBar"
            @mousedown="barMouseDown"
        >
        </span>
    </div>
</template>

<script>
    import { addMouseWheelEvent, removeMouseWheelEvent } from '../../utils/eventTools';
    // 接收一个固定高度
    // 是否高度自适应
    // 滚动条颜色
    // 加载完成后后根据容器高度与内容高度计算比例，渲染滚动条
    // 监听滚动条的事件
    // 监听滚动事件
    export default {
        name: 'ScrollContainer',
        props: {
            // 高度默认0
            height: {
                type: Number,
                default: 0
            },
            // 滚动条颜色
            color: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                // 滚动体高度
                scrollHeight: null,
                // 滚动条DOM
                scrollBar: null,
                // 滚动容器DOM
                scrollContainer: null,
                // 滚动条TOP值
                scrollBarTop: 0,
                // 滚动条每次移动的距离
                barFocusY: 0,
                // 容器高度
                containerHeight: parseInt(this.height, 10)
            }
        },
        computed: {
            /**
             * 是否显示滚动条
             * @return {boolean}
             */
            showScrollBar() {
                return this.containerHeight !== Math.round(this.barHeight, 10);
            },
            /**
             * 滚动条高度
             * @return {*}
             */
            barHeight() {
                let h;
                try {
                    // 容器高度 / 总高度 = bar高度 / 容器高度
                    h = this.containerHeight / this.scrollHeight * this.containerHeight;
                } catch (e) {
                    h = 0
                }
                return h
            },
        },
        methods: {
            /**
             * 点击了滚动条
             * @param {Event} e
             */
            barMouseDown(e) {
                // 为document添加拖动事件
                this.barFocusY = e.clientY;
                document.addEventListener('mousemove', this.barMouseMove);
                document.addEventListener('mouseup', this.barMouseUp);
            },
            /**
             * 滚动条发生mouseUp事件
             */
            barMouseUp() {
                document.removeEventListener('mousemove',this.barMouseMove);
                document.removeEventListener('mouseup',this.barMouseUp);
            },
            /**
             * 拖动滚动条
             * @param {Event} e
             */
            barMouseMove(e) {
                const moveY = e.clientY - this.barFocusY;
                this.changeBarTop(moveY);
                this.barFocusY = e.clientY;
            },
            /**
             * 更改滚动条位置
             * @param {number|string} move
             */
            changeBarTop(move) {
                if (this.scrollBarTop + move >= 0 && this.scrollBarTop + move + this.barHeight <= this.containerHeight) {
                    this.scrollBarTop = Math.round(this.scrollBarTop + move);
                    this.changeContainerScrollTop(this.scrollBarTop);
                }
                else if (this.scrollBarTop + move < 0) {
                    this.scrollBarTop = 0;
                    this.changeContainerScrollTop(this.scrollBarTop);
                }
                else if (this.scrollBarTop + move + this.barHeight > this.containerHeight) {
                    this.scrollBarTop = this.containerHeight - this.barHeight;
                    this.changeContainerScrollTop(this.scrollBarTop);
                }
            },
            /**
             * 更改容器位置
             * @param {string|number} scrollBarTop
             */
            changeContainerScrollTop(scrollBarTop) {
                const scrollBarCanMoveHeight = this.containerHeight - this.barHeight;
                const needScrollHeight = this.scrollHeight - this.containerHeight;
                const scrollTop = scrollBarTop / scrollBarCanMoveHeight * needScrollHeight;
                this.scrollContainer.scrollTop = scrollTop;
            },
            /**
             * 鼠标滚轮滚动
             * @param e
             */
            mouseWheel(e) {
                // + 为页面往下走 (但谷歌为往上走)
                // - 为页面往上走 (但谷歌为往下走)
                e.preventDefault();
                e.stopPropagation();
                // google等wheelDelta每次为120的倍数， firefox detail 每次为1的倍数
                const move = e.wheelDelta ? -e.wheelDelta / 12 : e.detail * 10;
                this.changeBarTop(move);
            },
            /**
             * 获取容器高度
             */
            getHeight() {
                let containerh = 0;
                try {
                    containerh = this.scrollContainer.childNodes[0].offsetHeight;
                } catch (e) {
                    containerh = 0;
                }
                this.containerHeight = containerh > parseInt(this.height, 10) ? parseInt(this.height, 10) : containerh;
            }
        },
        mounted() {
            // 获取dom节点
            this.scrollBar = this.$refs.scrollBar;
            this.scrollContainer = this.$refs.scrollContainer;
            this.scrollHeight = this.scrollContainer.scrollHeight;
            addMouseWheelEvent(this.scrollContainer, this.mouseWheel);
            this.getHeight();
        },
        updated() {
            this.scrollBar = this.$refs.scrollBar;
            this.scrollContainer = this.$refs.scrollContainer;
            this.scrollHeight = this.scrollContainer.scrollHeight;
            this.getHeight();
        },
        beforeDestroy() {
            removeMouseWheelEvent(this.scrollContainer, this.mouseWheel)
        }
    };
</script>
