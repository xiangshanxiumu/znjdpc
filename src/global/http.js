import axios from 'axios';
import qs from 'qs';
import projectConfig from '@/projectConfig';

let mode = projectConfig.mode
axios.defaults.timeout = projectConfig.timeout;
axios.defaults.baseURL = projectConfig[projectConfig.mode].baseURL;

axios.interceptors.request.use((config) => {
    // 设置数据格式
    config.headers['Content-Type'] = 'application/json';
    // post格式数据转换
    // if(config.method == "post"){
    //   config.data = qs.stringify(config.data);
    // }
    return config;
},
(err)=>{
    return Promise.reject(err);
}
);
axios.interceptors.response.use((response) => {
    console.log(response.status)
    return response.data;
  },
  (err) => {
    console.log(err) // Error: Network Error
    let originalRequest = error.config;
    if(error.code == 'ECONNABORTED' && error.message.indexOf('timeout')!=-1 && !originalRequest._retry){
            originalRequest._retry = true
            return axios.request(originalRequest);
    }
    return Promise.reject(err);
  }
);

export default axios;
