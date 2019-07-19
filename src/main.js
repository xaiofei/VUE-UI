/**
 * @file 入口文件
 * @author lvxin
 */

import Vue from 'vue';
import App from './App';
import Router from 'vue-router';
import {routes} from '@/router/index.js';

import Message from '@/components/message/MessageTip';

Vue.config.productionTip = false;
Vue.use(Router);

let router = new Router({
    routes: [{
        path: '/',
        redirect: '/home'
    }, ...routes]
});



// 使用
Vue.use(Message.install);

let app = new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {App}
});
