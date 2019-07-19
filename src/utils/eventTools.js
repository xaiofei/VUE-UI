/**
 * @file eventTools.js
 * @author zhouqihang(v_zhouqihang@baidu.com)
 */
import {throwIfMissing} from './typeTools';

const defaultCallback = () => {
    console.warn('You may missing argument for bindEventListener!');
};

/**
 * 绑定事件监听
 * @param {Element} node 要添加事件的DOM
 * @param {string} eventType 事件类型
 * @param {Function} cb 事件回调
 * @param {boolean} useCapture 是否捕获
 */
export function bindEventListener(
    node = throwIfMissing('bindEventListener'),
    eventType = throwIfMissing('bindEventListener'),
    cb = defaultCallback,
    useCapture = false
) {
    if (document.addEventListener) {
        node.addEventListener(eventType, cb, useCapture);
    }
    else if (document.attachEvent) {
        node.attachEvent('on' + eventType, cb);
    }
    else {
        node['on' + eventType] = cb;
    }
}

/**
 * 移除事件监听
 * @param {Element} node 要移除事件的DOM
 * @param {string} eventType 要移除的事件类型
 * @param {Function} cb 要移除的事件类型
 */
export function unBindEventListener(
    node = throwIfMissing('unBindEventListener'),
    eventType = throwIfMissing('unBindEventListener'),
    cb = defaultCallback
) {
    if (document.removeEventListener) {
        node.removeEventListener(eventType, cb);
    }
    else if (document.attachEvent) {
        node.detachEvent('on' + eventType, cb);
    }
    else {
        node['on' + eventType] = null;
    }
}

/**
 * 绑定鼠标滚轮事件
 * @param {Element} node 要绑定的对象
 * @param {Function} cb 事件回调
 */
export function addMouseWheelEvent(
    node = throwIfMissing('addMouseWheelEvent'),
    cb = defaultCallback
) {
    bindEventListener(node, 'mousewheel', cb);
    bindEventListener(node, 'DOMMouseScroll', cb);
}

/**
 * 取消鼠标滚轮事件
 * @param {Element} node 要取消绑定的对象
 * @param {Function} cb 事件回调
 */
export function removeMouseWheelEvent(
    node = throwIfMissing('removeMouseWheelEvent'),
    cb = defaultCallback
) {
    unBindEventListener(node, 'mousewheel', cb);
    unBindEventListener(node, 'DOMMouseScroll', cb);
}
