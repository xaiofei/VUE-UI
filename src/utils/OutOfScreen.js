/**
 * @file OutOfScreen
 * @author zhouqihang(v_zhouqihang@baidu.com)
 * @desc 自定义指令，用于检测容器是否超出屏幕
 */

let OutOfScreen = {};
OutOfScreen.install = function (Vue, options) {
    Vue.directive('outOfScreen', {
        inserted(el, binding) {
            console.log(el, el.getBoundingClientRect());
        },
        unbind(el) {

        }
    });
};

export default OutOfScreen;
