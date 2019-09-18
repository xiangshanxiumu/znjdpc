/**出仓相关API */
import http from '@/global/http';
// 出仓单录入
export const addOutputWarehouseReceipt = (data) =>http.post('/api/Contract/InsertOrUpdateContract',data);
// 销售合同录入
export const postSalesContract = (data) =>http.post('/api/Contract/AddContract',data);