/**营销管理 */
export default [
    {   // 营销计划
        path:'MarketingPlan',
        name:'MarketingPlan',
        component:()=>import("@/views/marketManagement/MarketingPlan"),
        meta:{
            auth:true,
        }
    }
]