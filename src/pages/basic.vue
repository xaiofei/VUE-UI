<template>
    <div class="basic page-container">
        {{title}}
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'basic',
    data () {
        return {
            title:"Basic Page"
        }
    }
}
</script>

<style lang="less" scoped>
.basic{
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
</style>
