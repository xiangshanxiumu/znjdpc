/** 入仓相关API*/
import http from '@/global/http';

// 入仓单汇总表 获取 入仓单列表数据
export const getWarehouseReceiptList = (type) => http.get('/api/Contract/GetContractList', {
  params: {
    type
  }
});
// 入仓单汇总表 搜索
export const searchWarehouseReceiptList = (date, contractID) => http.get('/api/Contract/SearchContract', {
  params: {
    date,
    contractID
  }
});

// 入仓单录入
export const addWarehouseReceipt = (data) => http.post('/api/Contract/InsertOrUpdateContract', data);
// 合同录入
export const addContract = (data) => http.post('/api/Contract/InsertOrUpdateContract', data);
