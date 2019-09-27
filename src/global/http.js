import axios from 'axios';
import qs from 'qs';
// 导入项目配置
import projectConfig from '@/projectConfig';
// 导入loading函数
import {startLoading,endLoading} from './loading';

let mode = projectConfig.mode
axios.defaults.timeout = projectConfig.timeout;
axios.defaults.baseURL = projectConfig[projectConfig.mode].baseURL;

axios.interceptors.request.use((config) => {
    // 设置数据格式
    config.headers['Content-Type'] = 'application/json';
    // post格式数据转换
    let loadingText;
    if(config.method == "post"){
      // config.data = qs.stringify(config.data); 数据转 k=v&k=v
      loadingText = "处理中..."
      startLoading(loadingText);
    } else if(config.method == "get"){
      if(config.params && config.params.loadingText){
        loadingText = config.params.loadingText;
        startLoading(loadingText);
      }
    }
    return config;
},
(err)=>{
    return Promise.reject(err);
}
);
axios.interceptors.response.use((response) => {
    console.log(response.status);
    // 关闭loading
    endLoading();
    return response.data;
  },
  (err) => {
    console.log(err) // Error: Network Error
    // let originalRequest = error.config;
    // if(error.code == 'ECONNABORTED' && error.message.indexOf('timeout')!=-1 && !originalRequest._retry){
    //         originalRequest._retry = true
    //         return axios.request(originalRequest);
    // }
    return Promise.reject(err);
  }
);

export default axios;
