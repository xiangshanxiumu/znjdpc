/** 入仓相关API*/
import http from '@/global/http';

// 获取 入仓单列表数据
export const getWarehouseReceiptList = (pageIndex,pageSize) =>http.get('/api/Contract/GetContractList',{params:{pageIndex,pageSize}});

