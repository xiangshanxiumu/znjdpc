<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-14 09:30:21
 * @LastEditTime: 2019-09-15 16:05:08
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="page-wrap">
    <h1>采购合同汇总表</h1>
    <div class="page-content">
      <!--搜索区-->
      <div class="page-search">
        <div class="page-search-item">
          <el-form :model="searchFrom">
            <div class="input-box">
              <el-form-item label="采购合同编号" prop="CID" class="form-item">
                <el-input v-model="searchFrom.CID" placeholder="请输入采购合同编号"></el-input>
              </el-form-item>
            </div>
            <div class="input-box">
              <el-form-item label="供应商名称" prop="Supply" class="form-item">
                <el-input v-model="searchFrom.Supply" placeholder="请输入采购单位"></el-input>
              </el-form-item>
            </div>
            <div class="input-box">
              <el-form-item label="未履行量" prop="NoPerformNum" class="form-item">
                <el-input v-model="searchFrom.NoPerformNum" placeholder="请输入仓单编号"></el-input>
              </el-form-item>
            </div>
            <div class="input-box">
              <el-form-item label="签订结束时间" prop="SignEndTime" class="form-item">
                <el-date-picker
                  v-model="searchFrom.SignEndTime"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="选择结束时间"
                ></el-date-picker>
              </el-form-item>
            </div>
            <div class="input-box">
              <el-form-item>
                <el-button type="primary" @click="searchHandle">查询</el-button>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </div>
      <!--搜索区-->
      <!--表格顶部区域-->
      <div class="table-top-area">
        <div class="table-top-status">
          <div class="status-item">
            <span class="status-item-label">总吨位:</span>
            <span>{{totalTon}}吨</span>
          </div>
          <div class="status-item">
            <span class="status-item-label">总金额:</span>
            <span>{{totalMoney}}元</span>
          </div>
        </div>
      </div>
      <!--表格顶部区域-->
      <!--列表-->
      <el-table
        :data="tableData"
        border
        show-summary
        height="600"
        :summary-method="getSummaries"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        >
        <el-table-column
          v-for="(item,index) in tableTitle"
          :key="index"
          sortable
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          align="center"
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
    </div>
  </div>
