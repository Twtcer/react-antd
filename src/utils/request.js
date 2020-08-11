import axios from 'axios';
import { baseUrl } from './config';
import { getToken } from './auth';

const instance = axios.create({
    baseURL: baseUrl,
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

export function del(url) {
    return instance.delete(url);
}