/**入仓管理 */
// 入仓汇总
const WarehousingSummary = ()=>import('@/views/warehousingManagement/WarehousingSummary');
// 入仓录入
const WarehousingReceiptEntry = ()=>import('@/views/warehousingManagement/WarehousingReceiptEntry');
// 采购合同 录入
const ProcurementContractEntry = () =>import('@/views/warehousingManagement/procurementContractManagement/ProcurementContractEntry');
// 采购合同 汇总
const ProcurementContractSummary = () =>import('@/views/warehousingManagement/procurementContractManagement/ProcurementContractSummary');
// 物流合同 录入
const LogisticsContractEntry = () =>import('@/views/warehousingManagement/warehousingContractManagement/LogisticsContractEntry');
// 物流合同 汇总
const LogisticsContractsSummary = () =>import('@/views/warehousingManagement/warehousingContractManagement/LogisticsContractsSummary');
// 仓储合同 录入
const WarehousingContractEntry = () =>import('@/views/warehousingManagement/warehousingContractManagement/WarehousingContractEntry');
// 仓储合同 汇总
const WarehousingContractSummary = () =>import('@/views/warehousingManagement/warehousingContractManagement/WarehousingContractSummary');
export default [
    {
        path:'WarehousingSummary',
        name:'WarehousingSummary',
        component:WarehousingSummary,
        meta:{
            auth:true,
        }
    },
    {
        path:'WarehousingReceiptEntry',
        name:'WarehousingReceiptEntry',
        component:WarehousingReceiptEntry,
        meta:{
            auth:true,
        }
    },
    // 采购合同管理
    {
        path:'ProcurementContractEntry',
        name:'ProcurementContractEntry',
        component:ProcurementContractEntry,
        meta:{
            auth:true,
        }
    },
    {
        path:'ProcurementContractSummary',
        name:'ProcurementContractSummary',
        component:ProcurementContractSummary,
        meta:{
            auth:true,
        }
    },
    // 仓储合同管理
    {
        path:'LogisticsContractEntry',
        name:'LogisticsContractEntry',
        component:LogisticsContractEntry,
        meta:{
            auth:true,
        }
    },
    {
        path:'LogisticsContractsSummary',
        name:'LogisticsContractsSummary',
        component:LogisticsContractsSummary,
        meta:{
            auth:true,
        }
    },
    {
        path:'WarehousingContractEntry',
        name:'WarehousingContractEntry',
        component:WarehousingContractEntry,
        meta:{
            auth:true,
        }
    },
    {
        path:'WarehousingContractSummary',
        name:'WarehousingContractSummary',
        component:WarehousingContractSummary,
        meta:{
            auth:true,
        }
    }
]
