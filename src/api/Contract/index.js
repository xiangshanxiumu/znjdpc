/**合同相关接口API */
import http from '@/global/http';

const loadingText = "加载中...";
// 合同获取 type参数为合同类型参数 如：采购/销售 等
export const getAllContractList = () =>http.get('/api/Contract/GetContractList',{params:{loadingText:"合同加载中..."}});
// 合同获搜索 参数:日期date, 合同编号contractID 
export const searchContractList = (date, contractID) =>http.get('/api/Contract/SearchContract',{params:{date, contractID}});
// 合同精确搜索 传参contractID
export const searchOneContract = (contractID) =>http.get('/api/Contract/SearchOneContract',{params:{contractID}});
// 合同录入 更新 2019-09-24 
export const addContract = (data) =>http.post('/api/Contract/InsertOrUpdateContract',data);
// 获取所有合同ID 
export const getAllCID = ()=>http.get('/api/Contract/GetCIDList');
// 联想列表: 单位 品名 规格 牌号
export const getContextList = () =>http.get('/api/Contract/GetContextList');
// 获取所有入仓单数据 2019-09-24
export const getAllWarehousingReceipt = () =>http.get('/api/Store/GetInStoreList',{params:{loadingText:loadingText}});
// 获取初始全局数据
export const getAllGlobalInitData = () =>{
    return http.all([getAllCID(),getContextList(),getAllContractList(),getAllWarehousingReceipt()]);
}