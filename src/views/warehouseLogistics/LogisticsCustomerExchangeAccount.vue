<template>
  <div class="page-wrap">
    <h1>物流客户往来明细账</h1>
    <div class="page-content">
      <!--表格-->
      <el-table
        :data="tableData"
        border
        show-summary
        height="600"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="50" align="center" fixed="left"></el-table-column>
        <el-table-column
          v-for="(item,index) in tableTitle"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :fixed="item.fixed"
          :sortable="item.sortable"
          align="center"
        >
          <template v-if="item.children" class="children">
            <el-table-column
              v-for="(item2,index) in item.children"
              :key="index"
              :prop="item2.prop"
              :label="item2.label"
              :fixed="item.fixed"
              :sortable="item.sortable"
              align="center"
            ></el-table-column>
          </template>
        </el-table-column>
      </el-table>
      <!--表格-->
    </div>
  </div>
</template>
<script>
export default {
  // 物流客户往来明细账
  name: "LogisticsCustomerExchangeAccount",
  data() {
    return {
      tableData: [
        {
          CID: "2019-0703", // 合同编号
          GName: "50ZWJ352", // 品名
          Brand: "12W", // 产品编号
          Standards: "0.5*1200", // 规格
          PacketDelTon: "23.1", // 包送吨位
          SelfMentionTon: "", // 自提吨位
          UnitPrice: "5250", //单价
          TotalPrice: "121275", // 总金额
          Payment: "", // 付款
          CustomerMargin: "", // 客户保证金
          Cash: "", // 现金
          Acceptance: "", // 承兑
          InvoicedTon: "", // 吨位
          InvoicedUnitPrice: "", // 单价
          InvoicedTotalPrice: "" // 总金额
        },
        {
          CID: "2019-0703", // 合同编号
          GName: "50ZWJ352", // 品名
          Brand: "12W", // 产品编号
          Standards: "0.5*1200", // 规格
          PacketDelTon: "23.1", // 包送吨位
          SelfMentionTon: "", // 自提吨位
          UnitPrice: "5250", //单价
          TotalPrice: "121275", // 总金额
          Payment: "", // 付款
          CustomerMargin: "", // 客户保证金
          Cash: "", // 现金
          Acceptance: "", // 承兑
          InvoicedTon: "", // 吨位
          InvoicedUnitPrice: "", // 单价
          InvoicedTotalPrice: "" // 总金额
        }
      ],
      tableTitle: [
        {
          prop: "CID",
          label: "合同编号",
          width: "100",
          fixed: "left",
          sortable:true,
        },
        {
          prop: "GName",
          label: "品名",
          width: "100",
          fixed: "left",
          sortable:true,
        },
        {
          prop: "Brand",
          label: "产品编号", // 牌号
          width: "120",
          fixed: "left",
          sortable:true,
        },
        {
          prop: "Standards",
          label: "规格",
          width: "100",
          fixed: "left",
          sortable:true,
        },
        {
          prop: "PacketDelTon", //
          label: "包送吨位",
          width: "120",
          fixed: "",
          sortable:true,
        },
        {
          prop: "SelfMentionTon",
          label: "自提吨位",
          width: "120",
          fixed: "",
          sortable:true,
        },
        {
          prop: "UnitPrice",
          label: "单价",
          width: "100",
          fixed: "",
          sortable:true,
        },
        {
          prop: "TotalPrice",
          label: "总金额",
          width: "100",
          fixed: "",
          sortable:true,
        },
        {
          prop: "Payment",
          label: "付款", // payment
          width: "100",
          fixed: "",
          sortable:true,
        },
        {
          prop: "ReceivablesMethod",
          label: "收款方式", // payment
          width: "",
          fixed: "",
          sortable:false,
          children: [
            {
              prop: "CustomerMargin",
              label: "客户保证金",
              width: "",
              fixed: "",
              sortable:true,
            },
            {
              prop: "Cash",
              label: "现金",
              width: "",
              fixed: "",
              sortable:true,
            },
            {
              prop: "Acceptance",
              label: "承兑",
              width: "",
              fixed: "",
              sortable:true,
            }
          ]
        },
        {
          prop: "AccountsReceivable",
          label: "应收账款", // payment
          width: "",
          fixed: "",
          sortable:true,
        },
        {
          prop: "Invoiced",
          label: "已开发票", // payment
          width: "",
          fixed: "",
          sortable:false,
          children: [
            {
              prop: "InvoicedTon",
              label: "吨位",
              width: "",
              fixed: "",
              sortable:true,
            },
            {
              prop: "InvoicedUnitPrice",
              label: "单价",
              width: "",
              width: "",
              fixed: "",
              sortable:true,
            },
            {
              prop: "InvoicedTotalPrice",
              label: "总金额",
              width: "",
              width: "",
              fixed: "",
              sortable:true,
            }
          ]
        }
      ],
      multipleSelection: null
    };
  },
  methods: {
    // 表格勾选事件
    handleSelectionChange(val) {
        console.log(val)
      // 勾选内容
      this.multipleSelection = val;
    }
  }
};
</script>
<style>
</style>