// 入仓 store
export default {
    state:{
        // 入仓单列表 合同=》入仓=》钢卷三层结构数据
        warehouseReceiptList:[],
        // 编辑的钢卷数据
        editSteelCoil:{}
    },
    getters:{
        warehouseReceiptList:(state)=>state.warehouseReceiptList,
        editSteelCoil:(state)=>state.editSteelCoil,
    },
    mutations:{
        updateWarehouseReceiptList(state,payload){
            state.warehouseReceiptList = payload.warehouseReceiptList;
        },
        updateEditSteelCoil(state,payload){
            state.editSteelCoil = payload.editSteelCoil;
        }
    },
    actions:{
        changeWarehouseReceiptList(context,payload){
            context.commit('updateWarehouseReceiptList',payload);
        }
    }
}