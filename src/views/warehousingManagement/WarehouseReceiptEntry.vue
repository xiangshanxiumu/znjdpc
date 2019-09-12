<template>
  <div class="page-wrap">
    <h1>入仓单信息录入</h1>
    <div class="page-topPart">
      <div class="left-box">
        <div class="input-item">
          <div class="input-box">
            <div class="input-label">合同编号:</div>
            <el-input v-model="contractNumber" placeholder="请输入内容"></el-input>
          </div>
        </div>
        <div class="input-item">
          <div class="input-box">
            <div class="input-label">采购单位:</div>
            <el-input v-model="purchasingUnit" placeholder="请输入内容"></el-input>
          </div>
        </div>
        <div class="input-item">
          <div class="input-box">
            <div class="input-label">仓库名称:</div>
            <el-input v-model="warehouseName" placeholder="请输入内容"></el-input>
          </div>
        </div>
      </div>
      <div class="middle-box">
        <div class="input-item">
          <div class="input-box">
            <div class="input-label">收货日期:</div>
            <el-date-picker v-model="receivingDate" type="date" placeholder="选择日期"></el-date-picker>
          </div>
        </div>
        <div class="input-item">
          <div class="input-box">
            <div class="input-label">供应商出仓单编号:</div>
            <el-input v-model="vendorWarehouseReleaseNumber" placeholder="请输入内容"></el-input>
          </div>
        </div>
        <div class="input-item">
          <div class="input-box">
            <div class="input-label">收货地点:</div>
            <el-input v-model="placeOfReceipt" placeholder="请输入内容"></el-input>
          </div>
        </div>
      </div>
      <div class="right-box">
        <div class="input-item">
          <div class="input-box">
            <div class="input-label">入仓单编号:</div>
            <el-input v-model="warehouseReceiptNumber" placeholder="请输入内容"></el-input>
          </div>
        </div>
        <div class="input-item">
          <div class="input-box">
            <div class="input-label">货物接收入库单位:</div>
            <el-input v-model="goodsReceivingAndStoringUnit" placeholder="请输入内容"></el-input>
          </div>
        </div>
        <div class="input-item">
          <div class="input-box">
            <div class="input-label">车船号:</div>
            <el-input v-model="vehicleNumber" placeholder="请输入内容"></el-input>
          </div>
        </div>
      </div>
    </div>
    <!---->
    <div class="page-content">
      <!--表格-->
      <el-table
        :data="tableData"
        border
        show-summary
        :summary-method="getSummaries"
        style="width: 100%"
      >
        <el-table-column
          v-for="(item,index) in tableTitle"
          :key="index"
          :prop="item.prop"
          :label="item.label"
        ></el-table-column>
        <el-table-column label="操作" width="180" fixed="right">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--表格-->
      <!--合同附件-->
      <h3>附件</h3>
      <div class="enclosure-box">
        <FileUpload></FileUpload>
      </div>
      <!--合同附件-->
      <!--按钮区-->
      <div class="footer-btns">
        <el-button @click="backHandle">返回</el-button>
        <el-button type="primary" @click="submitHandle">提交</el-button>
      </div>
      <!--按钮区-->
    </div>
    <!--dialog对话框-->
    <el-dialog title="编辑" :visible.sync="dialogFormVisible" class="page-dialog">
      <el-form :model="form">
        <el-form-item label="品名" :label-width="formLabelWidth">
          <el-input v-model="form.productName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="牌号" :label-width="formLabelWidth">
          <el-input v-model="form.brandName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="钢卷号" :label-width="formLabelWidth">
          <el-input v-model="form.coilNumber" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="规格(厚*宽)" :label-width="formLabelWidth">
          <el-input v-model="form.specifications" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="吨位" :label-width="formLabelWidth">
          <el-input v-model="form.tonnage" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="接收盈亏" :label-width="formLabelWidth">
          <el-input v-model="form.receiptAndLoss" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="包装状态" :label-width="formLabelWidth">
          <el-input v-model="form.packagingState" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="接收异议/拍照" :label-width="formLabelWidth">
          <el-input v-model="form.receptionObjection" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="异议反馈" :label-width="formLabelWidth">
          <el-input v-model="form.objectionFeedback" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.remarks" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormOkHandle">确 定</el-button>
      </div>
    </el-dialog>
    <!--dialog对话框-->
  </div>
