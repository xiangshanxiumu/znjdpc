<template>
  <div class="page-wrap">
    <h1>仓储客户往来汇总表</h1>
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
import { mapGetters } from "vuex";
export default {
  // 仓储客户往来汇总表
  name: "WarehouseCustomerExchangeSummary",
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
      multipleSelection: null,
      // 页面顶部搜索区 数据模型
      searchFrom: {
        Unit:"",
        CID: "", // 合同编号id
        SID: "", // 仓单编号id
        SteelRollID: "", // 钢卷号id
        Buyby: "", // 采购单位
        RecDepo: "", //收货仓库 接收仓库
        RecDate: "" // 仓单日期 接收日期
      },
    };
  },
  computed:{
    ...mapGetters(["UnitList"]),
    totalTon() {
      // 总吨位
      let count = 0;
      if (this.tableData.length > 0) {
        this.tableData.map(item => {
          count += parseFloat(item.PacketDelTon);
        });
        count = count.toFixed(3);
      }
      return count;
    },
  },
  methods: {
  // 输入搜索
    querySearchUnit(queryString, cb) {
      console.log(queryString,)
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
      console.log(data)
      if(data == undefined || data==null || data.length==0 || data==false) return false;
      this.pageStart = 0;
      this.pageEnd = 19;
      this.total = data.length; // 总钢卷数据条数
      this.tableData = data.slice(this.pageStart, this.pageEnd); // 截取数据
    },
    // 多重条件筛选
    getSearchData(obj, arr) {
      if(arr == undefined || arr==null || arr.length==0) return false;
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
        if(this.searchFrom[k]!=null){
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
      console.log(val);
      // 勾选内容
      this.multipleSelection = val;
    },
  },
    
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
.input-width{
  width:18rem;
}
</style>