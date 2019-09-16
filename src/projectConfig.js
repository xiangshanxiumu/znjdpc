export default {
    mode:process.env.NODE_ENV,
    baseURL:'', //
    timeout:6000, 
    development:{
        baseURL:'http://192.168.0.124:10001',
        timeout:6000,
    },
    production:{
        baseURL:'',
        timeout:6000,
    }
}