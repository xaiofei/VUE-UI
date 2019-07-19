<template>
    <div class="home page-container">
        <popover trigger="hover">
            <div slot="popoverContent">
                <img src="http://cms-bucket.nosdn.127.net/aec95cfdaaa047808ba74f8bdf26b4fa20171201071418.png" alt="">
            </div>
            <span slot="triggerEl" class="triggerBtn">点我</span>  
        </popover>         
    </div>
</template>

<script>
import popover from '@/components/message/Popover';

export default {
    name: 'home',
    data () {
        return {

        }
    },
    components: {
        popover
    },
    mounted() {

    }
}
</script>

<style lang="less" scoped>
.home{
    position: relative;
    display: block;
    background-color: rgba(0, 0, 0, 0);
    color: #404a58;
    font-size: 15px;
    font-weight: 600;
    padding: 13px 18px 10px 18px;
    line-height: 25px;
    min-height: 50px;
}
.triggerBtn{
    display:block;
    width:100px;
    height:50px;
    background-color:#ff9900;
    text-align:center;
    color:#fff;
    line-height:50px;
}
</style>
