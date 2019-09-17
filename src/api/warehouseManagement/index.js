/**出仓相关API */
import http from '@/global/http';
// 出仓单录入
export const postOutputWarehouseReceipt = (data) =>http.post('/api/InStore/AddInStore',data);
// 销售合同录入
export const postSalesContract = (data) =>http.post('/api/Contract/AddContract',data);