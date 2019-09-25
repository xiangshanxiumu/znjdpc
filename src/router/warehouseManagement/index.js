/**
 * 出仓管理 模块
 */
const WarehouseEntry = ()=>import('@/views/warehouseManagement/WarehouseEntry');
const WarehouseSummary= ()=>import('@/views/warehouseManagement/WarehouseSummary');

const SalesContractEntry= ()=>import('@/views/warehouseManagement/salesContractManagement/SalesContractEntry');
const SalesContractSummary= ()=>import('@/views/warehouseManagement/salesContractManagement/SalesContractSummary');
export default [
    {
        path:'WarehouseEntry',
        name:'WarehouseEntry',
        component:WarehouseEntry,
        meta:{
            auth:true,
        }
    },
    {
        path:'WarehouseSummary',
        name:'WarehouseSummary',
        component:WarehouseSummary,
        meta:{
            auth:true,
        }
    },
    {
        path:'SalesContractEntry',
        name:'SalesContractEntry',
        component:SalesContractEntry,
        meta:{
            auth:true,
        }
    },
    {
        path:'SalesContractSummary',
        name:'SalesContractSummary',
        component:SalesContractSummary,
        meta:{
            auth:true,
        }
    },
]