</template>
<script>
// 导入合同接口API函数
import { getAllContractList, searchContractList } from "@/api/Contract";
export default {
  // 采购合同汇总表
  name: "ProcurementContractSummary",
  data() {
    return {
      tableData: [
        {
          CID: "0101", // 合同id
          Supply: "新余中冶", // 供方
          Demand: null, // 需方
          Address: null, // 合同签订地址
          SignTime: "2019-01-04 00:00:00", // 合同签订时间
          CEPath: null, // 附件地址
          Type: "采购", // 合同类型
          Id: "0101"
        }
      ],
      // 页面顶部搜索区 数据模型
      searchFrom: {
        CID: "", // 合同编号id
        Supply: "", //供应商单位
        NoPerformNum: "", //未履行量
        SignEndTime: "" // 签订结束时间
      },
      tableTitle: [
        {
          prop: "CID", // 合同编号id
          label: "采购合同编号",
          width: "150"
        },
        {
          prop: "Supply",
          label: "供应商单位",
          width: "200"
        },
        {
          prop: "Brand",
          label: "牌号",
          width: "120"
        },
        {
          prop: "Ton",
          label: "数量(吨)",
          width: "120"
        },
        {
          prop: "CETotalPrice",
          label: "总金额(单位:元)",
          width: "180"
        },
        {
          prop: "SignTime", // 签订结束时间
          label: "签订时间",
          width: "180"
        },
        {
          prop: "SignEndTime", // 签订结束时间
          label: "结束时间",
          width: "150"
        },
        {
          prop: "ContractEnclosure", // 合同附件
          label: "合同附件",
          width: "180"
        },
        {
          prop: "NoPerformNum", // 未履行量
          label: "未履行量",
          width: "180"
        },
        {
          prop: "CEInfo", // 备注
          label: "备注",
          width: ""
        }
      ],
      currentPage: 1, //当前页index
      pageIndex: 1, // 页码
      pageSize: 20, // 单次页面展示页面数据条数据
      pageStart: 0, // 起始数据条数
      pageEnd: 19, // 结束数据条数
      total: 10, // 总数据条数
      goodsList: [], // 总钢卷列表数据
      curList: [], // 搜索操作后的列表数据
      multipleSelection: [] // 表格勾选内容数组
    };
  },
  computed: {
    totalTon() {
      // 总吨位
      let count = 0;
      if (this.curList.length > 0) {
        this.curList.map(item => {
          if(item.Ton){
            count += parseFloat(item.Ton);
          }
        });
        count = count.toFixed(3);
      }
      return count;
    },
    // 总金额
    totalMoney() {
      return 0;
    }
  },
  mounted() {
    // 初始获取列表数据
    this.getList();
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
        } else if (index == 3 || index == 4 || index == 8) {
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
            if (index == 3) {
              sums[index] = sums[index].toFixed(3);
              sums[index] += " 吨";
            } else if (index == 4) {
              sums[index] += " 元";
            }
          }
        } else {
          sums[index] = "";
        }
      });

      return sums;
    },
    // 计算获取钢卷号的列表数据
    getGoods(data) {
      let gootList = [];
      if (data == undefined || !Array.isArray(data)) return false;
      if (Array.isArray(data)) {
        if (data.length > 0) {
          data.map(item1 => {
            // Id
            // SignTime
            // Supply
            if (
              item1.InStores &&
              Array.isArray(item1.InStores) &&
              item1.InStores.length > 0
            ) {
              item1.InStores.map(item2 => {
                // Id
                // Buyby
                // RecDate
                // RecDepo
                if (
                  item2.ISGoods &&
                  Array.isArray(item2.ISGoods) &&
                  item2.ISGoods.length > 0
                ) {
                  item2.ISGoods.map(item3 => {
                    item3.ContractID = item1.Id; // 合同编号 id
                    item3.SignTime = item1.SignTime; // 合同签订时间
                    item3.Supply = item1.Supply; // 供应商

                    item3.InStoreID = item2.Id; // 仓单编号 id
                    item3.GoodsID = item3.Id; // 钢卷号id
                    item3.Buyby = item2.Buyby; // 采购单位
                    item3.RecDate = item2.RecDate; // 采购日期
                    item3.RecDepo = item2.RecDepo; // 收货仓库
                  });
                  gootList = gootList.concat(item2.ISGoods);
                }
              });
            } else {
              // InStores 为[]
              item1.ContractID = item1.Id; // 合同编号 id
              gootList = gootList.concat(item1);
            }
          });
        }
      }
      return gootList;
    },
    // 数据初始分页处理
    GoodsPaging(data) {
      this.pageStart = 0;
      this.pageEnd = 19;
      this.total = data.length; // 总钢卷数据条数
      this.tableData = data.slice(this.pageStart, this.pageEnd); // 截取数据
    },
    // 获取列表数据
    async getList() {
      let result = await getAllContractList();
      const loading = this.$loading({
        lock: true,
        text: "加载中",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      console.log(result)
      if (result.StatusCode == 200) {
        loading.close(); // 关闭加载动画
        if(result.Result){
          this.goodsList = result.Result;
        }
        this.curList = [].concat(this.goodsList);
        this.GoodsPaging(this.curList);
      }
    },
    // 多重不定条件刷选
    getSearchData(obj, arr) {
      // 先过滤搜索条件 把非空有值得搜索条件 找出来
      let Arr = [];
      let obj2 = {};
      // 条件JSON数据清除空值
      for (let k in obj) {
        if (obj[k] != "") {
          obj2[k] = obj[k];
        }
      }
      Arr = arr.filter(item => {
        let flag = true;
        // 遍历条件obj 所有
        for (let j in obj2) {
          // 反向判断 只要有一个不相等 则为false
          if (item[j] != obj2[j]) {
            flag = false;
          }
        }
        if (flag) {
          return item;
        }
      });
      return Arr;
    },
    // 搜索
    searchHandle() {
      // 搜索条件数据 清空格
      for(let k in this.searchFrom) {
        this.searchFrom[k] = this.searchFrom[k].trim();
      }
      // 空值判断
      let isHas = false;
      let serachJSON = {};
      for (let k in this.searchFrom) {
        if (this.searchFrom[k] != "") {
          isHas = true;
          serachJSON[k] = this.searchFrom[k];
        }
      }
      if (isHas) {
        // 从缓存中计算搜索数据 无需再请求API
        const loading = this.$loading({
          lock: true,
          text: "搜索中",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
        let list = this.getSearchData(this.searchFrom, this.goodsList);
        this.curList = list;
        this.GoodsPaging(this.curList);
        loading.close(); // 关闭加载动画
        if (this.curList.length > 0) {
          this.$message({
            message: "搜索完成",
            type: "success",
            showClose: true,
            center: true
          });
        } else {
          this.$message({
            message: "没有匹配该当前条件的数据",
            type: "warning",
            showClose: true,
            center: true
          });
        }
      } else {
        this.$message({
          message: "当前搜索条件为空",
          type: "warning",
          showClose: true,
          center: true
        });
        // 无搜索条件时 显示全部数据
        this.curList = this.goodsList;
        this.GoodsPaging(this.curList);
      }
    },
    // 加工
    machiningHandle() {
      // 判断是否有勾选要出仓加工的钢卷
      if (this.multipleSelection.length == 0) {
        this.$message({
          message: "请选择要加工的钢卷",
          type: "warning",
          showClose: true,
          center: true
        });
        return false;
      }
    },
    // 出库出仓操作 路由跳转到 "出仓单录入"
    outOfStockHandle() {
      // 判断是否有勾选要出仓加工的钢卷
      if (this.multipleSelection.length == 0) {
        this.$message({
          message: "请选择要出仓的钢卷",
          type: "warning",
          showClose: true,
          center: true
        });
        return false;
      }
      // 判断收货仓库是否一致 不一致的不能出仓操作
      if (this.multipleSelection.length >= 2) {
        let RecDepo = this.multipleSelection[0].RecDepo;
        let isAgreement = this.multipleSelection.every(item => {
          return item.RecDepo == RecDepo;
        });
        if (!isAgreement) {
          this.$message({
            message: "出仓钢卷的收货仓库不一致！",
            type: "error",
            showClose: true,
            center: true
          });
          return false;
        }
      }
      // 提交全局store
      this.$store.commit("updateOutWarehouseList", {
        outWarehouseList: this.multipleSelection
      });
      // 路由跳转 "出仓单录入"
      this.$router.push({
        path: "WarehouseEntry"
      });
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
      this.pageStart = this.pageSize * (val - 1);
      this.pageEnd = this.pageSize * val - 1;
      this.tableData = this.goodsList.slice(this.pageStart, this.pageEnd);
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
.search-Box {
  padding: 1rem 2rem;
}
.form-item {
  display: inline-flex;
  margin-right: 3rem;
}
.table-top-status {
  display: inline-flex;
}
</style>