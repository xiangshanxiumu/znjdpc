/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-14 09:30:21
 * @LastEditTime: 2019-09-14 09:30:21
 * @LastEditors: your name
 */
export default {
    mode:process.env.NODE_ENV,
    timeout:6000, 
    development:{ // 测试环境
        baseURL:'http://192.168.0.124:10001',
        // baseURL:'http://192.168.0.124:8001',
        // baseURL:'http://47.101.71.38:8001',
        timeout:6000,
    },
    production:{ // 生产环境
        baseURL:'http://47.101.71.38:8001',
        // baseURL:'http://192.168.0.124:10001',
        timeout:6000,
    }
}