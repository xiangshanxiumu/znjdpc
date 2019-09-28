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
          :type="item.order2"
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
// 导入获取 所有加工单 API函数
import { getAllProStoreList } from "@/api/WarehouseReceipt";
export default {
  // 钢条小卷 重新打包
  name: "SteelCoilPacking",
  data() {
    return {
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
          Brand: "牌号", // 牌号
          Standards: "规格", // 规格
          Ton: 10, //吨位
          Striping: [
            {
              StripingId: "1001", // 分小条钢卷 Id
              Standards: "如0.5*30mm", // 分小条钢卷规格
              RollPackNo: "" // 所属卷包号
            }
          ]
        },
        {
          ParentID: "112", //父钢卷号
          Brand: "", // 牌号
          Standards: "", // 规格
          Ton: 15 //吨位
        },
        {
          ParentID: "113", //父钢卷号
          Brand: "", // 牌号
          Standards: "", // 规格
          Ton: 13 //吨位
        }
      ],
      checkedList: [], // 钢卷小条勾选列表
      packingList: [], // 综合打包数据列表

      packData: [], // 打包小卷表格数据
      packList: [
        // 卷包数据列表
        {
          title: [
            {
              prop: "RollPackNo",
              label: "卷包号",
              width: "240",
              fixed: ""
            },
            {
              prop: "CoilID",
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
          prop: "RollPackNo",
          label: "卷包号",
          width: "240",
          fixed: ""
        },
        {
          prop: "CoilID",
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
    this.getProStoreList();
  },
  methods: {
    // 获取加工单列表数据
    async getProStoreList() {
      let result = await getAllProStoreList();
      let ProStoreList;
      if (result) {
        ProStoreList = result.Result;
        ProStoreList = ProStoreList.filter(item => {
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
            CoilID: `${order1}-${label}-${i + 1}`,
            order1: order1,
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
        this.packData.push(obj);
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
        if (rowIndex % 8 === 0) {
          // 行 index
          return {
            rowspan: 8,
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
      let nowTime = now.toLocaleString()
      let date = now.toLocaleDateString();
      // let date = nowTime.substring(0,9);//截取日期
      let time = now.getTime();
      // let time = nowTime.substring(12,20); //截取时间 getTime()

      let curTime = date+"-"+time;
      packArr.map(item=>{
        item.RollPackNo = item.SteelRollID+'-'+curTime;
      })
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
        title:packTtitle,
        pack:[]
      }
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
    submitForm() {
      console.log(this.packList);
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