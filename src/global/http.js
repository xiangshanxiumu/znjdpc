import axios from 'axios';

import projectConfig from '@/projectConfig';

let mode = projectConfig.mode
axios.defaults.timeout = projectConfig.timeout;
axios.defaults.baseURL = projectConfig[projectConfig.mode].baseURL;

axios.interceptors.request.use((config) => {
    console.log("config",config)
    // config.baseURL = projectConfig[projectConfig.mode].baseURL;
    return config;
},
(err)=>{
    return Promise.reject(err);
}
);
axios.interceptors.response.use((response) => {
    return response.data;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default axios;
