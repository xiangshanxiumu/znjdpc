/**入仓管理 */
// 入仓汇总
const WarehousingSummary = ()=>import('@/views/warehousingManagement/WarehousingSummary');
// 入仓录入
const WarehouseReceiptEntry = ()=>import('@/views/warehousingManagement/WarehouseReceiptEntry');
// 入仓加工
const WarehousingProcessing = ()=>import('@/views/warehousingManagement/WarehousingProcessing');
// 采购合同
const ProcurementContractEntry = () =>import('@/views/warehousingManagement/procurementContractManagement/ProcurementContractEntry');
const ProcurementContractSummary = () =>import('@/views/warehousingManagement/procurementContractManagement/ProcurementContractSummary');
// 仓储合同
const LogisticsContractEntry = () =>import('@/views/warehousingManagement/warehousingContractManagement/LogisticsContractEntry');
const LogisticsContractsSummary = () =>import('@/views/warehousingManagement/warehousingContractManagement/LogisticsContractsSummary');
const WarehousingContractEntry = () =>import('@/views/warehousingManagement/warehousingContractManagement/WarehousingContractEntry');
const WarehousingContractSummary = () =>import('@/views/warehousingManagement/warehousingContractManagement/WarehousingContractSummary');
export default [
    {
        path:'WarehousingSummary',
        name:'WarehousingSummary',
        component:WarehousingSummary
    },
    {
        path:'WarehouseReceiptEntry',
        name:'WarehouseReceiptEntry',
        component:WarehouseReceiptEntry
    },
    {
        path:'WarehousingProcessing',
        name:'WarehousingProcessing',
        component:WarehousingProcessing
    },
    // 采购合同管理
    {
        path:'ProcurementContractEntry',
        name:'ProcurementContractEntry',
        component:ProcurementContractEntry
    },
    {
        path:'ProcurementContractSummary',
        name:'ProcurementContractSummary',
        component:ProcurementContractSummary
    },
    // 仓储合同管理
    {
        path:'LogisticsContractEntry',
        name:'LogisticsContractEntry',
        component:LogisticsContractEntry
    },
    {
        path:'LogisticsContractsSummary',
        name:'LogisticsContractsSummary',
        component:LogisticsContractsSummary
    },
    {
        path:'WarehousingContractEntry',
        name:'WarehousingContractEntry',
        component:WarehousingContractEntry
    },
    {
        path:'WarehousingContractSummary',
        name:'WarehousingContractSummary',
        component:WarehousingContractSummary
    }
]
