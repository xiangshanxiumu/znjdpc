/**仓储物流模块 路由 */
export default [
    {   // 物流客户往来明细账
        path:"LogisticsCustomerExchangeAccount",
        name:"LogisticsCustomerExchangeAccount",
        component:()=>import("@/views/warehouseLogistics/LogisticsCustomerExchangeAccount"),
        meta:{
            auth:true
        }
    },
    {   // 物流客户往来汇总表
        path:"LogisticsCustomerExchangeSummary",
        name:"LogisticsCustomerExchangeSummary",
        component:()=>import("@/views/warehouseLogistics/LogisticsCustomerExchangeSummary"),
        meta:{
            auth:true
        }
    },
    {   // 仓储客户往来明细账
        path:"WarehouseCustomerExchangeAccount",
        name:"WarehouseCustomerExchangeAccount",
        component:()=>import("@/views/warehouseLogistics/WarehouseCustomerExchangeAccount"),
        meta:{
            auth:true
        }
    },
    {   // 仓储客户往来汇总表
        path:"WarehouseCustomerExchangeSummary",
        name:"WarehouseCustomerExchangeSummary",
        component:()=>import("@/views/warehouseLogistics/WarehouseCustomerExchangeSummary"),
        meta:{
            auth:true
        }
    }
]