<template>
  	<li class="nav-item">
  		<a v-if="route.linkDisable" @click="expandMenu" :class="curActive">
			<span class="iconfont icon" v-html="route.icon" v-if="false"></span>
	        <span class="nav-label">{{route.displayName}}</span>
	        <span class="nav-arrow" v-if="route.children"></span>
  		</a>
        <router-link v-if="!route.linkDisable" :to="route.path" active-class="active" :class="{'no-children':!route.children}">
	        <span class="iconfont icon" v-html="route.icon" v-if="false"></span>
	        <span class="nav-label">{{route.displayName}}</span>
        </router-link>
        <ul class="nav-second-list" v-if="route.children" :style="subListHeight">
        	<li v-for="routeItem in route.children" ref="subItem">
        		<router-link :to="routeItem.path" active-class="active" :class="{'no-children':!routeItem.children}"> {{routeItem.displayName}}</router-link>
        	</li>
        </ul>
  	</li>
</template>

<script>
export default {
    name: 'navBar',
    props:['route','curRoute'],
    data () {
        return {
	        "ulActive":false,
            "collapse":false
		}
    },
    computed:{
      	curActive(){
      		return {
      			"active":this.ulActive,
                "arrow-rotate":this.collapse
      		}
      	},
      	subListHeight(){
            let subItemHeight = this.$refs.subItem ? this.$refs.subItem[0].offsetHeight : 0;
      		let listHeight = this.route.children.length * subItemHeight;

      		return {
      			"height":this.collapse?`${listHeight}px`:0
      		}
      	}
    },
    methods:{
		expandMenu(){
			this.collapse = !this.collapse;
		}
    },
    watch:{
      	'$route.path'(){
 			let childrenMatched;// 判断子目录匹配
 			let curRoute = this.$route;

 			if(this.route.children){
 				childrenMatched = this.route.children.filter(item=>item.path == curRoute.path).length;
 			}

      		if(!(this.route.path == curRoute.path) && childrenMatched <= 0){
				this.collapse = false;
      			this.ulActive = false;
      		}else if(childrenMatched > 0){
      			this.collapse = true;
      			this.ulActive = true;
      		}
      	}
    },
    mounted(){
      	let activeItem = this.$el.querySelector('a.active');

      	if(activeItem){
      		this.collapse = true;
      		this.ulActive = true;
      	}
    }
}
</script>