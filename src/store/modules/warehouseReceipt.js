/**仓单数据 */
export default {
  state: {
    // 所有的入仓单数据列表
    AllWarehousingReceipt: [],
  },
  getters: {
    // 合同编号数据列表
    CIDArr: (state) => {
      let CIDArr = [];
      state.AllWarehousingReceipt.map(item => {
        if (item.CID) {
          CIDArr.push({
            value: item.CID
          })
        }
      });
      //去重 map some结合去重
      let NewCIDArr= [];
      CIDArr.map(item=>{
          let isExit = NewCIDArr.some(item2 => {
            return item2.value == item.value;
          });
          if(!isExit){
            NewCIDArr.push(item)
          }
      })
    //   let hash = {};
    //   CIDArr = CIDArr.reduce(function (item, next) {
    //     hash[next.name] ? '' : hash[next.name] = true && item.push(next);
    //     return item
    //   }, []);
    //   console.log(CIDArr)
      return NewCIDArr;
    },
    // 采购单位数据列表
    BuybyArr: (state) => {
      let BuybyArr = [];
      state.AllWarehousingReceipt.map(item => {
        if (item.Buyby) {
          BuybyArr.push({
            value: item.Buyby
          })
        }
      });
      //去重 map some结合去重
      let NewBuybyArr= [];
      BuybyArr.map(item=>{
          let isExit = NewBuybyArr.some(item2 => {
            return item2.value == item.value;
          });
          if(!isExit){
            NewBuybyArr.push(item)
          }
      })
      return NewBuybyArr;
    },
  },
  mutations: {
    updateAllWarehousingReceipt(state, payload) {
      state.AllWarehousingReceipt = payload.AllWarehousingReceipt
    }
  }
}
