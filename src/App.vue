<template>
  <div id="app">
  	<banner title="通用组件系统">
  		<span class="user-info" slot="user">吕昕</span>
  	</banner>
  	<div class="main-container">
        <div class="scroll-wrap">
      		<nav-bar :routes-list='routesList'></nav-bar>
      		<div class="view-panel">
                <bread-crumb :nav-list='navList' split-symbol='/'></bread-crumb> 
    			<router-view :style="minHeight"/>
      		</div>
        </div>
  	</div>
  </div>
</template>

<script>
// 主体部件
import navBar from '@/components/navigator/Nav'
import banner from '@/components/basic/Banner'
import breadCrumb from '@/components/navigator/BreadCrumb'
import {routes, routesMap} from '@/router/index.js'

export default {
    name: 'app',
    components: {
        navBar,
        banner,
        breadCrumb
    },
    data(){
    	return {
    		routesList: routes
    	}
    },
    computed:{
    	minHeight() {
    		return {
    			"min-height":window.innerHeight - 100 + "px"
    		}
    	},
        navList() {
            let matchedArr = this.$route.matched.map(route => {
                return {
                    displayName:routesMap[route.name],
                    path:route.path
                }
            });
            return matchedArr;
        }
    }
}
</script>

<style lang="less">
    @import './style/index.less';

    html,body{
        height: 100%;
    }
    body{
        overflow: hidden;
    }
    #app{
        height: 100%;
        overflow-x: scroll;
    }
    .main-container{
    	min-width: 1280px;
        height: calc(~"100% - @{banner-height}");
    	margin: 0 auto;
    	position: relative;
        margin-top: @banner-height;
        overflow: hidden;
        .scroll-wrap{
            overflow: scroll;
            height: 100%;
        }
    	.view-panel{
    		position: relative;
    		padding: 20px 30px;
    		transition: 0.15s;
    		margin-left: 210px;
    		box-sizing: border-box;
            overflow: hidden;
    		.page-container{
    			position: relative;
    			width: 100%;
    			animation:fade-in 1s;
    			background: #ffffff;
                padding-bottom: 300px;
    		}
    	}
    }
    .user-info{
    	position: absolute;
    	right: 20px;
    	top: 20px;
        color: #fff;
    }
</style>
