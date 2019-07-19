/**
 * @file 路由配置
 * @author lvxin
 */

import Home from '@/pages/home';
import Basic from '@/pages/basic';
import Form from '@/pages/form';
import Table from '@/pages/table';
import Message from '@/pages/message';
import Header from '@/pages/basic/header';
import Footer from '@/pages/basic/Footer';
import Upload from '@/pages/upload';
import DatePicker from '@/pages/DatePicker';

export const routes = [{
    name: 'home',
    path: '/home',
    displayName: '主页',
    icon: '&#xe600',
    component: Home
}, {
    name: 'table',
    path: '/table',
    displayName: '表格',
    component: Table
}, {
    name: 'message',
    path: '/message',
    displayName: '消息',
    component: Message
}, {
    name: 'form',
    path: '/form',
    displayName: '表单',
    component: Form
}, {
    name: 'upload',
    path: '/upload',
    displayName: '上传',
    component: Upload
}, {
    name: 'datepicker',
    path: '/datepicker',
    displayName: 'DatePicker',
    component: DatePicker
}, {
    name: 'basic',
    path: '/basic',
    displayName: '基本组件',
    linkDisable: true, // 禁用link
    component: Basic,
    redirect: '/basic/header',
    children: [{
        name: 'header',
        path: '/basic/header',
        displayName: '头部栏',
        component: Header
    }, {
        name: 'footer',
        path: '/basic/footer',
        displayName: '底部栏',
        component: Footer
    }]
}];

const routesMap = {};
const createMap = routes => {
    routes.forEach(route => {
        let curRoute = Object.assign({}, route);

        if (curRoute.children && curRoute.children.length > 0) {
            createMap(curRoute.children);
        }

        routesMap[curRoute.name] = curRoute.displayName;
    });
};
createMap(routes);

export {routesMap};
