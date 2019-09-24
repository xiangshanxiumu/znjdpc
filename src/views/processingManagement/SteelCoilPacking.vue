<template>
  <div class="page-wrap">
    <h1>钢条小卷打包</h1>
    <div class="page-content">
      <!--表格顶部区域-->
      <div class="table-top-area">
        <div class="table-top-btns">
          <el-button size="mini" type="primary" @click="coilpacking">打包</el-button>
          <el-button size="mini" type="danger" @click="resetCheckBox">重置</el-button>
        </div>
        <div class="table-top-status"></div>
      </div>
      <!--表格顶部区域-->
      <!--表格-->
      <el-table
        :data="ISGoods"
        border
        @cell-click="cellClick"
        id="Table"
      >
        <el-table-column prop="Brand" label="牌号" width="120" align="center" fixed="left"></el-table-column>
        <el-table-column
          prop="Standards"
          label="规格(厚*宽/单位mm)"
          align="center"
          width="180"
          fixed="left"
        ></el-table-column>
        <el-table-column prop="Id" label="钢卷号" width="120" align="center" fixed="left"></el-table-column>
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
            <el-checkbox
              v-if="item.isCheck"
              size="medium"
              :key="index"
              v-model="scope.checked"
              :checked="item.checked"
              :disabled="item.disabled"
              @change="checkBoxChange(scope,item)"
            ></el-checkbox>
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
      <!--表格-->
    </div>
  </div>
</template>
<script>
export default {
  // 钢条小卷 重新打包
  name: "SteelCoilPacking",
  data() {
    return {
      tableTitle: [
        { 
          CoilID: "101", // 钢卷id
          prop: "TwentyMM1",
          label: "20mm",
          width: "",
          fixed: "",
          isCheck: true, // 是否渲染显示 checkBox
          checked:false, // 是否勾选
          disabled:false, // 是否禁用操作
          input: false
        },
        {
          CoilID: "102", // 钢卷id
          prop: "TwentyMM2",
          label: "20mm",
          width: "",
          fixed: "",
          isCheck: true, // 是否渲染显示 checkBox
          checked:false, // 是否勾选
          disabled:false, // 是否禁用操作
          input: false
        },
        {
          CoilID: "103", // 钢卷id
          prop: "FiftyMM1",
          label: "50mm",
          width: "",
          fixed: "",
          isCheck: true, // 是否渲染显示 checkBox
          checked:false, // 是否勾选
          disabled:false, // 是否禁用操作
          input: false
        },
        {
          CoilID: "104", // 钢卷id
          prop: "FiftyMM2",
          label: "50mm",
          width: "",
          fixed: "",
          isCheck: true, // 是否渲染显示 checkBox
          checked:false, // 是否勾选
          disabled:false, // 是否禁用操作
          input: false
        },
        {
          CoilID: "105", // 钢卷id
          prop: "FiftyMM3",
          label: "50mm",
          width: "",
          fixed: "",
          isCheck: true, // 是否渲染显示 checkBox
          checked:false, // 是否勾选
          disabled:false, // 是否禁用操作
          input: false
        },
        {
          CoilID: "105", // 钢卷id
          prop: "FiftyMM4",
          label: "50mm",
          width: "",
          fixed: "",
          isCheck: true, // 是否渲染显示 checkBox
          checked:false, // 是否勾选
          disabled:false, // 是否禁用操作
          input: false
        },
        {
          CoilID: "107", // 钢卷id
          prop: "FiftyMM5",
          label: "50mm",
          width: "",
          fixed: "",
          isCheck: true, // 是否渲染显示 checkBox
          checked:false, // 是否勾选
          disabled:false, // 是否禁用操作
          input: false
        }
      ],
      ISGoods: [
        // SteelCoil:
        {
          GoodsID: "111", //父钢卷号
          Brand: "牌号", // 牌号
          Standards: "规格", // 规格
          Ton: 10, //吨位
          Striping:[
              {
                StripingId: "1001", // 分小条钢卷 Id
                Standards: "如0.5*30mm", // 分小条钢卷规格
                RollPackNo: "" // 所属卷包号
              },
          ]
        },
        {
          ParentID: "112", //父钢卷号
          Brand: "", // 牌号
          Standards: "", // 规格
          Ton: 15, //吨位
        },
        {
          ParentID: "113", //父钢卷号
          Brand: "", // 牌号
          Standards: "", // 规格
          Ton: 13, //吨位
        }
      ],
      checkedList:[], // 钢卷小条勾选列表
      packingList:[], // 综合打包数据列表
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
  },
  methods: {
    // 钢卷打包
    coilpacking() {
      console.log(this.checkedList);
      // 打包后的钢条小卷 禁用
     let tabel = $('#Table');
     let checkBoxs = $('#Table').find('input:checked');
     checkBoxs.each(function(){
       $(this).attr("disabled",true);
       $(this).parent().addClass("is-disabled is-checked");
     })
      let arr = [].concat(this.checkedList)
      let item = {packing:arr}
      this.packingList.push(item);
      this.checkedList = [] // 重置清空
      console.log(this.packingList); // 打包后的数据
    },
    // 重置 checkBox
    resetCheckBox(){
      this.packingList = [];
      // checkBox 去disabled
      let checkBoxs = $('#Table').find('input:checked');
      checkBoxs.each(function(){
       $(this).attr("disabled",false);
       $(this).parent().removeClass("is-disabled is-checked");
     })
    },
    // checkBox 勾选事件
    checkBoxChange(scope,item) {
      console.log(scope,item)
      let rowIndex = scope.$index;
      let isChecked = scope.checked;
      // 勾选情况下 添加到数据列表
      if (isChecked) {
        let CoilID = scope.column.columnKey; // 小卷id
        let prop = scope.column.property; // 规格参数
        let ParentID = scope.row.ParentID; // 父卷id
        let Standards = item.label;
        let obj = {
            CoilID:CoilID,
            ParentID:ParentID,
            prop:prop,
            Standards:Standards
        };
        this.checkedList.push(obj);
      } else{
          // 去掉勾选情况下 从数据列表中清除
        let CoilID = scope.column.columnKey;
        this.checkedList = this.checkedList.filter(item=>{
            return item.CoilID != CoilID;
        })
      }
    },
    // 某小格cell点击事件
    cellClick(row, column, cell, event) {
      console.log(cell);
      console.log($(cell).find('input'));
      // $(cell).find('input').attr("disabled",true);

    },
  }
};
</script>
<style>
</style>