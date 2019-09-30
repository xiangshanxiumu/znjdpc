<template>
  <div class="page-wrap">
    <h1>销售客户往来汇总表</h1>
    <div class="page-content">
      <!--搜索区-->
      <div class="page-search">
        <div class="page-search-item">
          <el-form :model="searchFrom">
            <div class="input-box">
              <el-form-item label="客户单位" prop="Unit" class="form-item">
                <el-autocomplete
                  v-model="searchFrom.Unit"
                  placeholder="请输入采购合同编号"
                  clearable
                  :fetch-suggestions="querySearchUnit"
                  class="input-width"
                ></el-autocomplete>
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
        <div class="table-top-btns">
          <el-button type="success" @click="viewDetailed">查看明细</el-button>
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
        ></el-table-column>
      </el-table>
      <!--表格-->
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
// 获取采购明细往来账API函数
import {getSalesExchange} from '@/api/WarehouseReceipt';
import { mapGetters } from "vuex";
export default {
  // 销售客户往来汇总表
  name: "SalesCustomerExchangeSummary",
  data() {
    return {
      tableData: [
        {
          UnitName: "", // 单位名称
          PacketDelTon: "23.1", // 包送吨位
          SelfMentionTon: "", // 自提吨位
          TotalPrice: "121275", // 总金额
          Payment: "", // 付款
          CustomerMargin: "", // 客户保证金
          PublicAccountCash: "", //公账现金
          Acceptance: "", // 承兑
          AccountsReceivable: "", // 应收账款
          InvoicedAmount: "", // 已开票金额
          UninvoicedAmount: "", // 未开票金额
          unPerformContract: "" // 未履行合同
        }
      ],
      tableTitle: [
        {
          prop: "Unit",
          label: "单位名称",
          width: "250",
          fixed: "",
          sortable: true
        },
        {
          prop: "TotalTon",
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
        }
      ],
      multipleSelection: null,
      // 页面顶部搜索区 数据模型
      searchFrom: {
        Unit: "",
        SID: "" // 仓单编号id
      },
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
    ...mapGetters(["UnitList"]),
    totalTon() {
      // 总吨位
      let count = 0;
      if (this.curList.length > 0) {
        this.curList.map(item => {
          count += parseFloat(item.TotalTon);
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
          if (item.TotalPrice) {
            money += parseFloat(item.TotalPrice);
          }
        });
        money = money.toFixed(3);
      }
      return money;
    }
  },
  created() {
    this.getList();
  },
  methods: {
    // 输入搜索
    querySearchUnit(queryString, cb) {
      console.log(queryString);
      let restaurants = this.UnitList;
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
    // 数据初始分页处理
    GoodsPaging(data) {
      if (
        data == undefined ||
        data == null ||
        data.length == 0 ||
        data == false
      )
        return false;
      this.pageStart = 0;
      this.pageEnd = 19;
      this.total = data.length; // 总钢卷数据条数
      this.tableData = data.slice(this.pageStart, this.pageEnd); // 截取数据
    },
    async getList() {
      let result = await getSalesExchange();
      if (result.StatusCode == 200) {
        if (result.Result) {
          this.goodsList = result.Result;
          // 按公司整理
          // Unit 提取单位信息
          let unit = [];
          this.goodsList.map(item => {
            if (item.Unit) {
              unit.push(item.Unit);
            }
            // 总金额 吨位*单价 计算出来
            item.TotalTon = Number(item.TotalTon.toFixed(3));
            item.TotalPrice =
              Number(item.TotalTon) * Number(item.UnitPrice);
            item.TotalPrice = Number(item.TotalPrice.toFixed(3));
          });
          // 公司去重
          let set = new Set(unit);
          let unitArr = Array.from(set);
          let UnitArr = [];
          unitArr.forEach(item=>{
            UnitArr.push({Unit:item})
          })
          // 去重的单位遍历 累加计算 公司的吨位 和公司的总金额
          UnitArr.map(item=>{
            item.TotalTon = 0;
            item.TotalPrice = 0;
            this.goodsList.forEach(item2=>{
              if(item.Unit == item2.Unit){
                item.TotalTon += item2.TotalTon;
                item.TotalPrice += item2.TotalPrice;
              }
            })
          })
          // 合同其他参数
          this.goodsList = [].concat(UnitArr);
          this.goodsList.map(item=>{
            item.TotalTon = item.TotalTon.toFixed(3);
            item.TotalPrice = item.TotalPrice.toFixed(3);
          })
        }
        this.curList = [].concat(this.goodsList);
        this.GoodsPaging(this.curList);
      }
    },
    // 
    viewDetailed(){
      if (this.multipleSelection.length == 0) {
        this.$message({
          message: "请选择要查看的客户单位",
          type: "warning",
          showClose: true,
          center: true
        });
        return false;
      }else if(this.multipleSelection.length >= 2){
        this.$message({
          message: "只能同时查看一个客户单位明细",
          type: "warning",
          showClose: true,
          center: true
        });
        return false;
      } else {
        // 查看单位
        let Unit = this.multipleSelection[0].Unit;
        // 提交store 
        this.$store.commit('updateviewExchangeDetailed',{"viewExchangeDetailed":this.multipleSelection});
        // 路由跳转
        this.$router.push({
          name:"PurchaseCustomerExchangeAccount",
          query:{
            Unit:Unit
          }
        })
      }
    },
    // 多重条件筛选
    getSearchData(obj, arr) {
      if (arr == undefined || arr == null || arr.length == 0) return false;
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
        if (this.searchFrom[k] != null) {
          this.searchFrom[k] = this.searchFrom[k].trim();
        }
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
        this.$loadingShow("搜索中"); // 开启全局loading
        // this.tableLoading = true;
        let list = this.getSearchData(this.searchFrom, this.goodsList);
        this.curList = list;
        this.GoodsPaging(this.curList);
        this.$loadingHide(); // 关闭全局loading
        // this.tableLoading = false;
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
.input-width {
  width: 18rem;
}
</style>