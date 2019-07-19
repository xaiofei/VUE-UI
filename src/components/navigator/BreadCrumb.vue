<template>
    <div class="bread-crumb">
        <ul class="crumb-list">
            <li class="crumb-item" v-for="(item,index) in navList">
                <router-link v-if="!item.linkDisable" :to="item.path" active-class="active">
                    <span class="nav-label">{{item.displayName}}</span>
                </router-link>
                <span class="split-symbol" v-if='index < navList.length-1' v-html="splitSymbol"></span>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name:'breadCrumb',
        props:['navList','splitSymbol']
    }
</script>