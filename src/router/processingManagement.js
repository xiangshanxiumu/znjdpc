/**
 * 加工管理 模块
 */
const OutsourcingProcessingEntry = ()=>import('@/views/processingManagement/OutsourcingProcessingEntry');
const OutsourcingProcessingSummary = ()=>import('@/views/processingManagement/OutsourcingProcessingSummary');
const OutsourcingProcessingContractEntry = ()=>import('@/views/processingManagement/outsourcingProcessingContractManagement/OutsourcingProcessingContractEntry');
const OutsourcingProcessingContractSummary = ()=>import('@/views/processingManagement/outsourcingProcessingContractManagement/OutsourcingProcessingContractSummary');
export default [
    {
        path:'OutsourcingProcessingEntry',
        name:'OutsourcingProcessingEntry',
        component:OutsourcingProcessingEntry,
        meta:{
            auth:true,
        }
    },
    {
        path:'OutsourcingProcessingSummary',
        name:'OutsourcingProcessingSummary',
        component:OutsourcingProcessingSummary,
        meta:{
            auth:true,
        }
    },
    {
        path:'OutsourcingProcessingContractEntry',
        name:'OutsourcingProcessingContractEntry',
        component:OutsourcingProcessingContractEntry,
        meta:{
            auth:true,
        }
    },
    {
        path:'OutsourcingProcessingContractSummary',
        name:'OutsourcingProcessingContractSummary',
        component:OutsourcingProcessingContractSummary,
        meta:{
            auth:true,
        }
    },
]