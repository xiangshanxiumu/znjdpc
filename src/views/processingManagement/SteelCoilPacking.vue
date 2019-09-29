<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-28 08:56:41
 * @LastEditTime: 2019-09-28 19:37:25
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="page-wrap">
    <h1>钢条小卷打包</h1>
    <div class="page-content">
      <!--表格顶部区域-->
      <div class="table-top-area">
        <div class="table-top-btns">
          <el-button type="primary" @click="coilpacking">打包</el-button>
          <el-button type="danger" @click="resetCheckBox">重置</el-button>
        </div>
        <div class="table-top-status"></div>
      </div>
      <!--表格顶部区域-->
      <!--表格-->
      <el-table :data="ISGoods" border @cell-click="cellClick" id="Table" max-width="99%">
        <el-table-column prop="Brand" label="牌号" width="120" align="center" fixed="left"></el-table-column>
        <el-table-column
          prop="Standards"
          label="规格(厚*宽/单位mm)"
          align="center"
          width="180"
          fixed="left"
        ></el-table-column>
        <el-table-column prop="SteelRollID" label="钢卷号" width="120" align="center" fixed="left"></el-table-column>
        <el-table-column prop="Ton" label="吨数" width="120" align="center" fixed="left"></el-table-column>
        <el-table-column
          v-for="(item,index) in tableTitle"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :fixed="item.fixed"
          :column-key="item.CoilID"
          :type="item.order1"
          align="center"
        >
          <template slot-scope="scope">
            <el-checkbox
              v-if="item.isCheck"
              size="medium"
              :key="index"
              v-model="scope.checked"
              :checked="item.checked"
              :disabled="item.disabled"
              border
              @change="checkBoxChange(scope,item)"
            >顺序{{index+1}}</el-checkbox>
            <!-- <el-input
              v-if="item.input"
              size="small"
              v-model="scope.row.prop"
              placeholder="请输入内容"
              @change="handleEdit(scope.$index, scope.row)"
            ></el-input>
            <span>{{scope.row}}</span>-->
          </template>
        </el-table-column>
      </el-table>
      <h2>打包情况</h2>
      <!--打包情况表-->
      <div class="packTable-wrap" id="packTable">
        <div class="packTable-item" v-for="(tableItem,index) in packList" :key="index">
          <el-table
            :data="tableItem.pack"
            :span-method="rowSpanMethod"
            border
            show-summary
            :summary-method="getSummaries"
            max-width="99%"
          >
            <el-table-column
              v-for="(item,index) in tableItem.title"
              :key="index"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              :fixed="item.fixed"
              :column-key="item.CoilID"
              align="center"
            >
              <template v-if="item.children">
                <el-table-column
                  v-for="(item,index) in item.children"
                  :key="index"
                  :prop="item.prop"
                  :label="item.label"
                  :width="item.width"
                  :fixed="item.fixed"
                  :column-key="item.CoilID"
                  align="center"
                ></el-table-column>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <!--打包情况表-->
      <!--按钮区-->
      <div class="footer-btns">
        <el-button @click="backHandle">返回</el-button>
        <el-button type="primary" @click="submitForm">提交</el-button>
      </div>
      <!--按钮区-->
    </div>
  </div>
