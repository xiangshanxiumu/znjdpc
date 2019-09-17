// 出仓store
export default {
  state: {
    // 出仓操作钢卷列表
    outWarehouseList: [],
  },
  getters: {
    outWarehouseList: (state) => state.outWarehouseList,
  },
  mutations: {
    updateOutWarehouseList(state, payload) {
      state.outWarehouseList = payload.outWarehouseList;
    }
  },
  actions: {
      changeOutWarehouseList(context,payload){
          context.commit('updateOutWarehouseList',payload)
      }
  }
}
