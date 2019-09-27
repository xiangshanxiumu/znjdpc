/** 入仓相关API*/
import http from '@/global/http';
const loadingText = "加载中...";
 // 添加仓单 2019-09-24
export const addWarehouseReceipt = (data) => http.post('/api/Store/InsertOrUpdateStore',data);
// 获取所有入仓单数据 2019-09-24
export const getAllWarehousingReceipt = () =>http.get('/api/Store/GetInStoreList',{params:{loadingText:loadingText}});
// 获取所有出仓单数据 2019-09-24
export const getAllWarehouseReceipt = () =>http.get('/api/Store/GetOutStoreList',{params:{loadingText:loadingText}});
// 获取所有加工单数据 2019-09-26
export const getAllProStoreList = ()=>http.get('/api/Store/GetProStoreList',{params:{loadingText:loadingText}})