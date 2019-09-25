/**合同相关接口API */
import http from '@/global/http';

// 合同获取 type参数为合同类型参数 如：采购/销售 等
export const getAllContractList= () =>http.get('/api/Contract/GetContractList',{params:{loadingText:"合同加载中..."}});
// 合同获搜索 参数:日期date, 合同编号contractID 
export const searchContractList = (date, contractID) =>http.get('/api/Contract/SearchContract',{params:{date, contractID}});
// 合同录入 2019-09-24
export const addContract = (data) =>http.post('/api/Contract/AddNewContract',data);