</template>
<script>
import FileUpload from "@/components/common/FileUpload";
export default {
  // 入仓单录入
  name: "WarehouseReceiptEntry",
  components: {
    FileUpload
  },
  data() {
    return {
      contractNumber: "", // 合同编号
      purchasingUnit: "", // 采购单位
      warehouseName: "", // 仓库名称
      receivingDate: "", // 收货日期
      vendorWarehouseReleaseNumber: "", // 供应商出仓单编号
      placeOfReceipt: "", // 收货地点
      warehouseReceiptNumber: "", // 入仓单编号
      goodsReceivingAndStoringUnit: "", // 货物接收入库单位
      vehicleNumber: "", // 车船号
      // 表头
      tableTitle: [
        {
          prop: "productName",
          label: "品名"
        },
        {
          prop: "brandName",
          label: "牌号"
        },
        {
          prop: "coilNumber",
          label: "钢卷号"
        },
        {
          prop: "specifications",
          label: "规格(厚*宽)"
        },
        {
          prop: "tonnage",
          label: "吨位"
        },
        {
          prop: "receiptAndLoss",
          label: "接收盈亏"
        },
        {
          prop: "packagingState",
          label: "包装状态"
        },
        {
          prop: "receptionObjection",
          label: "接收异议/拍照"
        },
        {
          prop: "objectionFeedback",
          label: "异议反馈"
        },
        {
          prop: "remarks",
          label: "备注"
        }
      ], // 表格标题
      tableData: [
        {
          productName: "冷轧硅钢",
          brandName: "DD750",
          coilNumber: "810332455",
          specifications: "0.5*1200*c",
          tonnage: "7.05",
          receiptAndLoss: "",
          packagingState: "",
          receptionObjection: "",
          objectionFeedback: "",
          remarks: "备注"
        },
        {
          productName: "冷轧硅钢",
          brandName: "50ZW470",
          coilNumber: "810332456",
          specifications: "0.5*1200*c",
          tonnage: "6.8",
          receiptAndLoss: "",
          packagingState: "",
          receptionObjection: "",
          objectionFeedback: "",
          remarks: "备注"
        }
      ],
      dialogFormVisible: false, // dialog 对话框显示或隐藏
      editIndex: 0, // 当前编辑表格数据index
      form: {
        productName: "",
        brandName: "",
        coilNumber: "",
        specifications: "",
        tonnage: "",
        receiptAndLoss: "",
        packagingState: "",
        receptionObjection: "",
        objectionFeedback: "",
        remarks: ""
      },
      formLabelWidth: "120px"
    };
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
        } else if (index == 4) {
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
    // 合同表单 编辑事件
    handleEdit(index, row) {
      this.editIndex = index;
      this.form = row;
      this.dialogFormVisible = true;
    },
    // 合同表单 删除事件
    handleDelete(index, row) {
      this.tableData.splice(index, 1);
    },
    // dialog 对话框确定事件
    dialogFormOkHandle() {
      this.tableData[this.editIndex] = this.form;
      this.dialogFormVisible = false;
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
  /* width: 100%;
  height: 100%; */
  /* overflow: hidden; */
  flex: 1;
  overflow: hidden;
}
.page-topPart {
  display: flex;
  align-items: center;
  padding: 1rem;
}
.left-box {
  flex: 1;
  display: block;
}
.right-box {
  flex: 1;
}
.middle-box {
  flex: 1;
}
.input-item {
  text-align: center;
}
.input-box {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 0rem;
}
.input-label {
  min-width: 9rem;
  text-align: right;
  padding-right: 1rem;
}
.page-content {
  padding: 1rem;
  text-align: left;
}
.page-title {
  font-weight: 700;
}
.page-dialog {
  text-align: left;
}
.enclosure-box {
  background-color: #fff;
}
.footer-btns {
  padding: 1rem;
  text-align: right;
}
</style>