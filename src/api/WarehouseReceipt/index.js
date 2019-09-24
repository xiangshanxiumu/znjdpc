/** 入仓相关API*/
import http from '@/global/http';
 // 添加仓单 2019-09-24
export const addWarehouseReceipt = (data) => http.post('/api/InStore/AddNewStore', data);
// 获取所有入仓单数据 2019-09-24
export const getAllWarehousingReceipt = () =>http.get('/api/InStore/GetInStoreList');
// 获取所有出仓单数据 2019-09-24
export const getAllWarehouseReceipt = () =>http.get('/api/InStore/GetOutStoreList');