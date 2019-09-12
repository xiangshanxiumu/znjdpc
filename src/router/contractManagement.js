/**合同管理 */
// 合同汇总
const ContractSummary = ()=>import('@/views/contractManagement/ContractSummary');
// 合同录入
const ContractEntry = ()=>import('@/views/contractManagement/ContractEntry');
export default [
    {
        path:'ContractSummary',
        name:'ContractSummary',
        component:ContractSummary
    },
    {
        path:'ContractEntry',
        name:'ContractEntry',
        component:ContractEntry
    }
]