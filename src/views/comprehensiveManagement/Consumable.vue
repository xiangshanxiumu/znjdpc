<template>
  <div class="page-wrap">
    <h1>易耗品</h1>
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
  // 易耗品
  name: "Consumable",
  data() {
    return {
      tableData: [
          {}
      ],
      tableTitle: [
        {
          prop: "Date",
          label: "日期",
          width: "150",
          fixed: "",
          sortable: true
        },
        {
          prop: "AssetName",
          label: "资产名称",
          width: "150",
          fixed: "",
          sortable: true
        },
        {
          prop: "SID",
          label: "入仓单编号",
          width: "",
          fixed: "",
          sortable: true
        },
        {
          prop: "EnclosurePhoto",
          label: "附件照片",
          width: "",
          fixed: "",
          sortable: true
        },
        {
          prop: "AssetsAmount",
          label: "资产金额",
          width: "",
          fixed: "",
          sortable: true
        },
        {
          prop: "SupplyName",
          label: "供应商名称",
          width: "",
          fixed: "",
          sortable: true
        },
        {
          prop: "SupplyContacts",
          label: "供应商联系人",
          width: "",
          fixed: "",
          sortable: true
        },
        {
          prop: "ContactNumber",
          label: "联系电话",
          width: "",
          fixed: "",
          sortable: true
        },
        {
          prop: "Custodian",
          label: "保管人",
          width: "",
          fixed: "",
          sortable: true
        },
        {
          prop: "Receiver",
          label: "领用人",
          width: "",
          fixed: "",
          sortable: true
        },
        {
          prop: "ReceiveStatus",
          label: "领用状态",
          width: "",
          fixed: "",
          sortable: false
        },
        {
          prop: "Remarks",
          label: "备注",
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