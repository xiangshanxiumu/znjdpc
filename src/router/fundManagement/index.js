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
    },
    {
        // 进项发票通知单
        path:'IncomeInvoiceNotice',
        name:'IncomeInvoiceNotice',
        component:()=>import('@/views/fundManagement/InvoiceManagement/IncomeInvoiceNotice'),
        meta:{
            auth:true,
        }
    },
    {
        // 销项发票通知单
        path:'SalesInvoiceNotice',
        name:'SalesInvoiceNotice',
        component:()=>import('@/views/fundManagement/InvoiceManagement/SalesInvoiceNotice'),
        meta:{
            auth:true,
        }
    },
    {
        // 发票通知单详情
        path:'InvoiceNoticedetails',
        name:'InvoiceNoticedetails',
        component:()=>import('@/views/fundManagement/InvoiceManagement/InvoiceNoticedetails'),
        meta:{
            auth:true,
        }
    }
]