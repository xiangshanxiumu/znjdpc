export default {
    state:{
        // 委外加工钢卷列表数据
        steelCoilMachiningList:[],
    },
    getters:{
        steelCoilMachiningList:(state)=>state.steelCoilMachiningList,
    },
    mutations:{
        updateSteelCoilMachiningList(state,payload){
            state.steelCoilMachiningList = payload.steelCoilMachiningList;
        }
    }
}