<template>
  <div class="page-wrap">
    <h1>销售客户往来汇总表</h1>
    <div class="page-content">
      <!--表格-->
      <el-table
        :data="tableData"
        border
        show-summary
        :summary-method="getSummaries"
        max-height="600"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
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
        </el-table-column>
      </el-table>
      <!--表格-->
    </div>
  </div>
</template>
<script>
export default {
  // 销售客户往来汇总表
  name: "SalesCustomerExchangeSummary",
  data() {
    return {
      tableData: [
        { 
          UnitName:"",// 单位名称
          PacketDelTon: "23.1", // 包送吨位
          SelfMentionTon: "", // 自提吨位
          TotalPrice: "121275", // 总金额
          Payment: "", // 付款
          CustomerMargin: "", // 客户保证金
          PublicAccountCash:"", //公账现金
          Acceptance: "", // 承兑
          AccountsReceivable:"", // 应收账款
          InvoicedAmount:"", // 已开票金额
          UninvoicedAmount:"", // 未开票金额
          unPerformContract:"", // 未履行合同
        },
        { 
          UnitName:"",// 单位名称
          PacketDelTon: "23.1", // 包送吨位
          SelfMentionTon: "", // 自提吨位
          TotalPrice: "121275", // 总金额
          Payment: "", // 付款
          CustomerMargin: "", // 客户保证金
          PublicAccountCash:"", //公账现金
          Acceptance: "", // 承兑
          AccountsReceivable:"", // 应收账款
          InvoicedAmount:"", // 已开票金额
          UninvoicedAmount:"", // 未开票金额
          unPerformContract:"", // 未履行合同
        },
      ],
      tableTitle: [
        {
          prop: "UnitName",
          label: "单位名称",
          width: "200",
          fixed: "",
          sortable: true
        },
        {
          prop: "PacketDelTon",
          label: "包送吨位",
          width: "",
          fixed: "",
          sortable: true
        },
        {
          prop: "SelfMentionTon",
          label: "自提吨位",
          width: "",
          fixed: "",
          sortable: true
        },
        {
          prop: "TotalPrice",
          label: "总金额",
          width: "",
          fixed: "",
          sortable: true
        },
        {
          prop: "Payment",
          label: "付款",
          width: "",
          fixed: "",
          sortable: true
        },
        {
          prop: "CustomerMargin",
          label: "客户保证金",
          width: "",
          fixed: "",
          sortable: true
        },
        {
          prop: "PublicAccountCash",
          label: "公账现金",
          width: "",
          fixed: "",
          sortable: true
        },
        {
          prop: "Acceptance",
          label: "承兑",
          width: "",
          fixed: "",
          sortable: true
        },
        {
          prop: "AccountsReceivable",
          label: "应收账款",
          width: "",
          fixed: "",
          sortable: true
        },
        {
          prop: "InvoicedAmount",
          label: "已开票金额",
          width: "",
          fixed: "",
          sortable: false
        },
        {
          prop: "UninvoicedAmount",
          label: "未开票金额",
          width: "",
          fixed: "",
          sortable: false
        },
        {
          prop: "unPerformContract",
          label: "未履行合同",
          width: "",
          fixed: "",
          sortable: false
        },
      ],
      multipleSelection: null
    };
  },
  methods: {
    // 表格勾选事件
    handleSelectionChange(val) {
      console.log(val);
      // 勾选内容
      this.multipleSelection = val;
    },
    // 表单合计自定义统计计算方法
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        } else if (index >= 2) {
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += " 吨";
          }
        } else {
          sums[index] = "";
        }
      });

      return sums;
    },
  }
};
</script>
<style>
</style>