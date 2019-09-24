/** 入仓相关API*/
import http from '@/global/http';

// 入仓单汇总表 获取 入仓单列表数据
export const getWarehouseReceiptList = (type) => http.get('/api/Contract/GetContractList', {params: {type}});
// 入仓单汇总表 搜索
export const searchWarehouseReceiptList = (date, contractID) => http.get('/api/Contract/SearchContract', {params: {date,contractID}});

// 入仓单录入 2019-09-24
export const addWarehousingReceipt = (data) => http.post('/api/InStore/AddNewInStore', data);
// 获取所有入仓单 2019-09-24
export const getAllWarehousingReceipt = () =>http.get('/api/InStore/GetInStoreList');

