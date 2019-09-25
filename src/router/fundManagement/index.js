/**资金管理 */
// 合同汇总
const ContractSummary = ()=>import('@/views/fundManagement/ContractSummary');
// 合同录入
const ContractEntry = ()=>import('@/views/fundManagement/ContractEntry');

const PaymentApplicationFormEntry = ()=>import('@/views/fundManagement/PaymentApplicationFormEntry');

const ReceivingApplicationFormEntry = ()=>import('@/views/fundManagement/ReceivingApplicationFormEntry');

const SummaryOfReceiptsAndPayments = ()=>import('@/views/fundManagement/SummaryOfReceiptsAndPayments');
export default [
    {
        path:'ContractSummary',
        name:'ContractSummary',
        component:ContractSummary,
        meta:{
            auth:true,
        }
    },
    {
        path:'ContractEntry',
        name:'ContractEntry',
        component:ContractEntry,
        meta:{
            auth:true,
        }
    },
    {
        path:'PaymentApplicationFormEntry',
        name:'PaymentApplicationFormEntry',
        component:PaymentApplicationFormEntry,
        meta:{
            auth:true,
        }
    },
    {
        path:'ReceivingApplicationFormEntry',
        name:'ReceivingApplicationFormEntry',
        component:ReceivingApplicationFormEntry,
        meta:{
            auth:true,
        }
    },
    {
        path:'SummaryOfReceiptsAndPayments',
        name:'SummaryOfReceiptsAndPayments',
        component:SummaryOfReceiptsAndPayments,
        meta:{
            auth:true,
        }
    }
]