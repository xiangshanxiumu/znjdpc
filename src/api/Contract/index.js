/**合同相关接口API */
import http from '@/global/http';

// 合同获取 type参数为合同类型参数 如：采购/销售 等 (出入仓单汇总表获取)
export const getContractList= (type) =>http.get('/api/Contract/GetContractList',{params:{type}});
// 合同获搜索 参数:日期date, 合同编号contractID (出入仓单汇总表搜索)
export const searchContractList = (date, contractID) =>http.get('/api/Contract/SearchContract',{params:{date, contractID}});
// 合同录入 (出入仓单录入)
export const addContract = (data) =>http.post('/api/Contract/InsertOrUpdateContract',data);