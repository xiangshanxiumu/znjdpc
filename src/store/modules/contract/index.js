/**合同相关数据仓库 */
// 从数据列表中获取某属性数据组函数
const getAttributeList = (state,arr,attribute) =>{
    if(state[`${arr}`].length==0){
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
    state:{
        // 委外加工钢卷列表数据 已有分条方案
        AllPurchaseContract:[],
    },
    getters:{
        AllPurchaseContract:(state)=>state.AllPurchaseContract,
        PurchaseCIDList:(state)=>{
            return getAttributeList(state,"AllPurchaseContract","CID");
        },
        PurchaseSupplyList:(state)=>{
            return getAttributeList(state,"AllPurchaseContract","Supply");
        },
    },
    mutations:{
        updateAllPurchaseContract(state,payload){
            state.AllPurchaseContract = payload.AllPurchaseContract;
        },
        
    }
}