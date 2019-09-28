<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-28 08:56:41
 * @LastEditTime: 2019-09-28 11:44:18
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
          align="center"
        >
          <template slot-scope="scope">
            <el-checkbox-button
              v-if="item.isCheck"
              size="medium"
              :key="index"
              v-model="scope.checked"
              :checked="item.checked"
              :disabled="item.disabled"
              @change="checkBoxChange(scope,item)"
            >顺序{{index+1}}</el-checkbox-button>
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
      <div>
        <el-table :data="packData" border max-width="99%">
          <el-table-column
            v-for="(item,index) in packTableTitle"
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

      <!--打包情况表-->
      <!--表格-->
      <!-- <DragTable :data="tableData" :header="tableHeader" :option="tableOption">
        <el-table-column slot="fixed" fixed prop="date" label="日期" width="150"></el-table-column>
      </DragTable>-->
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
      // 打包小卷表格title
      packTableTitle: [
        {
          prop: "",
          label: "小卷编号",
          width: "120",
          fixed: ""
        },
        {
          prop: "",
          label: "规格(厚*宽/单位mm)",
          width: "180",
          fixed: ""
        },
        {
          prop: "",
          label: "加工顺序",
          width: "120",
          fixed: ""
        },
        {
          prop: "",
          label: "吨数",
          width: "120",
          fixed: ""
        },
        {
          prop: "",
          label: "所属钢卷",
          width: "",
          fixed: "",
          children: [
            {
              prop: "",
              label: "牌号",
              width: "",
              fixed: ""
            },
            {
              prop: "",
              label: "规格(厚*宽/单位mm)",
              width: "",
              fixed: ""
            },
            {
              prop: "",
              label: "钢卷号",
              width: "",
              fixed: ""
            },
            {
              prop: "",
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
        //
        console.log(ProStoreList);
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
              Num: arr2[1]
            });
          }
        });
      }
      StripArr.map(obj => {
        let Num = Number(obj.Num);
        let label = obj.label;
        let CoilID = obj.CoilID;
        for (let i = 0; i < Num; i++) {
          titleArr.push({
            prop: label,
            label: label,
            CoilID: `${label}C${i + 1}`,
            width: "100",
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
    // 钢卷打包
    coilpacking() {
      console.log(this.packData)
      // 打包后的钢条小卷 禁用
      let tabel = $("#Table");
      let checkBoxs = $("#Table").find("input:checked");
      checkBoxs.each(function() {
        $(this).attr("disabled", true);
        $(this)
          .parent()
          .addClass("is-disabled is-checked");
        $(this)
          .siblings()
          .css({
            "background-color": "#ccc",
            "border-color": "#EBEEF5",
            color: "#000"
          });
      });
      let arr = [].concat(this.checkedList);
      let item = { packing: arr };
      this.packingList.push(item);
      this.checkedList = []; // 重置清空
    },
    // 重置 checkBox
    resetCheckBox() {
      this.packingList = [];
      this.packData = [];
      // checkBox 去disabled
      let checkBoxs = $("#Table").find("input:checked");
      checkBoxs.each(function() {
        $(this).attr("disabled", false);
        $(this)
          .parent()
          .removeClass("is-disabled is-checked");
        $(this)
          .siblings()
          .css({
            "background-color": "#fff",
            "border-color": "#DCDFE6",
            color: "#000"
          });
      });
    },
    // checkBoxButton 勾选点击事件
    checkBoxChange(scope, item) {
      console.log(scope, item)
      let rowIndex = scope.$index;
      let isChecked = scope.checked;
      console.log(rowIndex,isChecked)
      // 勾选情况下 添加到数据列表
      if (isChecked) {
        let CoilID = scope.column.columnKey; // 小卷id
        let prop = scope.column.property; // 规格参数
        let SteelRollID = scope.row.SteelRollID; // 父卷id
        let Standards = item.label;
        let obj = {
          CoilID: CoilID,
          SteelRollID: SteelRollID,
          prop: prop,
          Standards: Standards
        };
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
    submitForm(){
      console.log(this.packData)
    }
  }
};
</script>
<style>
</style>