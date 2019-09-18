import axios from 'axios';

import projectConfig from '@/projectConfig';

let mode = projectConfig.mode
axios.defaults.timeout = projectConfig.timeout;
axios.defaults.baseURL = projectConfig[projectConfig.mode].baseURL;

axios.interceptors.request.use((config) => {
    config.headers['Content-Type'] = 'application/json';
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
    return Promise.reject(err);
  }
);

export default axios;
