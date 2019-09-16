import http from '@/global/http';

// 获取 去仓单列表数据
export const getWarehouseReceiptList = (pageIndex,pageSize) =>http.get('/api/Contract/GetContractList',{params:{pageIndex,pageSize}});
// 出库操作
export const outOfStock = (pageIndex) =>http.put('path',{params:{pageIndex}});