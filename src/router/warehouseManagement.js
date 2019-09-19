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
        component:WarehouseEntry
    },
    {
        path:'WarehouseSummary',
        name:'WarehouseSummary',
        component:WarehouseSummary
    },
    {
        path:'SalesContractEntry',
        name:'SalesContractEntry',
        component:SalesContractEntry
    },
    {
        path:'SalesContractSummary',
        name:'SalesContractSummary',
        component:SalesContractSummary
    },
]