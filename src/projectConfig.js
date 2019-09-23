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
        // baseURL:'http://localhost:8001',
        baseURL:'http://47.101.71.38:8001',
        timeout:6000,
    }
}