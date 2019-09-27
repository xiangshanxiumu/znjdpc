/**综合管理模块路由 */
export default [
    {
        path:"FixedAssets",
        name:"FixedAssets",
        component:()=>import("@/views/comprehensiveManagement/FixedAssets"),
        meta:{
            auth:true
        }
    },
    {
        path:"Consumable",
        name:"Consumable",
        component:()=>import("@/views/comprehensiveManagement/Consumable"),
        meta:{
            auth:true
        }
    },
    {
        path:"OfficeSupplies",
        name:"OfficeSupplies",
        component:()=>import("@/views/comprehensiveManagement/OfficeSupplies"),
        meta:{
            auth:true
        }
    },
    {
        path:"FileManagement",
        name:"FileManagement",
        component:()=>import("@/views/comprehensiveManagement/FileManagement"),
        meta:{
            auth:true
        }
    },
    {
        path:"WagePerformance",
        name:"WagePerformance",
        component:()=>import("@/views/comprehensiveManagement/WagePerformance"),
        meta:{
            auth:true
        }
    },
]