<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-14 09:30:21
 * @LastEditTime: 2019-09-15 17:53:55
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="page-wrap">
    <h1>{{pageTitle}}</h1>
    <el-form :model="ContractData.contract" :rules="rules" ref="ruleForm">
      <div class="page-topPart">
        <div class="left-box">
          <div class="input-item">
            <div class="input-box">
              <el-form-item label="供方" prop="Supply" class="form-item">
                <el-autocomplete v-model="ContractData.contract.Supply" placeholder="请输入内容" :fetch-suggestions="querySearchUnit" clearable class="input-width"></el-autocomplete>
              </el-form-item>
            </div>
          </div>
          <div class="input-item">
            <div class="input-box">
              <el-form-item label="需方" prop="Demand" class="form-item">
                <el-autocomplete v-model="ContractData.contract.Demand" placeholder="请输入内容" :fetch-suggestions="querySearchUnit" clearable class="input-width"></el-autocomplete>
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="right-box">
          <div class="input-item">
            <div class="input-box">
              <el-form-item label="合同编号" prop="CID" class="form-item">
                <el-input v-model="ContractData.contract.CID" placeholder="请输入内容" clearable class="input-width"></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="input-item">
            <div class="input-box">
              <el-form-item label="签订地址" prop="Address" class="form-item">
                <el-input v-model="ContractData.contract.Address" placeholder="请输入内容" clearable class="input-width"></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="input-item">
            <div class="input-box">
              <el-form-item label="签订时间" prop="SignTime" class="form-item">
                <el-date-picker
                  v-model="ContractData.contract.SignTime"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="选择日期"
                  clearable
                  class="input-width"
                ></el-date-picker>
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
            <el-button type="primary" @click="addOneRow">新增一行</el-button>
          </div>
          <div class="table-top-status"></div>
        </div>
        <!--表格顶部区域-->
        <!--表格-->
        <el-table
          :data="ContractData.contractExt"
          border
          show-summary
          :summary-method="getSummaries"
          style="width: 100%"
          max-height="600"
        >
          <el-table-column
            v-for="(item,index) in tableTitle"
            :key="index"
            :prop="item.prop"
            :label="item.label"
            align="center"
          ></el-table-column>
          <el-table-column label="操作" width="180" fixed="right">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="warning"
                plain
                @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                plain
                @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button>
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
          <FileUpload v-model="Enclosure"></FileUpload>
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
          <el-autocomplete v-model="form.CEName" auto-complete="off" :fetch-suggestions="querySearchCEName" class="form-input-width"></el-autocomplete>
        </el-form-item>
        <el-form-item label="厂家" :label-width="formLabelWidth">
          <el-autocomplete v-model="form.CEFactroyName" auto-complete="off" :fetch-suggestions="querySearchUnit" class="form-input-width"></el-autocomplete>
        </el-form-item>
        <el-form-item label="牌号" :label-width="formLabelWidth">
          <el-autocomplete v-model="form.CEBrand" auto-complete="off" :fetch-suggestions="querySearchCEBrand" class="form-input-width"></el-autocomplete>
        </el-form-item>
        <el-form-item label="规格" :label-width="formLabelWidth">
          <el-autocomplete v-model="form.CEStandards" auto-complete="off" :fetch-suggestions="querySearchCEStandards" class="form-input-width"></el-autocomplete>
        </el-form-item>
        <el-form-item label="数量" :label-width="formLabelWidth">
          <el-input v-model="form.CETon" auto-complete="off" class="form-input-width"></el-input>
        </el-form-item>
        <el-form-item label="单价(含税)" :label-width="formLabelWidth">
          <el-input v-model="form.CEUnitPrice" auto-complete="off" class="form-input-width"></el-input>
        </el-form-item>
        <el-form-item label="合计金额" :label-width="formLabelWidth">
          <el-input v-model="form.CETotalPrice" auto-complete="off" class="form-input-width"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.CEInfo" auto-complete="off" class="form-input-width"></el-input>
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
// 添加合同接口函数
import { addContract } from "@/api/Contract";
import { mapGetters } from "vuex";
export default {
  // 采购合同录入
  name: "ProcurementContractEntry",
  components: {
    FileUpload
  },
  data() {
    return {
      ContractData: {
        contract: {
          CID: "", // 合同id
          Supply: "", // 供应方
          Demand: "福建中鞍科技有限公司", // 需求方
          Address: "", // 签订地址
          SignTime: "", // 签订时间
          CEPath: "", // 附件地址
          Type: "采购" // 合同类型 采购/销售
          // Id: "string"
        },
        contractExt: [
          {
            CEName: "", // 品名
            CEFactroyName: "", // 厂家
            CEBrand: "", // 牌号
            CEStandards: "", // 规格
            CETon: 0, // 吨位
            CEUnitPrice: 0, // 单价
            CETotalPrice: 0, // 合计金额
            CEInfo: "", // 备注
            CID: "" // 合同id
            // Id: "string"
          }
        ]
        // Enclosure: [], // 新增附件
      },
      Enclosure: [], // 新增附件
      // 校验规则
      rules: {
        CID: [{ required: true, message: "请输入合同编号", trigger: "blur" }],
        Supply: [
          { required: true, message: "请输入供方信息", trigger: "blur" }
        ],
        Demand: [
          { required: true, message: "请输入需方信息", trigger: "blur" }
        ],
        Address: [
          { required: true, message: "请输入合同签订地址", trigger: "blur" }
        ]
      },
      // 表头信息
      tableTitle: [
        {
          prop: "CEName",
          label: "产品名称"
        },
        {
          prop: "CEFactroyName",
          label: "厂家"
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
          label: "数量"
        },
        {
          prop: "CEUnitPrice",
          label: "单价(含税)"
        },
        {
          prop: "CETotalPrice",
          label: "合计金额"
        },
        {
          prop: "CEInfo",
          label: "备注"
        }
      ], // 表格标题
      dialogFormVisible: false, // dialog 对话框显示或隐藏
      editIndex: 0, // 当前编辑表格数据index
      form: {
        CEName: "", // 品名
        CEFactroyName: "", // 厂家
        CEBrand: "", // 牌号
        CEStandards: "", // 规格
        CETon: 0, // 吨位
        CEUnitPrice: 0, // 单价
        CETotalPrice: 0, // 合计金额
        CEInfo: "", // 备注
        CID: "" // 合同id
      },
      formLabelWidth: "100px",
      operation: "录入" // 操作
    };
  },
  computed: {
    ...mapGetters(["viewEditorContract","GNameList","UnitList","BrandList","StandardsList"]),
    pageTitle() {
      // 页面标题
      return `采购合同${this.operation}`;
    }
  },
  watch:{
    // 对话框表单
    form:{
      handler(val,oldval){
        if(val){
          // 自动计算总价
          val.CETotalPrice = parseInt(val.CETon)*parseInt(val.CEUnitPrice);
        }
      },
      immediate:true,
      deep:true,
    }
  },
  created() {
    // 从入仓单汇总表单 入仓单查看 编辑
    if (this.$route.query.operation) {
      if (this.$route.query.operation == "查看编辑") {
        this.operation = this.$route.query.operation;
        this.explicitViewEditor(this.viewEditorContract);
      }
    }
  },
  methods: {
    querySearchCEName(queryString, cb) {
      let restaurants = this.GNameList;
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
    //  Unit CEFactroyName
    querySearchUnit(queryString, cb){
      let restaurants = this.UnitList;
      let results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    // CEBrand
    querySearchCEBrand(queryString, cb){
      let restaurants = this.BrandList;
      let results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    // CEStandards
    querySearchCEStandards(queryString, cb){
      let restaurants = this.StandardsList;
      let results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    // 采购合同汇总表 查看详情 回显 编辑
    explicitViewEditor(contractExt) {
      this.ContractData.contractExt = [].concat(contractExt);
      let obj = this.ContractData.contractExt[0];
      // 数据同步到store
      Object.assign(this.ContractData.contract, obj);
      // 需方 Demand "福建中鞍科技有限公司"
      this.ContractData.contract.Demand = "福建中鞍科技有限公司";
    },
    // 表格新增一行
    addOneRow() {
      let row = {
        CEName: "", // 品名
        CEFactroyName: "", // 厂家
        CEBrand: "", // 牌号
        CEStandards: "", // 规格
        CETon: 0, // 吨位
        CEUnitPrice: 0, // 单价
        CETotalPrice: 0, // 合计金额
        CEInfo: "", // 备注
        CID: "" // 合同id
      };
      // 判断有否前一行数据存在,存在则复制前一行数据
      let len = this.ContractData.contractExt.length;
      if(len>=1){
        // 把前一行数据赋值给row
        row = JSON.parse(JSON.stringify(this.ContractData.contractExt[len-1])); // 克隆
      }
      this.ContractData.contractExt.push(row);
    },
    // 合同表单 删除事件
    handleDelete(index, row) {
      this.ContractData.contractExt.splice(index, 1);
    },
    // 合同表单 编辑事件
    handleEdit(index, row) {
      this.editIndex = index;
      this.form = row;
      this.dialogFormVisible = true;
    },
    // dialog 对话框确定事件
    dialogFormOkHandle() {
      this.ContractData.contractExt[this.editIndex] = this.form;
      this.dialogFormVisible = false;
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
        // 列表数据 同步CID
        let CID = this.ContractData.contract.CID;
        this.ContractData.contractExt.map(item => {
          item.CID = CID;
        });
        console.log(this.ContractData);
        this.$loadingShow("合同录入中...");
        let result = await addContract(this.ContractData);
        console.log(result);
        if (result) {
          this.$loadingHide();
          if (result.StatusCode == 200) {
            this.$alert(result.Message, "采购合同录入", {
              confirmButtonText: "确定",
              type: "success",
              callback: action => {
                this.$message({
                  type: "success",
                  message: `采购合同录入成功`
                });
                // 返回上一页面 或汇总表
                this.$router.push({
                  path: "ProcurementContractSummary"
                });
                // this.$forceUpdate();
              }
            });
          } else {
            this.$alert(result.Message, "采购合同录入失败", {
              confirmButtonText: "确定",
              type: "warning",
              // center: true,
              callback: action => {}
            });
          }
        }
      }
    }
  }
};
</script>
<style scoped>
.input-item {
  text-align: right;
}
.input-box {
  display: inline-flex;
  position: relative;
  right: 30%;
}
.input-label {
  min-width: 6rem;
  text-align: right;
  padding-right: 1rem;
}
.form-item {
  display: inline-flex;
}
.input-width{
  width:18rem;
}
.form-input-width{
  width:80%;
}
</style>