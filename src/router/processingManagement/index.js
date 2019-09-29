/**
 * 加工管理 模块
 */
const OutsourcingProcessingEntry = ()=>import('@/views/processingManagement/OutsourcingProcessingEntry');
const OutsourcingProcessingSummary = ()=>import('@/views/processingManagement/OutsourcingProcessingSummary');
// 钢条小卷 打包
const SteelCoilPacking = ()=>import('@/views/processingManagement/SteelCoilPacking');

const OutsourcingProcessingContractEntry = ()=>import('@/views/processingManagement/outsourcingProcessingContractManagement/OutsourcingProcessingContractEntry');
const OutsourcingProcessingContractSummary = ()=>import('@/views/processingManagement/outsourcingProcessingContractManagement/OutsourcingProcessingContractSummary');

export default [
    {   
        // 委外加工单录入
        path:'OutsourcingProcessingEntry',
        name:'OutsourcingProcessingEntry',
        component:OutsourcingProcessingEntry,
        meta:{
            auth:true,
        }
    },
    {   // 委外加工单汇总
        path:'OutsourcingProcessingSummary',
        name:'OutsourcingProcessingSummary',
        component:OutsourcingProcessingSummary,
        meta:{
            auth:true,
        }
    },
    {   // 钢卷打包
        path:'SteelCoilPacking',
        name:'SteelCoilPacking',
        component:SteelCoilPacking,
        meta:{
            auth:true,
        }
    },
    {   // 钢卷打包后的汇总表
        path:'SteelCoilPackingSummary',
        name:'SteelCoilPackingSummary',
        component:()=>import('@/views/processingManagement/SteelCoilPackingSummary'),
        meta:{
            auth:true,
        }
    },
    {   // 委外加工合同录入
        path:'OutsourcingProcessingContractEntry',
        name:'OutsourcingProcessingContractEntry',
        component:OutsourcingProcessingContractEntry,
        meta:{
            auth:true,
        }
    },
    {   // 委外加工合同汇总
        path:'OutsourcingProcessingContractSummary',
        name:'OutsourcingProcessingContractSummary',
        component:OutsourcingProcessingContractSummary,
        meta:{
            auth:true,
        }
    },
    {   // 加工客户往来明细账
        path:'ProcessingCustomerExchangeAccount',
        name:'ProcessingCustomerExchangeAccount',
        component:()=>import('@/views/processingManagement/ProcessingCustomerExchangeAccount'),
        meta:{
            auth:true
        }
    },
    {   // 加工客户往来汇总表
        path:'ProcessingCustomerExchangeSummary',
        name:'ProcessingCustomerExchangeSummary',
        component:()=>import('@/views/processingManagement/ProcessingCustomerExchangeSummary'),
        meta:{
            auth:true
        }
    }
]