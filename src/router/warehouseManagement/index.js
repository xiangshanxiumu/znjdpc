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
    {   // 销售客户往来明细账
        path:'SalesCustomerExchangeAccount',
        name:'SalesCustomerExchangeAccount',
        component:()=>import('@/views/warehouseManagement/SalesCustomerExchangeAccount'),
        meta:{
            auth:true,
        }
    },
    {   // 销售客户往来明细账
        path:'SalesCustomerExchangeSummary',
        name:'SalesCustomerExchangeSummary',
        component:()=>import('@/views/warehouseManagement/SalesCustomerExchangeSummary'),
        meta:{
            auth:true,
        }
    },
    // 销售合同
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
    {   // PricePolicyTable
        path:'PricePolicyTable',
        name:'PricePolicyTable',
        component:()=>import("@/views/warehouseManagement/PricePolicyTable"),
        meta:{
            auth:true,
        }
    },
    {   // PricePolicyTable
        path:'CustomerFilesDetails',
        name:'CustomerFilesDetails',
        component:()=>import("@/views/warehouseManagement/CustomerFilesDetails"),
        meta:{
            auth:true,
        }
    },
    {   // PricePolicyTable
        path:'CustomerFilesSummary',
        name:'CustomerFilesSummary',
        component:()=>import("@/views/warehouseManagement/CustomerFilesSummary"),
        meta:{
            auth:true,
        }
    },
]