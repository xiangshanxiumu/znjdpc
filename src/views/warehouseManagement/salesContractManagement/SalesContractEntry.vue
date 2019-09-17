<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-14 09:30:21
 * @LastEditTime: 2019-09-15 17:53:55
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="page-wrap">
    <h1>销售合同录入</h1>
    <el-form :model="contractForm" :rules="rules" ref="ruleForm">
      <div class="page-topPart">
        <div class="left-box">
          <div class="input-item">
            <div class="input-box">
              <el-form-item label="供方" prop="Supply" class="form-item">
                <el-input v-model="contractForm.Supply" placeholder="请输入内容"></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="input-item">
            <div class="input-box">
              <el-form-item label="需方" prop="Demand" class="form-item">
                <el-input v-model="contractForm.Demand" placeholder="请输入内容"></el-input>
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="right-box">
          <div class="input-item">
            <div class="input-box">
              <el-form-item label="合同编号" prop="Id" class="form-item">
                <el-input v-model="contractForm.Id" placeholder="请输入内容"></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="input-item">
            <div class="input-box">
              <el-form-item label="签订地址" prop="Address" class="form-item">
                <el-input v-model="contractForm.Address" placeholder="请输入内容"></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="input-item">
            <div class="input-box">
              <el-form-item label="签订时间" prop="SignTime" class="form-item">
                <el-date-picker v-model="contractForm.SignTime" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
              </el-form-item>
            </div>
          </div>
        </div>
      </div>
      <!---->
      <div class="page-content">
        <!--表格顶部区域-->
        <div class="table-top-area">
          <div class="table-top-btns">
            <el-button size="mini" type="primary" @click="addOneRow">新增一行</el-button>
          </div>
          <div class="table-top-status"></div>
        </div>
        <!--表格顶部区域-->
        <!--表格-->
        <el-table
          :data="contractForm.InStores"
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
        <!--合同条款动态生成-->
        <p>
          <span class="page-title">第一条、</span>产品名称、厂家、牌号、规格(mm)、单位(元/顿)、数量(顿)、金额(元)
        </p>
        <p>
          <span class="page-title">第二条、</span>质量要求：除合同明确约定外、执行标准外的其他附加技术要求不作为本合同标的物的技术标准；供方提供的质量证明书对质量负责。
        </p>
        <p>
          <span class="page-title">第三条、</span>交提货地址计算方式：供方仓库供货；计量方式：小件计量。
        </p>
        <p>
          <span class="page-title">第四条、</span>运输方式及费用负担：供方承担运费；若运输及其他不可抗因素造成无法按时将货物送达需方指定地点时，供方不承担逾期交货的违约责任。
        </p>
        <p>
          <span class="page-title">第五条、</span>验收及提出异议期限、处理方式：按本合同双方约定标准验收；如有异议，需方应于货到30天内以书面形式向供方提出，否则视供方所交货物符合合同规定，质量异议处理按GB/T 17505执行。
        </p>
        <!--合同条款动态生成-->
        <!--合同附件-->
        <h2>附件</h2>
        <div class="enclosure-box">
          <FileUpload v-model="contractForm.Extentions"></FileUpload>
        </div>
        <!--合同附件-->
        <!--按钮区-->
        <div class="footer-btns">
          <el-button class="button" @click="backHandle">返回</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        </div>
        <!--按钮区-->
      </div>
    </el-form>
    <!--dialog对话框-->
    <el-dialog title="编辑" :visible.sync="dialogFormVisible" class="page-dialog" width="30%">
      <el-form :model="form">
        <el-form-item label="产品名称" :label-width="formLabelWidth">
          <el-input v-model="form.productName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="厂家" :label-width="formLabelWidth">
          <el-input v-model="form.manufactor" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="牌号" :label-width="formLabelWidth">
          <el-input v-model="form.brandName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="规格" :label-width="formLabelWidth">
          <el-input v-model="form.specifications" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="数量" :label-width="formLabelWidth">
          <el-input v-model="form.number" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="单价(含税)" :label-width="formLabelWidth">
          <el-input v-model="form.unitPrice" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="合计金额" :label-width="formLabelWidth">
          <el-input v-model="form.totalSum" auto-complete="off"></el-input>
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
import { postSalesContract } from "@/api/warehouseManagement";
export default {
  // 销售合同录入
  name: "SalesContractEntry",
  components: {
    FileUpload
  },
  data() {
    return {
      // 合同数据
      contractForm: {
        Type: "销售", // 销售合同
        Id: "", // 合同编号
        Supply: "福建中鞍科技有限公司", // 供方
        Demand: "", // 需方
        SignTime: "", // 签订时间
        Address: "", // 合同签订地址
        InStores: [
          // 仓库
          {
            productName: "冷轧电工钢",
            manufactor: "新余中冶",
            brandName: "50ZW600",
            specifications: "0.5*1200",
            number: "14.615",
            unitPrice: "5000",
            totalSum: "73075",
            remarks: "款到发货"
          }
        ],
        Extentions: [] // 附件
      },
      // 校验规则
      rules: {
        Id: [{ required: true, message: "请输入合同编号", trigger: "blur" }],
        Supply: [
          { required: true, message: "请输入供方信息", trigger: "blur" }
        ],
        Demand: [
          { required: true, message: "请输入需方信息", trigger: "blur" }
        ],
        Address: [
          { required: true, message: "请输入合同签订地址", trigger: "blur" }
        ],
        SignTime: [
          {
            type: "date",
            required: true,
            message: "请选择合同签订日期",
            trigger: "blur"
          }
        ]
      },
      // 表头信息
      tableTitle: [
        {
          prop: "productName",
          label: "产品名称"
        },
        {
          prop: "manufactor",
          label: "厂家"
        },
        {
          prop: "brandName",
          label: "牌号"
        },
        {
          prop: "specifications",
          label: "规格"
        },
        {
          prop: "number",
          label: "数量"
        },
        {
          prop: "unitPrice",
          label: "单价(含税)"
        },
        {
          prop: "totalSum",
          label: "合计金额"
        },
        {
          prop: "remarks",
          label: "备注"
        }
      ], // 表格标题
      dialogFormVisible: false, // dialog 对话框显示或隐藏
      editIndex: 0, // 当前编辑表格数据index
      form: {
        productName: "",
        manufactor: "",
        number: "",
        brandName: "",
        remarks: "",
        specifications: "",
        totalSum: "",
        unitPrice: ""
      },
      formLabelWidth: "100px"
    };
  },
  mounted() {
    // console.log($('.page-wrap'))
  },
  methods: {
    // 表格新增一行
    addOneRow() {
      let row = {
        productName: "",
        manufactor: "",
        number: "",
        brandName: "",
        remarks: "",
        specifications: "",
        totalSum: "",
        unitPrice: ""
      };
      this.contractForm.InStores.push(row);
    },
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
            if (column.label == "数量") {
              sums[index] += " 吨";
            } else {
              sums[index] += " 元";
            }
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
      this.contractForm.InStores.splice(index, 1);
    },
    // dialog 对话框确定事件
    dialogFormOkHandle() {
      this.contractForm.InStores[this.editIndex] = this.form;
      this.dialogFormVisible = false;
    },
    // 返回按钮
    backHandle() {
      this.$router.go(-1);
    },
    // 提交按钮
    async submitForm(formName) {
      // 非空检测
      let isValid = false;
      this.$refs[formName].validate(valid => {
        if (valid) {
          isValid = valid;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      // 验证通过 调用接口
      if (isValid) {
        console.log(this.contractForm)
        let result = await postSalesContract(this.contractForm);
        console.log(result);
        // Message;
        if (result.StatusCode == 200) {
          this.$alert("销售合同录入成功", "操作成功", {
            confirmButtonText: "确定",
            type: "success",
            callback: action => {
              // 返回上一页面
              this.$router.go(-1);
            }
          });
        }
      }
    }
  }
};
</script>
<style scoped>
.input-item {
  text-align: left;
}
.input-box {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 0rem;
  position: relative;
  left: 30%;
}
.input-label {
  min-width: 6rem;
  text-align: right;
  padding-right: 1rem;
}
.form-item {
  display: inline-flex;
}
</style>