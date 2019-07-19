/**
 * @file typeTools.js
 * @author zhouqihang(v_zhouqihang@baidu.com)
 */

/**
 * 缺少参数抛出异常
 * @param {string} funcName function name
 */
export function throwIfMissing(funcName) {
    throw new Error('Missing arguments for ' + funcName);
}

/**
 * 检测值是否是一个正则表达式对象
 * @param {Object|string} v 检测对象
 * @return {boolean}
 */
export function isRegExp(v = throwIfMissing('isRegExp')) {
    return Object.prototype.toString.call(v) === '[object RegExp]';
}

/**
 * 检测值是否是一个布尔值
 * @param {boolean} v 检测对象
 * @return {boolean}
 */
export function isBoolean(v = throwIfMissing('isBoolean')) {
    return typeof v === 'boolean';
}

/**
 * 检测值是否是一个函数
 * @param {Function} v 检测对象
 * @return {boolean}
 */
export function isFunction(v = throwIfMissing('isFunction')) {
    return typeof v === 'function';
}

/**
 * 检测值是否是一个undefined
 * @param {*} v 检测对象
 * @return {boolean}
 */
export function isUndefined(v = throwIfMissing('isUndefined')) {
    return typeof v === 'undefined';
}