</template>
<script>
// 导入Sortable 表格拖拽
// import Sortable from "sortablejs";
// 导入 添加卷包 API函数
import { addRollPack } from "@/api/RollPack";
import { mapGetters } from "vuex";
export default {
  // 钢条小卷 重新打包
  name: "SteelCoilPacking",
  data() {
    return {
      totalTon: 0, // 总吨位
      tableTitle: [
        // {
        //   CoilID: "101", // 钢卷id
        //   prop: "TwentyMM1",
        //   label: "20mm",
        //   width: "",
        //   fixed: "",
        //   isCheck: true, // 是否渲染显示 checkBox
        //   checked: false, // 是否勾选
        //   disabled: false, // 是否禁用操作
        //   input: false
        // }
      ],
      ISGoods: [
        // SteelCoil:
        {
          GoodsID: "111", //父钢卷号
          Brand: "", // 牌号
          Standards: "", // 规格
          Ton: 0, //吨位
          Striping: [
            {
              StripingId: "1001", // 分小条钢卷 Id
              Standards: "如0.5*30mm", // 分小条钢卷规格
              RollPackNo: "" // 所属卷包号
            }
          ]
        }
        // {
        //   ParentID: "112", //父钢卷号
        //   Brand: "", // 牌号
        //   Standards: "", // 规格
        //   Ton: 15 //吨位
        // },
        // {
        //   ParentID: "113", //父钢卷号
        //   Brand: "", // 牌号
        //   Standards: "", // 规格
        //   Ton: 13 //吨位
        // }
      ],
      checkedList: [], // 钢卷小条勾选列表
      packingList: [], // 综合打包数据列表

      packData: [], // 打包小卷表格数据
      packList: [
        // 卷包数据列表
        {
          title: [
            {
              prop: "RPID",
              label: "卷包号",
              width: "240",
              fixed: ""
            },
            {
              prop: "RollPackNo",
              label: "小卷编号",
              width: "180",
              fixed: ""
            },
            {
              prop: "CoilStandards",
              label: "规格(厚*宽/单位mm)",
              width: "180",
              fixed: ""
            },
            {
              prop: "CoilOrder",
              label: "加工顺序",
              width: "120",
              fixed: ""
            },
            {
              prop: "CoilTon",
              label: "吨数",
              width: "120",
              fixed: ""
            },
            {
              prop: "BelongSteelRoll",
              label: "所属钢卷",
              width: "",
              fixed: "",
              children: [
                {
                  prop: "Brand",
                  label: "牌号",
                  width: "",
                  fixed: ""
                },
                {
                  prop: "Standards",
                  label: "规格(厚*宽/单位mm)",
                  width: "",
                  fixed: ""
                },
                {
                  prop: "SteelRollID",
                  label: "钢卷号",
                  width: "",
                  fixed: ""
                },
                {
                  prop: "Ton",
                  label: "吨数",
                  width: "",
                  fixed: ""
                }
              ]
            }
          ], // packTableTitle
          pack: [] // packTabeData
        }
      ], // 打包后 的卷包列表
      // 打包小卷表格title
      packTableTitle: [
        {
          prop: "RPID",
          label: "卷包号",
          width: "240",
          fixed: ""
        },
        {
          prop: "RollPackNo",
          label: "小卷编号",
          width: "180",
          fixed: ""
        },
        {
          prop: "CoilStandards",
          label: "规格(厚*宽/单位mm)",
          width: "180",
          fixed: ""
        },
        {
          prop: "CoilOrder",
          label: "加工顺序",
          width: "120",
          fixed: ""
        },
        {
          prop: "CoilTon",
          label: "吨数",
          width: "120",
          fixed: ""
        },
        {
          prop: "BelongSteelRoll",
          label: "所属钢卷",
          width: "",
          fixed: "",
          children: [
            {
              prop: "Brand",
              label: "牌号",
              width: "",
              fixed: ""
            },
            {
              prop: "Standards",
              label: "规格(厚*宽/单位mm)",
              width: "",
              fixed: ""
            },
            {
              prop: "SteelRollID",
              label: "钢卷号",
              width: "",
              fixed: ""
            },
            {
              prop: "Ton",
              label: "吨数",
              width: "",
              fixed: ""
            }
          ]
        }
      ]
    };
  },
  computed: {
    // 要分条加工的钢卷
    ...mapGetters(["steelCoilMachiningList"])
  },
  created() {
    this.ISGoods.map(item1 => {
      this.tableTitle.map((item2, index) => {
        for (let k in item2) {
          if (k == "prop") {
            item1[item2.prop] = false;
          }
        }
      });
    });
    // 初始渲染要打包的小条表格
    this.renderTable();
  },
  methods: {
    // 初始渲染要打包的小条表格
    renderTable() {
      console.log(this.steelCoilMachiningList);
      // 计算总吨位
      this.steelCoilMachiningList.map(item => {
        this.totalTon += Number(item.Ton);
      });
      if (this.steelCoilMachiningList.length == 0) {
        return false;
      }
      if (this.steelCoilMachiningList.length > 0) {
        let ProStoreList = this.steelCoilMachiningList.filter(item => {
          return item.SeparateSolution;
        });
        this.ISGoods = ProStoreList;
        if (ProStoreList.length > 0) {
          let SteelRollID = ProStoreList[0].SteelRollID;
          let result = this.StripToJSONArr(ProStoreList);
          // 结构赋值
          let { StripArr, titleArr } = result;
          this.tableTitle = titleArr;
        }
      }
    },
    // 字符串分条转 JSON函数
    StripToJSONArr(ProStoreList) {
      if (ProStoreList == undefined || ProStoreList == null) return false;
      let SteelRollID = ProStoreList[0].SteelRollID;
      let SeparateSolution = ProStoreList[0].SeparateSolution;
      let arr1 = SeparateSolution.split("/");
      let arr2 = [];
      let StripArr = [];
      let titleArr = [];
      if (arr1.length > 0) {
        arr1.map((item1, index) => {
          if (item1) {
            arr2 = item1.split("*");
            StripArr.push({
              prop: arr2[0],
              label: arr2[0],
              Num: arr2[1],
              order1: index + 1
            });
          }
        });
      }
      StripArr.map(obj => {
        let Num = Number(obj.Num);
        let label = obj.label;
        let CoilID = obj.CoilID;
        let order1 = obj.order1;
        for (let i = 0; i < Num; i++) {
          titleArr.push({
            prop: label,
            label: label,
            CoilID: `${label}-${order1}`, //`${order1}-${label}-${i + 1}`,
            order1: `${order1}C`,
            order2: `${i + 1}-order`,
            width: "120",
            fixed: "",
            isCheck: true, // 是否渲染显示 checkBox
            checked: false, // 是否勾选
            disabled: false, // 是否禁用操作
            input: false
          });
        }
      });
      return { StripArr, titleArr };
    },
    // 表单合计自定义统计计算方法
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        } else if (index == 4 || index == 8) {
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
            sums[index] = sums[index].toFixed(3);
            sums[index] += " 吨";
          }
        } else {
          sums[index] = "";
        }
      });
      return sums;
    },
    // checkBoxButton 勾选点击事件
    checkBoxChange(scope, item) {
      let rowIndex = scope.$index;
      let isChecked = scope.checked;
      // 勾选情况下 添加到数据列表
      if (isChecked) {
        let CoilID = scope.column.columnKey; // 小卷id
        let prop = scope.column.property; // 规格参数
        let CoilOrder = parseInt(scope.column.type); // 排序
        let SteelRollID = scope.row.SteelRollID; // 父卷id

        let CoilStandards = item.label;
        let stripWidth = parseInt(scope.row.Standards.split("*")[1]);
        let CoilWidth = parseInt(prop);
        let CoilTon = ((CoilWidth / stripWidth) * scope.row.Ton).toFixed(3);
        let obj = {
          CoilID: `${SteelRollID}-${CoilID}`,
          prop: prop,
          CoilStandards: CoilStandards,
          CoilOrder: CoilOrder,
          CoilTon: CoilTon
        };
        Object.assign(obj, scope.row);
        this.packData.push(obj); // 卷包数据
        this.checkedList.push(obj);
      } else {
        // 去掉勾选点击情况下 从数据列表中清除
        let CoilID = scope.column.columnKey;
        this.checkedList = this.checkedList.filter(item => {
          return item.CoilID != CoilID;
        });
        this.packData = this.packData.filter(item => {
          return item.CoilID != CoilID;
        });
      }
    },
    // set disabled and style 勾选打包后 设置只读及样式
    setDisabledAndStyle(ele) {
      $(ele).attr("disabled", true);
      // $(ele).siblings().addClass("isPack");
      $(ele)
        .parent()
        .addClass("is-disabled is-checked");
      $(ele)
        .parent()
        .siblings()
        .css({ color: "red" });
      $(ele)
        .parent()
        .parent()
        .removeClass("is-checked");
      $(ele)
        .parent()
        .parent()
        .addClass("isPack");
    },
    // remove disabled and style 重置后 去掉只读及样式
    removeDisabledAndStyle(ele) {
      $(ele).attr("disabled", false);
      // $(ele).siblings().removeClass("isPack");
      $(ele)
        .parent()
        .removeClass("is-disabled is-checked");
      $(ele)
        .parent()
        .siblings()
        .css({ color: "#606266" });
      $(ele)
        .parent()
        .parent()
        .removeClass("isPack");
    },
    rowSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        // 第一列
        if (rowIndex % 50 === 0) {
          // 行 index
          return {
            rowspan: 50,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },
    // 钢卷打包
    coilpacking() {
      let packArr = [].concat(this.packData);
      let packTtitle = [].concat(this.packTableTitle);
      // 生成卷包号
      let now = new Date();
      let nowTime = now.toLocaleString();
      let date = now.toLocaleDateString();
      let time = now.getTime();
      let curTime = date + "-" + time;
      packArr.map(item => {
        item.RPID = item.SID + "-" + curTime; // 卷包号
        item.RollPackNo = item.CoilID; // 加工分条号
        item.BrandList = [].push(item.Brand); //涉及牌号
        item.StandardsList = [].push(item.Standards); // 涉及加工规格
        item.Storename = item.StoreName; // 加工厂仓库
        item.PackTon = 0;
        item.PackTon += Number(item.CoilTon); // 已打包吨位
        item.UnPackTon = 0; // 未打包吨位 ?
        item.SteelRollIDList = [].push(item.SteelRollID); // 设计钢卷号
      });
      if (this.packList.length <= 1) {
        if (this.packList[0].pack.length == 0) {
          this.packList[0].pack = packArr;
        } else {
          let tableItem = {
            title: packTtitle,
            pack: packArr
          };
          this.packList.push(tableItem);
        }
      } else {
        let tableItem = {
          title: packTtitle,
          pack: packArr
        };
        this.packList.push(tableItem);
      }
      this.packData = []; // 重置清空
      // 打包后的钢条小卷 禁用
      let tabel = $("#Table");
      let checkBoxs = $("#Table").find("input:checked");
      let _this = this;
      checkBoxs.each(function() {
        let ele = this;
        _this.setDisabledAndStyle(ele);
      });
      // let arr = [].concat(this.checkedList);
      // let item = { packing: arr };
      // this.packingList.push(item);
      // this.checkedList = []; // 重置清空
      // 卷包数据列表
    },
    // 重置 checkBox 去掉disable 及样式
    resetCheckBox() {
      this.packData = [];
      this.packList = [];
      let packTtitle = [].concat(this.packTableTitle);
      let tableItem = {
        title: packTtitle,
        pack: []
      };
      this.packList.push(tableItem);
      // checkBox 去disabled
      let checkBoxs = $("#Table").find("input:checked");
      let _this = this;
      checkBoxs.each(function() {
        let ele = this;
        _this.removeDisabledAndStyle(ele);
      });
    },
    // 某小格cell点击事件
    cellClick(row, column, cell, event) {
      // console.log(cell);
      // console.log($(cell).find('input'));
      // $(cell).find('input').attr("disabled",true);
    },
    // 返回按钮
    backHandle() {
      this.$router.go(-1);
    },
    // 提交
    async submitForm() {
      if (this.packList.length == 0) {
        this.$message({
          message: "请先选择加工后的钢卷小条打包后再提交",
          type: "warning",
          showClose: true,
          center: true
        });
      } else {
        if (this.packList[0].pack.length == 0) {
          this.$message({
            message: "请先选择加工后的钢卷小条打包后再提交",
            type: "warning",
            showClose: true,
            center: true
          });
          return false;
        }
        // 卷包数据处理
        let PackData = [];
        this.packList.map(item => {
          let packItem = {
            RPID: "",
            ProRollNo: "",
            BrandList: "",
            StandardsList: "",
            Storename: "",
            PackTon: 0,
            UnPackTon: 0,
            SteelRollIDList: ""
          };
          if (item.pack && item.pack.length > 0) {
            item.pack.map(item2 => {
              packItem.RPID = item2.RPID; // 卷包号
              packItem.ProRollNo += item2.CoilID + "/"; // 加工分条号 小卷号
              packItem.BrandList += item2.Brand + "/"; //涉及牌号
              packItem.StandardsList += item2.Standards + "/"; // 涉及加工规格
              packItem.Storename += item2.StoreName + "/"; // 加工厂仓库
              packItem.PackTon += Number(item2.CoilTon); // 已打包吨位
              packItem.UnPackTon = 0; // 总未打包吨位 ?
              packItem.SteelRollIDList += item2.SteelRollID + "/"; // 设计钢卷号
            });
          }
          PackData.push(packItem);
        });
        console.log("222", PackData);
        // 计算剩余吨位
        let useTon = 0;
        PackData.map(item => {
          useTon += Number(item.PackTon);
        });
        // 总未打包吨位
        let UnPackTon = this.totalTon - useTon;
        PackData.map(item => {
          item.UnPackTon = UnPackTon;
        });
        let result = await addRollPack(PackData);
        console.log(result);
        if (result) {
          if (result.StatusCode == 200) {
            setTimeout(() => {
              this.$alert("录入成功", "加工打包录入", {
                confirmButtonText: "确定",
                type: "success",
                // center: true,
                callback: action => {
                  this.$message({
                    type: "success",
                    message: `加工打包录入成功`
                  });
                  // 返回上一页面 或返回委外加工单汇总表
                  this.$router.push({
                    path: "SteelCoilPackingSummary"
                  });
                }
              });
            }, 1000);
          } else {
            this.$message({
              type: "info",
              message: result.Message
            });
          }
        }
      }
    }
  }
};
</script>
<style scoped>
.isPack {
  background-color: rgb(229, 175, 175);
  border-color: red;
  color: red;
}
</style>