// 入仓 store
export default {
    state:{
        // 入仓单列表 合同=》入仓=》钢卷三层结构数据
        warehouseReceiptList:[]
    },
    getters:{
        warehouseReceiptList:(state)=>state.warehouseReceiptList,
    },
    mutations:{
        updateWarehouseReceiptList(state,payload){
            state.warehouseReceiptList = payload.warehouseReceiptList;
        },
    },
    actions:{
        changeWarehouseReceiptList(context,payload){
            context.commit('updateWarehouseReceiptList',payload);
        }
    }
}