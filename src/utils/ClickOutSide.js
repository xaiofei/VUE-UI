/**
 * @file ClickOutSide
 * @author zhouqihang(v_zhouqihang@baidu.com)
 * @desc 自定义指令，用于检测点击了除自身外的其他DOM操作
 */

let ClickOutSide = {};

function randomStr() {
    const index = Math.floor(Math.random() * 26);
    const arr = [
        'a', 'b', 'c', 'd', 'e', 'f', 'g',
        'h', 'i', 'j', 'k', 'l', 'm', 'n',
        'o', 'p', 'q', 'r', 's', 't', 'u',
        'v', 'w', 'x', 'y', 'z'
    ];
    return arr[index] + Date.now();
}

ClickOutSide.install = function (Vue, options) {
    const clickOutSide = (parentEl, event, callback, modifiers) => {
        if (modifiers.stop) {
            event.stopPropagation();
        }
        if (typeof callback !== 'function') {
            throw new TypeError('Argument for directive ClickOutSide must be a function!');
        }
        const res = parentEl.compareDocumentPosition(event.target);
        if (res !== 20) {
            callback();
        }
    };

    let tempFunc = {};

    Vue.directive('clickOutSide', {
        inserted(el, binding) {
            const str = randomStr();
            tempFunc[str] = e => clickOutSide(el, e, binding.value, binding.modifiers);
            if (el.dataset) {
                el.dataset.clickOutSide = str;
            }
            else {
                el.setAttribute('clickOutSide', str);
            }
            document.addEventListener('click', tempFunc[str]);
        },
        unbind(el) {
            let clickOutSide = '';
            if (el.dataset) {
                clickOutSide = el.dataset.clickOutSide;
            }
            else {
                clickOutSide = el.getAttribute('clickOutSide');
            }
            document.removeEventListener('click', tempFunc[clickOutSide]);
            delete tempFunc[clickOutSide];
        }
    });
};

export default ClickOutSide;
