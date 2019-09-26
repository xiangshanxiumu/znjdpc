// 入仓 store
export default {
    state:{
        // 入仓单列表 合同=》入仓=》钢卷三层结构数据
        warehouseReceiptList:[],
        // 查看编辑的钢卷数据组 以仓单为标准 下面有多个钢卷数据组
        editSteelCoil:[],
        // 查看编辑的合同数据组 以合同编号为单位 下面有多个附件列表
        viewEditorContract:[],
    },
    getters:{
        warehouseReceiptList:(state)=>state.warehouseReceiptList,
        editSteelCoil:(state)=>state.editSteelCoil,
        viewEditorContract:(state)=>state.viewEditorContract,
    },
    mutations:{
        updateWarehouseReceiptList(state,payload){
            state.warehouseReceiptList = payload.warehouseReceiptList;
        },
        updateEditSteelCoil(state,payload){
            state.editSteelCoil = payload.editSteelCoil;
        },
        updateViewEditorContract(state,payload){
            state.viewEditorContract = payload.viewEditorContract;
        }
    },
    actions:{
        changeWarehouseReceiptList(context,payload){
            context.commit('updateWarehouseReceiptList',payload);
        }
    }
}