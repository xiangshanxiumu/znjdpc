<template>
  <div class="page-wrap">
    <h1>入仓汇总表</h1>
    <div class="page-content">
      <!--列表-->
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column
          v-for="(item,index) in tableTitle"
          :key="index"
          sortable
          :prop="item.prop"
          :label="item.label"
        ></el-table-column>
        <el-table-column label="操作" width="180" fixed="right">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="machiningHandle(scope.$index, scope.row)"
            >加工</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="outOfStockHandle(scope.$index, scope.row)"
            >出库</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--列表-->
      <!--分页器-->
      <div class="page-device">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="1000"
        ></el-pagination>
      </div>
      <!--分页器-->
      <!--按钮区-->
      <!-- <div class="footer-btns">
        <el-button @click="backHandle">返回</el-button>
        <el-button type="primary" @click="submitHandle">提交</el-button>
      </div> -->
      <!--按钮区-->
    </div>
  </div>
</template>
<script>
export default {
  // 入仓汇总表情况
  name: "WarehousingSummary",
  data() {
    return {
      tableTitle: [
        {
          prop: "warehouseReceiptNumber",
          label: "入仓单编号"
        },
        {
          prop: "contractNumber",
          label: "合同编号"
        },
        {
          prop: "purchasingUnit",
          label: "采购单位"
        },
        {
          prop: "warehouseReceiptDate",
          label: "仓单日期"
        },
        {
          prop: "receivingWarehouse",
          label: "收货仓库"
        },
        {
          prop: "brandName",
          label: "牌号"
        },
        {
          prop: "specifications",
          label: "规格"
        },
        {
          prop: "coilNumber",
          label: "钢卷号"
        },
        {
          prop: "tonnage",
          label: "吨位"
        }
      ],
      tableData: [
        {
          warehouseReceiptNumber: "180804LJ",
          contractNumber: "0801H",
          purchasingUnit: "新余中冶",
          warehouseReceiptDate: "2018年9月19日",
          receivingWarehouse: "新余丽佳",
          brandName: "50ZWJ352",
          specifications: "50*1200*C",
          coilNumber: "88888802",
          tonnage: "13.355"
        },
        {
          warehouseReceiptNumber: "180804XO",
          contractNumber: "0801H",
          purchasingUnit: "新余中冶",
          warehouseReceiptDate: "2018年9月19日",
          receivingWarehouse: "新余鑫欧",
          brandName: "50ZWJ352",
          specifications: "50*1200*C",
          coilNumber: "88888801",
          tonnage: "46.745"
        },
        {
          warehouseReceiptNumber: "180807YZ1",
          contractNumber: "0802",
          purchasingUnit: "新余中冶",
          warehouseReceiptDate: "2018年9月19日",
          receivingWarehouse: "江阴银泽",
          brandName: "40ZWJ262",
          specifications: "40*1200*C",
          coilNumber: "88888804",
          tonnage: "33.485"
        }
      ],
      currentPage: 1
    };
  },
  methods: {
    getSummaries() {},
    // 加工
    machiningHandle(index, row) {
      console.log(index, row);
    },
    // 出库
    outOfStockHandle(index, row) {
      console.log(index, row);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // 返回按钮
    backHandle() {
      this.$router.go(-1);
    },
    // 提交按钮
    submitHandle() {
      console.log("提交");
    }
  }
};
</script>
<style scoped>
.page-wrap {
  width: 100%;
  height: 100%;
}
.page-content {
  padding: 1rem;
  text-align: left;
}
</style>