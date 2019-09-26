<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-14 09:30:21
 * @LastEditTime: 2019-09-15 16:05:08
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="page-wrap">
    <h1>销售合同汇总</h1>
    <div class="page-content">
      <!--搜索区-->
      <div class="page-search">
        <div class="page-search-item">
          <el-form :model="searchFrom">
            <div class="input-box">
              <el-form-item label="销售合同编号" prop="CID" class="form-item">
                <el-input v-model="searchFrom.CID" placeholder="请输入销售合同编号"></el-input>
              </el-form-item>
            </div>
            <div class="input-box">
              <el-form-item label="客户名称" prop="CustomerName" class="form-item">
                <el-input v-model="searchFrom.CustomerName" placeholder="请输入客户名称"></el-input>
              </el-form-item>
            </div>
            <div class="input-box">
              <el-form-item label="需方名称" prop="DemanderName" class="form-item">
                <el-input v-model="searchFrom.DemanderName" placeholder="请输需方名称"></el-input>
              </el-form-item>
            </div>
            <div class="input-box button-right">
              <el-form-item>
                <el-button type="primary" @click="searchHandle">查询</el-button>
              </el-form-item>
            </div>
            <div class="input-box">
              <el-form-item>
                <el-button type="primary" @click="createContractHandle">创建合同</el-button>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </div>
      <!--搜索区-->
      <!--表格顶部区域-->
      <div class="table-top-area">
        <div class="table-top-btns">
          <el-button size="mini" type="success" @click="viewEditorHandle">查看编辑</el-button>
          <el-button size="mini" type="primary" @click="examineHandle">审核</el-button>
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
        :data="tableData"
        border
        height="600"
        show-summary
        :summary-method="getSummaries"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column
          v-for="(item,index) in tableTitle"
          :key="index"
          sortable
          :prop="item.prop"
          :label="item.label"
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
// 导入接口API函数
import { getAllContractList, searchContractList } from "@/api/Contract";
export default {
  // 销售合同汇总
  name: "SalesContractSummary",
  data() {
    return {
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
          CETotalPrice:"",//合计金额
          CID: "0904",
          Demand: null,
          ExPrice: 0, //
          SignEndTime: null,
          SignTime: "2018-10-21 00:00:00",
          Supply: "新余中冶",
          Type: "销售"
        }
      ],
      // 页面顶部搜索区 数据模型
      searchFrom: {
        CID: "", // 销售合同编号id
        CustomerName: "", // 客户名称
        DemanderName: "" // 需方名称
      },
      tableTitle: [
        {
          prop: "CID", // 销售合同编号id
          label: "合同编号",
          width: ""
        },
        {
          prop: "Demand", // 客户名称
          label: "客户名称",
          width: ""
        },
        {
          prop: "CEFactroyName",
          label: "生产单位",
          width: ""
        },
        {
          prop: "CEName", // 产品名称
          label: "产品名称",
          width: ""
        },
        {
          prop: "CEBrand",
          label: "牌号"
        },
        {
          prop: "CEStandards",
          label: "规格"
        },
        {
          prop: "CETon",
          label: "数量(吨)"
        },
        {
          prop: "CEUnitPrice",
          label: "单价(元)"
        },
        {
          prop: "CETotalPrice", // 合计金额
          label: "合计金额(元)"
        },
        {
          prop: "Address", // 签订地址
          label: "签订地址"
        },
        {
          prop: "SignTime", // 签订时间
          label: "签订时间"
        },
        {
          prop: "ContractStatus", // 合同状态
          label: "合同状态"
        },
        {
          prop: "GInfo", // 备注
          label: "备注"
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
          if (item.CETon) {
            count += parseFloat(item.CETon);
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
  created() {
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
        } else if (index == 6 || index == 8) {
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
            if (index == 6) {
              sums[index] = sums[index].toFixed(3);
              sums[index] += " 吨";
            } else if (index == 8) {
              sums[index] += " 元";
            }
          }
        } else {
          sums[index] = "";
        }
      });

      return sums;
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
      // 路由跳转 到销售合同录入页面
      this.$router.push({
        name: "SalesContractEntry",
        query: {
          operation: "查看编辑"
        }
      });
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
      console.log(result);
      if (result.StatusCode == 200) {
        if(result.Result){
          this.goodsList = result.Result;
          // 销售合同筛选
          this.goodsList = this.goodsList.filter(item=>{
            return item.Type == "销售";
          })
          console.log(this.goodsList)
        }
        this.curList = this.curList.concat(this.goodsList);
        this.GoodsPaging(this.curList);
      }
    },
    // 多重条件刷选
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
    // 创建销售合同
    createContractHandle() {
      //路由跳转到 销售合同录入
      this.$router.push({
        path: "SalesContractEntry"
      });
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
      this.tableData = this.curList.slice(this.pageStart, this.pageEnd);
    },
    // 审核
    examineHandle() {
      console.log(this.multipleSelection);
      let len = this.multipleSelection.length;
      if (len == 0) {
        this.$message({
          message: "请选择要审核的合同",
          type: "warning",
          showClose: true,
          center: true
        });
        return false;
      }
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
.button-right {
  margin-right: 3rem;
}
.table-top-status {
  display: inline-flex;
}
</style>