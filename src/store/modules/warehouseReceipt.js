/**仓单数据 */
// 从数据列表中获取某属性数据组函数
const getAttributeList = (state,arr,attribute) =>{
      if(arr.length==0){
        return [];
      }
      // 筛选
      let Arr = [];
      state[`${arr}`].map(item => {
        if (item[`${attribute}`]) {
          Arr.push({
            value: item[`${attribute}`]
          })
        }
      });
      //去重 map some结合去重
      let NewArr= [];
      Arr.map(item=>{
          let isExit = NewArr.some(item2 => {
            return item2.value == item.value;
          });
          if(!isExit){
            NewArr.push(item)
          }
      })
      return NewArr;
}
export default {
  state: {
    // 所有的入仓单数据列表
    AllWarehousingReceipt: [],
    // 所有出仓单数据列表
    AllWarehouseReceipt: [],
    // 所有加工单数据列表
    AllProcessingReceipt:[],
  },
  getters: {
    // 合同编号CID数据列表
    inStoreCIDList: (state) => {
      return getAttributeList(state,"AllWarehousingReceipt","CID");
    //   let hash = {};
    //   CIDArr = CIDArr.reduce(function (item, next) {
    //     hash[next.name] ? '' : hash[next.name] = true && item.push(next);
    //     return item
    //   }, []);
    //   console.log(CIDArr)
    },
    // 采购单位Buyby数据列表
    inStoreBuybyList: (state) => {
      return getAttributeList(state,"AllWarehousingReceipt","Buyby");
    },
    // SID
    inStoreSIDList:(state)=>{
      return getAttributeList(state,"AllWarehousingReceipt","SID");
    },
    // SteelRollID
    inStoreSteelRollIDList:(state)=>{
      return getAttributeList(state,"AllWarehousingReceipt","SteelRollID");
    },
    // RecDepo
    inStoreRecDepoList:(state)=>{
      return getAttributeList(state,"AllWarehousingReceipt","RecDepo");
    },
  },
  mutations: {
    // 入仓单数据 提交
    updateAllWarehousingReceipt(state, payload) {
      state.AllWarehousingReceipt = payload.AllWarehousingReceipt
    },
    // 出仓单数据 提交
    updateAllWarehouseReceipt(state, payload) {
      state.AllWarehouseReceipt = payload.AllWarehouseReceipt;
    },
    // 加工单数据 提交
    updateAllProcessingReceipt(state, payload) {
      state.AllProcessingReceipt = payload.AllProcessingReceipt;
    },
  }
}
