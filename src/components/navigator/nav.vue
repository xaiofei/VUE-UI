<template>
	<nav class="navbar-side" role="navigation">
		<ul class="nav-list">
			<nav-item v-for="route in this.routesList" :route="route" :key="route.name"></nav-item>	
		</ul>
	</nav>
</template>

<script>
import navItem from './NavItem';

export default {
    name: 'navBar',
    props: ['routesList'],
    data () {
        return {

        }
    },
    methods: {
    },
    components: {
    	navItem
    }
}
</script>