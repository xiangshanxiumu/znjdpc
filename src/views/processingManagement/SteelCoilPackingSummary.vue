<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-14 09:30:21
 * @LastEditTime: 2019-09-15 16:05:08
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="page-wrap">
    <h1>委外加工钢卷打包汇总表</h1>
    <div class="page-content">
      <!--搜索区-->
      <div class="page-search">
        <div class="page-search-item">
          <el-form :model="searchFrom">
            <div class="input-box">
              <el-form-item label="卷包号" prop="RPID" class="form-item">
                <el-autocomplete v-model="searchFrom.RPID" placeholder="请输入卷包号" class="input-width" clearable :fetch-suggestions="querySearchRPID"></el-autocomplete>
              </el-form-item>
            </div>
            <!-- <div class="input-box">
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
            </div> -->
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
        <div class="table-top-btns">
          <el-button type="danger" @click="outStoreHandle">出仓</el-button>
        </div>
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
        v-loading="tableLoading"
        :data="tableData"
        border
        show-summary
        height="600"
        :summary-method="getSummaries"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="50" align="center"></el-table-column>
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
import { getRollPackList } from "@/api/RollPack";
import {mapGetters} from "vuex";
export default {
  // 委外加工钢卷打包汇总表
  name: "SteelCoilPackingSummary",
  data() {
    return {
      tableLoading: false, // table loading
      tableData: [
        {
          Address: null,
          CEBrand: "50ZW350",
          CEFactroyName: "中冶",
          CEInfo: "出厂价+23元短运费",
          CEName: "冷轧无取向硅钢卷",
          CEPath: null,
          CEStandards: "0.5*1200*C",
          CETon: 33, // 吨位
          CEUnitPrice: 5773, // 单价
          CID: "0904",
          Demand: null,
          ExPrice: 0, //
          SignEndTime: null,
          SignTime: "2018-10-21 00:00:00",
          Supply: "新余中冶",
          Type: "采购"
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
          prop: "RPID", // 卷包号id
          label: "卷包号",
          width: ""
        },
        {
          prop: "PackTon",
          label: "打包吨位",
          width: "120"
        },
        {
          prop: "UnPackTon",
          label: "未打包吨位",
          width: "120"
        },
        {
          prop: "ProRollNo",
          label: "涉及小卷号",
          width: ""
        },
        {
          prop: "BrandList",
          label: "涉及牌号",
          width: ""
        },
        {
          prop: "SteelRollIDList",
          label: "涉及钢卷号",
          width: ""
        },
        {
          prop: "StandardsList", 
          label: "涉及规格",
          width: ""
        },
        {
          prop: "Storename", 
          label: "涉及仓库",
          width: ""
        },
        {
          prop: "RPIDStatus", 
          label: "状态",
          width: ""
        },
      ],
      currentPage: 1, //当前页index
      pageIndex: 1, // 页码
      pageSize: 20, // 单次页面展示页面数据条数据
      pageStart: 0, // 起始数据条数
      pageEnd: 20, // 结束数据条数
      total: 10, // 总数据条数
      goodsList: [], // 总钢卷列表数据
      curList: [], // 搜索操作后的列表数据
      multipleSelection: [] // 表格勾选内容数组
    };
  },
  computed: {
    ...mapGetters(["RPIDList"]),
    totalTon() {
      // 总吨位
      let count = 0;
      if (this.curList.length > 0) {
        this.curList.map(item => {
          if (item.PackTon) {
            count += parseFloat(item.PackTon);
          }
        });
        count = count.toFixed(3);
      }
      return count;
    },
    // 总金额
    totalMoney() {
      let money = 0;
      if (this.curList.length > 0) {
        this.curList.map(item => {
          if (item.CETotalPrice) {
            money += parseFloat(item.CETotalPrice);
          }
        });
        money = money.toFixed(3);
      }
      return money;
    }
  },
  mounted() {
    // 初始获取列表数据
    this.getList();
  },
  methods: {
    // 卷包号 输入检索
    querySearchRPID(queryString, cb) {
      let restaurants = this.RPIDList;
      let results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
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
    // 表格勾选事件
    handleSelectionChange(val) {
      // 勾选内容
      this.multipleSelection = val;
    },
    // 查看编辑 路由跳转到采购合同录入页面
    viewEditorHandle() {
      let len = this.multipleSelection.length;
      if (len == 0) {
        this.$message({
          message: "请选择要查看编辑的合同",
          type: "warning",
          showClose: true,
          center: true
        });
        return false;
      }
      if (len >= 2) {
        // 当选择两个及以上时 判断合同编号是否一致
        let CID = this.multipleSelection[0].CID; // 合同编号
        let isAgreement = this.multipleSelection.every(item => {
          return item.CID == CID;
        });
        if (!isAgreement) {
          this.$message({
            message: "选择编辑的合同编号不一致",
            type: "error",
            showClose: true,
            center: true
          });
          return false;
        }
      }
      let CID = this.multipleSelection[0].CID; // 合同编号
      // 把同一个 CID仓单下的数据过滤出来
      let viewEditorContract = this.goodsList.filter(item => {
        return item.CID == CID;
      });
      // 提交store
      this.$store.commit("updateViewEditorContract", {
        viewEditorContract: viewEditorContract
      });
      // 路由跳转 到采购合同录入页面
      this.$router.push({
        name: "ProcurementContractEntry",
        query: {
          operation: "查看编辑"
        }
      });
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
      let result = await getRollPackList();
      if (result.StatusCode == 200) {
        if (result.Result) {
          this.goodsList = result.Result;
          // 计算总金额
          // this.goodsList.map(item => {
          //   item.CETotalPrice = Number(item.CEUnitPrice) * Number(item.CETon);
          // });
          // 数字保留小数后三位 以及 计算添加 RPIDStatus
          this.goodsList.map(item=>{
            item.PackTon = item.PackTon.toFixed(3);
            item.UnPackTon = item.UnPackTon.toFixed(3);
            // OutsID
            if(item.OutsID){
              item.RPIDStatus = "已经出仓"
            }else{
              item.RPIDStatus = "未出仓"
            }
          });
          // 提交store
          this.$store.commit('updateAllRollPackList',{"AllRollPackList":this.goodsList});
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
      for (let k in this.searchFrom) {
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
        this.$loadingShow("搜索中"); // 开启全局loading
        // 从缓存中计算搜索数据 无需再请求API
        // this.tableLoading = true;
        let list = this.getSearchData(this.searchFrom, this.goodsList);
        this.curList = list;
        this.GoodsPaging(this.curList);
        // this.tableLoading = false; // 关闭加载动画
        this.$loadingHide(); // 关闭全局loading
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
    // 出库出仓操作 路由跳转到 "出仓单录入"
    outStoreHandle() {
      // 判断是否有勾选要出仓加工的钢卷
      if (this.multipleSelection.length == 0) {
        this.$message({
          message: "请选择要出仓的钢条卷包",
          type: "warning",
          showClose: true,
          center: true
        });
        return false;
      }
      // 判断收货仓库是否一致 不一致的不能出仓操作
      if (this.multipleSelection.length >= 1) {
        // let RPID = this.multipleSelection[0].RPID;
        // let isAgreement = this.multipleSelection.every(item => {
        //   return item.RPID == RPID;
        // });
        // if (!isAgreement) {
        //   this.$message({
        //     message: "出仓的钢条卷包不一致！",
        //     type: "error",
        //     showClose: true,
        //     center: true
        //   });
        //   return false;
        // }
        // 判断是否出仓过
        let isOut = this.multipleSelection.some(item=>{
          return item.RPIDStatus == "已经出仓"
        })
        if(isOut){
          this.$message({
            message: "该卷包已经出仓过！",
            type: "error",
            showClose: true,
            center: true
          });
          return false;
        }
      }
      // 提交全局store
      this.$store.commit("updateRollPackList", {
        RollPackList: this.multipleSelection
      });
      // 路由跳转 "卷包出仓单录入"
      this.$router.push({
        path: "RollPackWarehouseEntry"
      });
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
.input-width{
  width:25rem;
}
</style>