/**
 * @file Date.js
 * @author zhouqihang(v_zhouqihang@baidu.com)
 */

/**
 * 格式化日期字符串
 *
 * @param {string} fmt 格式化字符串
 * @param {Date} date 时间对象
 * @return {*}
 */
export function pattern(fmt, date = new Date()) {
    const o = {
        // 月份
        'M+': date.getMonth() + 1,
        // 日
        'd+': date.getDate(),
        // 小时
        'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,
        // 小时
        'H+': date.getHours(),
        // 分
        'm+': date.getMinutes(),
        // 秒
        's+': date.getSeconds(),
        // 季度
        'q+': Math.floor((date.getMonth() + 3) / 3),
        // 毫秒
        'S': date.getMilliseconds()
    };
    const week = {
        '0': '/u65e5',
        '1': '/u4e00',
        '2': '/u4e8c',
        '3': '/u4e09',
        '4': '/u56db',
        '5': '/u4e94',
        '6': '/u516d'
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(
            RegExp.$1,
            ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '/u661f/u671f' : '/u5468') : '')
            + week[date.getDay() + '']
        );
    }
    for (let k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(
                RegExp.$1,
                (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))
            );
        }
    }
    return fmt;
}

/**
 * 根据一个时间获取年份
 *
 * @param {Date} date Date对象
 * @return {*}
 */
export function getYear(date = new Date()) {
    return pattern('yyyy', date);
}

/**
 * 根据一个时间获取月份
 *
 * @param {Date} date Date对象
 * @return {*}
 */
export function getMonth(date = new Date()) {
    return pattern('MM', date);
}

/**
 * 根据一个时间获取日期
 *
 * @param {Date} date Date对象
 * @return {*}
 */
export function getDay(date = new Date()) {
    return pattern('dd', date);
}

/**
 * 根据一个时间获取小时
 *
 * @param {Date} date Date对象
 * @return {*}
 */
export function getHour(date = new Date()) {
    return pattern('HH', date);
}

/**
 * 根据一个时间获取分钟
 *
 * @param {Date} date Date对象
 * @return {*}
 */
export function getMinute(date = new Date()) {
    return pattern('mm', date);
}

/**
 * 根据一个时间获取秒
 *
 * @param {Date} date Date对象
 * @return {*}
 */
export function getSecond(date = new Date()) {
    return pattern('ss', date);
}

/**
 * 获取某年某月的月份列表
 *
 * @param {number|string} year 年
 * @param {number|string} month 月
 * @return {Array}
 */
export function getDayListByMonth(year, month) {
    if (!month || !year) {
        return [];
    }
    let arr = [];
    const dayCount = {
        0: 31, // 第一个月的前一月是12月有31天
        1: 31,
        2: 28,
        3: 31,
        4: 30,
        5: 31,
        6: 30,
        7: 31,
        8: 31,
        9: 30,
        10: 31,
        11: 30,
        12: 31
    };
    const numberMonth = parseInt(month, 10);
    const numberYear = parseInt(year, 10);
    if (numberYear % 4 === 0 || numberYear % 100 === 0) {
        dayCount[2] = 29;
    }
    const date = new Date(numberYear, numberMonth - 1, 1);
    // 计算某年某月一号为周几
    // 0为周日
    const week = date.getDay();
    let tempArr = [];
    // 上月最后一周有几天
    const lastMonthDays = week === 0 ? 0 : week;
    // 设置上月最后一周
    for (let i = lastMonthDays - 1; i >= 0; i--) {
        tempArr.push({
            day: dayCount[numberMonth - 1] - i,
            last: true,
            current: false,
            next: false
        });
    }
    // 设置本月的周数
    for (let i = 1; i <= dayCount[numberMonth]; i++) {
        if (tempArr.length >= 7) {
            arr.push(tempArr);
            tempArr = [];
        }
        tempArr.push({
            day: i,
            last: false,
            current: true,
            next: false
        });
    }
    // 设置下月第一周
    const nextMonthDays = tempArr.length === 7 ? 0 : 7 - tempArr.length;
    for (let i = 1; i <= nextMonthDays; i++) {
        if (tempArr.length >= 7) {
            arr.push(tempArr);
            tempArr = [];
        }
        tempArr.push({
            day: i,
            last: false,
            current: false,
            next: true
        });
    }
    arr.push(tempArr);

    return arr;
}
