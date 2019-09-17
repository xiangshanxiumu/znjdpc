<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-14 09:30:21
 * @LastEditTime: 2019-09-15 16:05:08
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="page-wrap">
    <h1>出仓单汇总表</h1>
    <div class="page-content">
      <!--搜索区-->
      <div class="page-search">
        <div class="page-search-item">
          <el-form :model="searchFrom">
            <div class="input-box">
              <div class="input-label">出仓单编号:</div>
              <el-input v-model="searchFrom.warehouseReceiptId" placeholder="请输入内容"></el-input>
            </div>
            <div class="input-box">
              <div class="input-label">销售合同编号:</div>
              <el-input v-model="searchFrom.contractId" placeholder="请输入内容"></el-input>
            </div>
            <div class="input-box">
              <div class="input-label">销售单位:</div>
              <el-input v-model="searchFrom.Buyby" placeholder="请输入内容"></el-input>
            </div>
            <div class="input-box">
              <div class="input-label">仓单日期:</div>
              <el-date-picker v-model="searchFrom.RecDate" type="date" placeholder="选择日期"></el-date-picker>
            </div>
            <div class="input-box">
              <div class="input-label">收货仓库:</div>
              <el-input v-model="searchFrom.RecDepo" placeholder="请输入内容"></el-input>
            </div>
            <div class="input-box">
              <div class="input-label">钢卷号:</div>
              <el-input v-model="searchFrom.Id" placeholder="请输入内容"></el-input>
            </div>
            <div class="input-box search-Box">
              <el-button type="primary" @click="searchHandle">查询</el-button>
            </div>
          </el-form>
        </div>
      </div>
      <!--搜索区-->
      <!--表格顶部区域-->
      <div class="table-top-area">
        <div class="table-top-btns">
          <el-button size="mini" type="primary" @click="machiningHandle()">加工</el-button>
          <el-button size="mini" type="danger" @click="outOfStockHandle()">出库</el-button>
        </div>
        <div class="table-top-status">
          <div class="status-item">
            <span class="status-item-label">总吨位: </span>
            <span>{{totalTon}}吨</span>
          </div>
        </div>
      </div>
      <!--表格顶部区域-->
      <!--列表-->
      <el-table
        :data="tableData"
        border
        show-summary
        height="450"
        :summary-method="getSummaries"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column
          v-for="(item,index) in tableTitle"
          :key="index"
          sortable
          :prop="item.prop"
          :label="item.label"
        ></el-table-column>
      </el-table>
      <!--列表-->
      <!--分页器-->
      <div class="page-device">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          layout="total, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
      <!--分页器-->
      <!--按钮区-->
      <!-- <div class="footer-btns">
        <el-button @click="backHandle">返回</el-button>
        <el-button type="primary" @click="submitHandle">提交</el-button>
      </div>-->
      <!--按钮区-->
    </div>
  </div>
</template>
<script>
import {
  getWarehouseReceiptList,
} from "@/api/warehousingManagement";
export default {
  // 出仓单汇总表
  name: "WarehouseSummary",
  data() {
    return {
      searchFrom: {
        warehouseReceiptId: "",
        contractId: "",
        Buyby:"",
        RecDate:"",
        RecDepo:"",
        Id:"",
      },
      tableTitle: [
        {
          prop: "warehouseReceiptId",
          label: "出仓单编号"
        },
        {
          prop: "contractId",
          label: "销售合同编号"
        },
        {
          prop: "Buyby",
          label: "销售单位"
        },
        {
          prop: "RecDate",
          label: "仓单日期"
        },
        {
          prop: "RecDepo",
          label: "收货仓库"
        },
        {
          prop: "Brand",
          label: "牌号"
        },
        {
          prop: "Standards",
          label: "规格"
        },
        {
          prop: "Id",
          label: "钢卷号"
        },
        {
          prop: "Ton",
          label: "吨位"
        },
        {
          prop:"GStatus",
          label:"状态"
        }
      ],
      tableData: [],
      currentPage: 1, //当前页index
      pageIndex:1,
      pageSize: 20, // 单次页面展示页面数据条数据
      pageStart:0,
      pageEnd:19,
      total: 10, // 总数据条数
      goodsList:[], // 总钢卷列表数据
      multipleSelection:[], // 表格勾选内容数组
    };
  },
  computed:{
    totalTon(){ // 总吨位
      let count = 0;
      if(this.goodsList.length>0){
        this.goodsList.map(item=>{
          count += parseFloat(item.Ton);
        })
      }
      return count;
    }
  },
  mounted() {
    console.log(getWarehouseReceiptList);
    // 初始获取列表数据
    this.getList(1);
  },
  methods: {
    // 表单合计自定义统计计算方法
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        } else if (index == 9) {
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
    // 搜索
    searchHandle(){
      console.log(this.searchFrom);
    },
    // 计算获取钢卷号的列表数据
    getGoods(data){
      let gootList = [];
      if(data==undefined || !Array.isArray(data)) return false;
      if(Array.isArray(data)){
        if(data.length>0){
          data.map(item1=>{
            // Id
            // SignTime
            // Supply
            if(item1.InStores && Array.isArray(item1.InStores) && (item1.InStores.length>0)){
              item1.InStores.map(item2=>{
                // Id
                // Buyby
                // RecDate
                // RecDepo
                if(item2.ISGoods&& Array.isArray(item2.ISGoods) && (item2.ISGoods.length>0)){
                  item2.ISGoods.map(item3=>{
                    item3.contractId = item1.Id; // 合同编号 id
                    item3.SignTime =  item1.SignTime; // 合同签订时间
                    item3.Supply = item1.Supply; // 供应商

                    item3.warehouseReceiptId = item2.Id; // 入仓单编号 id
                    item3.Buyby = item2.Buyby; // 采购单位
                    item3.RecDate = item2.RecDate; // 采购日期
                    item3.RecDepo = item2.RecDepo; // 收货仓库
                  })
                  gootList = gootList.concat(item2.ISGoods);
                }
              })
            }
          })
        }
      }
      return gootList;
    },
    // 获取列表数据
    async getList(pageIndex,pageSize) {
      let result = await getWarehouseReceiptList(pageIndex,pageSize);
      if(result.StatusCode == 200){
        let data = result.Result;
        this.goodsList = this.getGoods(data);
        this.total = this.goodsList.length;
        this.tableData = this.goodsList.slice(this.pageStart,this.pageEnd);
      }
    },
    // 加工
    machiningHandle() {
      console.log(this.multipleSelection)
      this.multipleSelection.map(item=>{

      })
      let Id = "";
      this.$router.push({
        path: "WarehousingProcessing",
        query: {
          Id: Id
        }
      });
    },
    // 出库
    async outOfStockHandle() {
      console.log(this.multipleSelection)
      console.log("出库")
      let result = await outOfStock();
      console.log(result);
      this.$message({
        message: "出库操作成功",
        type: "success",
        duration: 1000
      });
      // this.getList(currentPage);
    },
    // 表格勾选事件
    handleSelectionChange(val) {
      // 勾选内容
      this.multipleSelection = val;
    },
    // 分页器
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    // 分页面页面index触发跳转
    handleCurrentChange(val) {
      this.pageStart = this.pageSize*(val-1);
      this.pageEnd = this.pageSize*val-1;
      this.tableData = this.goodsList.slice(this.pageStart,this.pageEnd);
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
  overflow-x: hidden;
  overflow-y: auto;
}
.input-label {
  min-width: 7rem;
}
.search-Box{
  padding:1rem 2rem;
}
</style>