import axios from 'axios';
import { serviceUrl } from './config';
import { getToken } from './auth';
import { message } from 'antd';

const httpCodeMsg = {
     200: '服务器成功返回请求的数据。' ,
     201: '新建或修改数据成功。' ,
     202: '一个请求已经进入后台排队（异步任务）。' ,
     204: '删除数据成功。' ,
     400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。' ,
     401: '用户没有权限（令牌、用户名、密码错误）。' ,
     403: '用户得到授权，但是访问是被禁止的。' ,
     404: '发出的请求针对的是不存在的记录，服务器没有进行操作。' ,
     406: '请求的格式不可得。' ,
     410: '请求的资源被永久删除，且不会再得到的。' ,
     422: '当创建一个对象时，发生一个验证错误。' ,
     500: '服务器发生错误，请检查服务器。' ,
     502: '网关错误。' ,
     503: '服务不可用，服务器暂时过载或维护。' ,
     504: '网关超时。' ,
};

let loading = null;
const instance = axios.create({
    baseURL: serviceUrl,
    timeout: 5000
});

instance.interceptors.request.use((config) => {
    //token
    config.headers['authorization'] = 'Bearer ' + getToken();
    config.headers['Origin'] = 'http://localhost:13571';
    //loading 
    loading = message.loading({content: 'Loading...',duration: 0});

    return config;
}, (error) => {
    return Promise.reject(error);
}
);

instance.interceptors.response.use((response) => {
    loading(); 
    return response.data;
},
    (error) => { 
        loading(); 
        if (error.response) {
            debugger
            let tips = error.response.status in httpCodeMsg ? httpCodeMsg[error.response.status] : error.response.data.message;
            message.error(tips);
            if (error.response.status === 401) {
                // this.props.history.push('/login'); 
                window.location.hash="#/login";
            }
            return Promise.reject(error);
        }
        else {
            message.error('请求超时, 请刷新重试');
            return Promise.reject('请求超时, 请刷新重试');
        }
    }
);

function get(url, params) {
    return instance.get(url, { params });
}

function post(url, data) {
    return instance.post(url, data);
}

/**
 * put
 * @param {*} url     请求地址
 * @param {*} data    数据
 */
function put(url, data) {
    return instance.put(url, data);
}

function del(url) {
    return instance.delete(url);
}

export {get,post,put,del};
export default (instance);