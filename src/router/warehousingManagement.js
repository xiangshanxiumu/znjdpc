/**入仓管理 */
// 入仓汇总
const WarehousingSummary = ()=>import('@/views/warehousingManagement/WarehousingSummary');
// 入仓录入
const WarehouseReceiptEntry = ()=>import('@/views/warehousingManagement/WarehouseReceiptEntry');
// 入仓加工
const WarehousingProcessing = ()=>import('@/views/warehousingManagement/WarehousingProcessing');

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
    }
]
