<template>
  <div class="page-wrap">
    <h1>入仓加工</h1>
    <div class="page-topPart">
      <div class="input-item">
        <div class="input-box">
          <div class="input-label">委托方:</div>
          <el-input class="input-area" v-model="entrustingParty" placeholder="请输入内容"></el-input>
        </div>
      </div>
      <div class="input-item">
        <div class="input-box">
          <div class="input-label">加工方:</div>
          <el-input class="input-area" v-model="processingParty" placeholder="请输入内容"></el-input>
        </div>
      </div>
      <div class="input-item">
        <div class="input-box">
          <div class="input-label">委托日期:</div>
          <el-date-picker v-model="entrustDate" type="date" placeholder="选择日期"></el-date-picker>
        </div>
      </div>
    </div>
    <div class="page-content">
      <div class="table-top-btns">
        <el-button size="mini" @click="addOneRow">新增一行</el-button>
        <el-button size="mini" @click="addOneColumn" type="info">新增成品列</el-button>
      </div>
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
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)" round>编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)" round>删除</el-button>
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
    <el-dialog title="编辑" :visible.sync="dialogFormVisible" class="page-dialog" width="30%">
      <el-form :model="from">
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
  // 入仓加工 page
  name: "WarehousingProcessing",
  components: {
    FileUpload
  },
  data() {
    return {
      warehouseReceiptNumber: "", //"入仓单编号"
      contractNumber: "", // "合同编号"
      brandName: "", // "牌号"
      coilNumber: "", // "钢卷号"

      entrustingParty: "福建中鞍机电科技有限公司", // 委托方
      processingParty: "", // 加工方
      entrustDate: "", // 委托日期

      tableTitle: [
        {
          prop: "productName",
          label: "品名",
          value:"",
        },
        {
          prop: "brandName",
          label: "牌号",
          value:""
        },
        {
          prop: "coilNumber",
          label: "钢卷号",
          value:"",
        },
        {
          prop: "specifications",
          label: "规格(厚*宽)",
          value:""
        },
        {
          prop: "tonnage",
          label: "吨位",
          value:""
        }
      ],
      tableData: [],
      dialogFormVisible: false, // dialog 对话框显示或隐藏
      editIndex: 0, // 当前编辑表格数据index
      fromTitle:[
        {
          prop: "productName",
          label: "品名",
          value:"",
        },
        {
          prop: "brandName",
          label: "牌号",
          value:""
        },
        {
          prop: "coilNumber",
          label: "钢卷号",
          value:"",
        },
        {
          prop: "specifications",
          label: "规格(厚*宽)",
          value:""
        },
        {
          prop: "tonnage",
          label: "吨位",
          value:""
        }
      ],
      form: {
        productName: "",
        brandName: "",
        coilNumber: "",
        specifications: "",
        tonnage: "",
      },
      // from:[
      //   {
      //     prop: "productName",
      //     label: "品名",
      //     value:"",
      //   },
      //   {
      //     prop: "brandName",
      //     label: "牌号",
      //     value:""
      //   },
      //   {
      //     prop: "coilNumber",
      //     label: "钢卷号",
      //     value:"",
      //   },
      //   {
      //     prop: "specifications",
      //     label: "规格(厚*宽)",
      //     value:""
      //   },
      //   {
      //     prop: "tonnage",
      //     label: "吨位",
      //     value:""
      //   }
      // ],
      formLabelWidth: "100px",
      // 成品
      finishedProductIndex:0,
    };
  },
  created() {
    console.log(this.$route.query);
    if (this.$route.query.warehouseReceiptNumber) {
      this.warehouseReceiptNumber = this.$route.query.warehouseReceiptNumber;
    }
    if (this.$route.query.contractNumber) {
      this.contractNumber = this.$route.query.contractNumber;
    }
    if (this.$route.query.brandName) {
      this.contractNumber = this.$route.query.brandName;
    }
    if (this.$route.query.coilNumber) {
      this.contractNumber = this.$route.query.coilNumber;
    }
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
    // 表格新增一行
    addOneRow(){
        let row = {
            productName:"",
            brandName:"",
            coilNumber:"",
            specifications:"",
            tonnage:""
        }
        this.tableData.push(row);
    },
    // 新增成品列
    addOneColumn(){
      // tableTitle
      // let isHas = this.tableTitle.some(item=>{
      //   return item.prop == "finishedProduct";
      // })
      this.finishedProductIndex++;
      let label = `成品${this.finishedProductIndex}`;
      this.tableTitle.push({
          prop: "finishedProduct",
          label: label
      });
      // this.fromTitle = this.tableTitle;
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
      console.log("111",this.from);

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
.input-area {
  min-width: 15rem;
}
</style>