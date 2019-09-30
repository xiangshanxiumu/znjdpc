/*
 * @Description: In User Settings Edit
 * @Author: xiangshanxiumu
 * @Date: 2019-09-14 16:10:33
 * @LastEditTime: 2019-09-14 16:19:45
 * @LastEditors: Please set LastEditors
 */
export default {
  state: {
    // 所有菜单路由映射表,
    menuMap: [{
        type: "综合管理",
        entity: { // 综合管理
          id: "zhgl",
          path: "综合管理",
          icon: "el-icon-menu",
          name: "综合管理"
        },
        childs: [{
            entity: {
              id: "FixedAssets",
              path: "/Home/FixedAssets",
              icon: "el-icon-document",
              name: "国定资产"
            }
          },
          {
            entity: {
              id: "Consumable",
              path: "/Home/Consumable",
              icon: "el-icon-document",
              name: "易耗品"
            }
          },
          {
            entity: {
              id: "OfficeSupplies",
              path: "/Home/OfficeSupplies",
              icon: "el-icon-document",
              name: "办公用品"
            },
          },
          {
            entity: {
              id: "FileManagement",
              path: "/Home/FileManagement",
              icon: "el-icon-document",
              name: "文件管理"
            },
          },
          {
            entity: {
              id: "WagePerformance",
              path: "/Home/WagePerformance",
              icon: "el-icon-document",
              name: "工资绩效"
            },
          },
        ]
      },
      {
        type: "资金管理",
        entity: { // 资金管理
          id: "zjgl",
          path: "资金管理",
          icon: "el-icon-menu",
          name: "资金管理"
        },
        childs: [{
            entity: {
              id: "ContractEntry",
              path: "/Home/ContractEntry",
              icon: "el-icon-document",
              name: "合同录入"
            }
          },
          {
            entity: {
              id: "ContractSummary",
              path: "/Home/ContractSummary",
              icon: "el-icon-document",
              name: "合同汇总"
            }
          },
          {
            entity: {
              id: "PaymentApplicationFormEntry",
              path: "/Home/PaymentApplicationFormEntry",
              icon: "el-icon-document",
              name: "付款申请单录入"
            }
          },
          {
            entity: {
              id: "ReceivingApplicationFormEntry",
              path: "/Home/ReceivingApplicationFormEntry",
              icon: "el-icon-document",
              name: "收款通知单录入"
            }
          },
          {
            entity: {
              id: "SummaryOfReceiptsAndPayments",
              path: "/Home/SummaryOfReceiptsAndPayments",
              icon: "el-icon-document",
              name: "收付款汇总表"
            }
          },
          {
            entity: {
              id: "fptzd",
              path: "发票通知单",
              icon: "el-icon-menu",
              name: "发票通知单"
            },
            childs: [{
                entity: {
                  id: "IncomeInvoiceNotice",
                  path: "/Home/IncomeInvoiceNotice",
                  icon: "el-icon-document",
                  name: "进项发票通知单"
                }
              },
              {
                entity: {
                  id: "SalesInvoiceNotice",
                  path: "/Home/SalesInvoiceNotice",
                  icon: "el-icon-document",
                  name: "销项发票通知单"
                }
              },
              {
                entity: {
                  id: "InvoiceNoticedetails",
                  path: "/Home/InvoiceNoticedetails",
                  icon: "el-icon-document",
                  name: "发票通知单详情"
                }
              }
            ]
          }
        ]
      },
      { // 采购管理
        type: "采购管理",
        entity: {
          id: "cggl",
          path: "采购管理",
          icon: "el-icon-menu",
          name: "采购管理"
        },
        childs: [{
            entity: {
              id: "cchtgl",
              path: "采购合同管理",
              icon: "el-icon-menu",
              name: "采购合同管理"
            },
            childs: [{
                entity: {
                  id: "ProcurementContractEntry",
                  path: "/Home/ProcurementContractEntry",
                  icon: "el-icon-document",
                  name: "采购合同录入"
                }
              },
              {
                entity: {
                  id: "ProcurementContractSummary",
                  path: "/Home/ProcurementContractSummary",
                  icon: "el-icon-document",
                  name: "采购合同汇总"
                }
              }
            ]
          },
          {
            entity: {
              id: "WarehousingReceiptEntry",
              path: "/Home/WarehousingReceiptEntry",
              icon: "el-icon-document",
              name: "入仓单录入"
            }
          },
          {
            entity: {
              id: "WarehousingSummary",
              path: "/Home/WarehousingSummary",
              icon: "el-icon-document",
              name: "入仓明细汇总表"
            }
          },

          {
            entity: {
              id: "PurchaseCustomerExchangeAccount",
              path: "/Home/PurchaseCustomerExchangeAccount",
              icon: "el-icon-document",
              name: "采购客户往来明细账"
            }
          },
          {
            entity: {
              id: "PurchaseCustomerExchangeSummary",
              path: "/Home/PurchaseCustomerExchangeSummary",
              icon: "el-icon-document",
              name: "采购客户往来汇总表"
            }
          }
        ]
      },
      { // 销售管理
        type: "销售管理",
        entity: {
          id: "xsgl",
          path: "销售管理",
          icon: "el-icon-menu",
          name: "销售管理"
        },
        childs: [{
            entity: {
              id: "PricePolicyTable",
              path: "/Home/PricePolicyTable",
              icon: "el-icon-document",
              name: "价格政策表"
            }
          },
          {
            entity: {
              id: "khdagl",
              path: "客户档案管理",
              icon: "el-icon-menu",
              name: "客户档案管理"
            },
            childs: [{
                entity: {
                  id: "CustomerFilesSummary",
                  path: "/Home/CustomerFilesSummary",
                  icon: "el-icon-document",
                  name: "客户档案汇总表"
                }
              },
              {
                entity: {
                  id: "CustomerFilesDetails",
                  path: "/Home/CustomerFilesDetails",
                  icon: "el-icon-document",
                  name: "客户信息档案明细"
                }
              },
            ]
          },
          {
            entity: {
              id: "xxhtgl",
              path: "销售合同",
              icon: "el-icon-menu",
              name: "销售合同管理"
            },
            childs: [{
                entity: {
                  id: "SalesContractEntry",
                  path: "/Home/SalesContractEntry",
                  icon: "el-icon-document",
                  name: "销售合同录入"
                }
              },
              {
                entity: {
                  id: "SalesContractSummary",
                  path: "/Home/SalesContractSummary",
                  icon: "el-icon-document",
                  name: "销售合同汇总"
                }
              }
            ]
          },
          {
            entity: {
              id: "WarehousingSummary",
              path: "/Home/WarehousingSummary",
              icon: "el-icon-document",
              name: "入仓明细汇总表"
            }
          },
          {
            entity: {
              id: "WarehouseEntry",
              path: "/Home/WarehouseEntry",
              icon: "el-icon-document",
              name: "出仓单录入"
            }
          },
          {
            entity: {
              id: "WarehouseSummary",
              path: "/Home/WarehouseSummary",
              icon: "el-icon-document",
              name: "出仓单汇总"
            }
          },
          {
            entity: {
              id: "SalesCustomerExchangeAccount",
              path: "/Home/SalesCustomerExchangeAccount",
              icon: "el-icon-document",
              name: "销售客户往来明细账"
            }
          },
          {
            entity: {
              id: "SalesCustomerExchangeSummary",
              path: "/Home/SalesCustomerExchangeSummary",
              icon: "el-icon-document",
              name: "销售客户往来汇总表"
            }
          }
        ]
      },
      { // 加工管理
        type: "加工管理",
        entity: {
          id: "jggl",
          path: "加工管理",
          icon: "el-icon-menu",
          name: "加工管理"
        },
        childs: [{
            entity: {
              id: "wwjghtgl",
              path: "委外加工合同管理",
              icon: "el-icon-menu",
              name: "委外加工合同管理"
            },
            childs: [{
                entity: {
                  id: "OutsourcingProcessingContractEntry",
                  path: "/Home/OutsourcingProcessingContractEntry",
                  icon: "el-icon-document",
                  name: "委外加工合同录入"
                }
              },
              {
                entity: {
                  id: "OutsourcingProcessingContractSummary",
                  path: "/Home/OutsourcingProcessingContractSummary",
                  icon: "el-icon-document",
                  name: "委外加工合同汇总"
                }
              }
            ]
          },
          {
            entity: {
              id: "OutsourcingProcessingEntry",
              path: "/Home/OutsourcingProcessingEntry",
              icon: "el-icon-document",
              name: "委外加工单录入"
            }
          },
          {
            entity: {
              id: "OutsourcingProcessingSummary",
              path: "/Home/OutsourcingProcessingSummary",
              icon: "el-icon-document",
              name: "委外加工单汇总"
            }
          },
          {
            entity: {
              id: "SteelCoilPacking",
              path: "/Home/SteelCoilPacking",
              icon: "el-icon-document",
              name: "委外加工钢卷打包"
            }
          },
          {
            entity: {
              id: "SteelCoilPackingSummary",
              path: "/Home/SteelCoilPackingSummary",
              icon: "el-icon-document",
              name: "委外加工钢卷打包汇总表"
            }
          },
          {
            entity: {
              id: "RollPackWarehouseEntry",
              path: "/Home/RollPackWarehouseEntry",
              icon: "el-icon-document",
              name: "卷包出仓录入"
            }
          },
          {
            entity: {
              id: "ProcessingCustomerExchangeAccount",
              path: "/Home/ProcessingCustomerExchangeAccount",
              icon: "el-icon-document",
              name: "加工客户往来明细账"
            }
          },
          {
            entity: {
              id: "ProcessingCustomerExchangeSummary",
              path: "/Home/ProcessingCustomerExchangeSummary",
              icon: "el-icon-document",
              name: "加工客户往来汇总表"
            }
          }
        ]
      },
      { // 仓储物流
        type: "仓储物流",
        entity: {
          id: "ccwl",
          path: "仓储物流",
          icon: "el-icon-menu",
          name: "仓储物流"
        },
        childs: [{
            entity: {
              id: "WarehousingContractEntry",
              path: "/Home/WarehousingContractEntry",
              icon: "el-icon-document",
              name: "仓储合同录入"
            }
          },
          {
            entity: {
              id: "WarehousingContractSummary",
              path: "/Home/WarehousingContractSummary",
              icon: "el-icon-document",
              name: "仓储合同汇总"
            }
          },
          {
            entity: {
              id: "WarehouseCustomerExchangeAccount",
              path: "/Home/WarehouseCustomerExchangeAccount",
              icon: "el-icon-document",
              name: "仓储客户往来明细账"
            }
          },
          {
            entity: {
              id: "WarehouseCustomerExchangeSummary",
              path: "/Home/WarehouseCustomerExchangeSummary",
              icon: "el-icon-document",
              name: "仓储客户往来汇总表"
            }
          },
          {
            entity: {
              id: "LogisticsContractEntry",
              path: "/Home/LogisticsContractEntry",
              icon: "el-icon-document",
              name: "物流合同录入"
            }
          },
          {
            entity: {
              id: "LogisticsContractsSummary",
              path: "/Home/LogisticsContractsSummary",
              icon: "el-icon-document",
              name: "物流合同汇总"
            }
          },
          {
            entity: {
              id: "LogisticsCustomerExchangeAccount",
              path: "/Home/LogisticsCustomerExchangeAccount",
              icon: "el-icon-document",
              name: "物流客户往来明细账"
            }
          },
          {
            entity: {
              id: "LogisticsCustomerExchangeSummary",
              path: "/Home/LogisticsCustomerExchangeSummary",
              icon: "el-icon-document",
              name: "物流客户往来汇总表"
            }
          }
        ]
      },
      {
        type: "高层管理", // 高层管理
        entity: {
          id: "qygl",
          path: "高层管理",
          icon: "el-icon-menu",
          name: "高层管理"
        },
        childs: [
          {
            entity: {
              id: "dshjy",
              path: "董事会决议",
              icon: "el-icon-menu",
              name: "董事会决议"
            },
            childs:[
              {
                entity: {
                  id: "MarketingPlan",
                  path: "/Home/DirectorsResolutionSummary",
                  icon: "el-icon-document",
                  name: "董事会决议汇总表"
                }
              },
              {
                entity: {
                  id: "MarketingPlan",
                  path: "/Home/DirectorsResolutionDetails",
                  icon: "el-icon-document",
                  name: "董事会决议明细"
                }
              }
            ]
          },
          {
            entity: {
              id: "zjlbghyjy",
              path: "总经理办公会议决议",
              icon: "el-icon-menu",
              name: "总经理办公会议决议"
            },
            childs:[
              {
                entity: {
                  id: "GManagerOMResolutionSummary",
                  path: "/Home/GManagerOMResolutionSummary",
                  icon: "el-icon-document",
                  name: "办公会议决议汇总表"
                }
              },
              {
                entity: {
                  id: "GManagerOMResolutionDetails",
                  path: "/Home/GManagerOMResolutionDetails",
                  icon: "el-icon-document",
                  name: "办公会议决议明细"
                }
              }
            ]
          },
          {
            entity: {
              id: "yxgl",
              path: "营销管理",
              icon: "el-icon-menu",
              name: "营销管理"
            },
            childs: [
              {
              entity: {
                id: "MarketingPlanSummary",
                path: "/Home/MarketingPlanSummary",
                icon: "el-icon-document",
                name: "营销计划汇总"
              }
            },
            {
              entity: {
                id: "MarketingPlanDetails",
                path: "/Home/MarketingPlanDetails",
                icon: "el-icon-document",
                name: "营销计划明细"
              }
            }
          ]
          }
          
        ]
      },
    ],
    // authMenu
    authMenu: sessionStorage.authMenu, // 当前角色权限菜单
    // 导航条 面包屑组数据
    breadList: [],
    // 动态tags
    dynamicTags: [],
    // 所有合同数据列表
    AllContract: [],
    // 所有合同ID
    CIDList: [],
    // 初始全局数据 input 输入联想反馈
    InitGlobalData:{},
  },
  getters: {
    // 所有菜单映射表
    menuMap: (state) => state.menuMap,
    // 资金管理部门操作菜单映射表
    fundManMenu: (state) => {
      let menuArr = state.menuMap.filter(item => {
        return item.type == "资金管理"
      })
      return menuArr;
    },
    // 采购管理部门操作菜单映射表
    PurManMenu: (state) => {
      let menuArr = state.menuMap.filter(item => {
        return item.type == "采购管理"
      })
      return menuArr;
    },
    // 销售管理部门操作菜单映射表
    SaleManMenu: (state) => {
      let menuArr = state.menuMap.filter(item => {
        return item.type == "销售管理"
      })
      return menuArr;
    },
    // 加工管理部门操作菜单映射表
    ProManMenu: (state) => {
      let menuArr = state.menuMap.filter(item => {
        return item.type == "加工管理"
      })
      return menuArr;
    },
    // 仓储物流管理部门操作菜单映射表
    StoLManMenu: (state) => {
      let menuArr = state.menuMap.filter(item => {
        return item.type == "仓储物流"
      })
      return menuArr;
    },
    breadList: (state) => state.breadList,
    dynamicTags: (state) => state.dynamicTags,
    // 所有合同ID
    CIDList: (state) => state.CIDList,
    // BrandList牌号
    BrandList:(state)=>state.InitGlobalData.BrandList,
    // GNameList品名
    GNameList:(state)=>state.InitGlobalData.GNameList,
    // StandardsList规格
    StandardsList:(state)=>state.InitGlobalData.StandardsList,
    // StoreList仓库
    StoreList:(state)=>state.InitGlobalData.StoreList,
    // UnitList单位
    UnitList:(state)=>state.InitGlobalData.UnitList,
  },
  mutations: {
    updateMenuMap(state, payload) {
      state.menuMap = payload.menuMap;
    },
    updateBreadList(state, payload) {
      state.breadList = payload.breadList;
    },
    updateDynamicTags(state, payload) {
      state.dynamicTags = payload.dynamicTags;
    },
    // 所有合同数据列表数据更新
    updteAllContract(state, payload) {
      state.AllContract = payload.AllContract;
    },
    updteCIDList(state, payload) {
      state.CIDList = payload.CIDList;
    },
    // 提交 初始全局数据
    updateInitGlobalData(state, payload) {
      state.InitGlobalData = payload.InitGlobalData;
    },
  },
  actions: {
    changeUpdateMenuMap(context, payload) {
      context.commit('updateMenuMap', payload)
    }
  }
}
