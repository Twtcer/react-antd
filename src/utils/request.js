import axios from 'axios';
import { serviceUrl } from './config';
import { getToken } from './auth';

const instance = axios.create({
    baseURL: serviceUrl,
    timeout: 5000
});

instance.interceptors.request.use((config) => {
    config.headers['authorization'] = 'Bearer ' + getToken();
    return config;
}, (error) => {
    return Promise.reject(error);
}
);

instance.interceptors.response.use((response)=>{
    return response.data;
},
(error)=>{
    return Promise.reject(error);
}
);

export function get(url, params) {
    return instance.get(url, { params });
}

export function post(url, data) {
    return instance.post(url, data);
}

/**
 * put
 * @param {*} url     请求地址
 * @param {*} data    数据
 */
export function put(url, data) {
    return instance.put(url, data);
}

export function del(url) {
    return instance.delete(url);
}