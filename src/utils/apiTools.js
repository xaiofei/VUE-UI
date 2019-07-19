/**
 * @file 数据交互工具
 * @author lvxin
 */

import axios from 'axios';

export const getData = (url, config) => axios.get(url, config);
export const postData = (url, data, config) => axios.post(url, data, config);
export const jsonp = (url, cbFun, cbName = 'callback') => {
    return new Promise((resolve, reject) => {
        let scriptNode = document.createElement('script');
        let retData;

        window[cbFun] = data => {
            retData = data;
        };

        scriptNode.onload = () => {
            resolve(retData);
            window[cbFun] = undefined;
            document.body.removeChild(scriptNode);
        };

        scriptNode.onerror = () => {
            reject();
            window[cbFun] = undefined;
        };

        scriptNode.src = `${url}&${cbName}=${cbFun}`;
        document.body.appendChild(scriptNode);
    });
};
