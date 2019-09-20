// 全局公共数据
export default {
    state:{
        token:"",
        isLogin:false,
    },
    getters:{
        token:(state)=>state.token,
        isLogin:(state)=>state.isLogin
    },
    mutations:{
        updateToken(state,payload){
            state.token = payload.token;
        },
        isLogin(state,payload){
            state.isLogin = payload.isLogin;
        },
    }
}