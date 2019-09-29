/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-14 09:30:21
 * @LastEditTime: 2019-09-28 10:25:44
 * @LastEditors: Please set LastEditors
 */
import axios from 'axios';
import qs from 'qs';
// 导入项目配置
import projectConfig from '@/projectConfig';
// 导入loading函数
import {startLoading,endLoading,showMessage,showMessageBox} from './loading';

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
(error)=>{
  console.log(error.response)
    return Promise.reject(error);
}
);
axios.interceptors.response.use((response) => {
    // 关闭loading
    endLoading();
    return response.data;
  },
  (error) => {
    // 关闭loading
    endLoading();
     // Error: Network Error
    if(error.message.match('timeout') !=null){
      // 请求超时
      showMessage("网络超时","error");
      // showMessageBox("网络错误","请求超时","warning");
    }
    return Promise.reject(error);
  }
);

export default axios;
