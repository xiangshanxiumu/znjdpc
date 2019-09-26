<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-14 09:30:21
 * @LastEditTime: 2019-09-15 16:04:59
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="page-wrap">
    <h1>{{pageTitle}}</h1>
    <el-form :model="Store.store" :rules="rules" ref="ruleForm">
      <div class="page-topPart">
        <!--顶部input输入区域-->
        <div class="page-topPart-inputArea">
          <div class="left-box">
            <div class="input-box">
              <el-form-item label="采购合同编号" prop="CID" class="form-item">
                <el-input v-model="Store.store.CID" placeholder="请输入采购合同编号"></el-input>
              </el-form-item>
            </div>
            <div class="input-box">
              <el-form-item label="仓库名称" prop="StoreName" class="form-item">
                <el-input v-model="Store.store.StoreName" placeholder="请输入仓库名称"></el-input>
              </el-form-item>
            </div>
            <div class="input-box">
              <el-form-item label="采购单位" prop="Buyby" class="form-item">
                <el-input v-model="Store.store.Buyby" placeholder="请输入采购单位"></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="middle-box">
            <div class="input-box">
              <el-form-item label="入仓单编号" prop="SID" class="form-item">
                <el-input v-model="Store.store.SID" placeholder="请输入仓单编号"></el-input>
              </el-form-item>
            </div>
            <div class="input-box">
              <el-form-item label="收货地点" prop="RecPlace" class="form-item">
                <el-input v-model="Store.store.RecPlace" placeholder="请输入收货地点"></el-input>
              </el-form-item>
            </div>
            <div class="input-box">
              <el-form-item label="车船号" prop="CarBoatID" class="form-item">
                <el-input v-model="Store.store.CarBoatID" placeholder="请输入车船号"></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="right-box">
            <div class="input-box">
              <el-form-item label="运费" prop="TransPrice" class="form-item">
                <el-input v-model="Store.store.TransPrice" placeholder="请输入运费"></el-input>
              </el-form-item>
            </div>
            <div class="input-box">
              <el-form-item label="货物接收入库单位" prop="RecUnitPerson" class="form-item">
                <el-input v-model="Store.store.RecUnitPerson" placeholder="请输入接收入库单位"></el-input>
              </el-form-item>
            </div>
            <div class="input-box">
              <el-form-item label="收货日期" prop="RecDate" class="form-item">
                <el-date-picker
                  v-model="Store.store.RecDate"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="选择日期"
                ></el-date-picker>
              </el-form-item>
            </div>
          </div>
        </div>
        <!--顶部input输入区域-->
      </div>
      <!--顶部区域-->
      <!--页面内容区域-->
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
          :data="Store.goodlist"
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
          ></el-table-column>
          <el-table-column label="操作" width="180" fixed="right">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
                type="warning"
                plain
              >编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                plain
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--表格-->
        <!--合同附件-->
        <h3>附件</h3>
        <div class="enclosure-box">
          <FileUpload v-model="Enclosure"></FileUpload>
        </div>
        <!--合同附件-->
        <!--按钮区-->
        <div class="footer-btns">
          <el-button @click="backHandle">返回</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        </div>
        <!--按钮区-->
      </div>
    </el-form>
    <!--dialog对话框-->
    <el-dialog title="编辑" :visible.sync="dialogFormVisible" class="page-dialog" width="30%">
      <el-form :model="form">
        <el-form-item label="品名" :label-width="formLabelWidth">
          <el-input v-model="form.GName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="牌号" :label-width="formLabelWidth">
          <el-input v-model="form.Brand" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="钢卷号" :label-width="formLabelWidth">
          <el-input v-model="form.SteelRollID" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="规格(厚*宽)" :label-width="formLabelWidth">
          <el-input v-model="form.Standards" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="吨位" :label-width="formLabelWidth">
          <el-input v-model="form.Ton" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="单价" :label-width="formLabelWidth">
          <el-input v-model="form.UnitPrice" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="总金额" :label-width="formLabelWidth">
          <el-input v-model="form.TotalPrice" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="接收盈亏" :label-width="formLabelWidth">
          <el-input v-model="form.ProfitAndLossTon" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="包装状态" :label-width="formLabelWidth">
          <el-input v-model="form.PackStatus" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="接收异议/拍照" :label-width="formLabelWidth">
          <el-input v-model="form.RecInfo" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="异议反馈" :label-width="formLabelWidth">
          <el-input v-model="form.RecInfoBack" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.GInfo" auto-complete="off"></el-input>
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
// 导入添加仓单API函数
import { addWarehouseReceipt } from "@/api/WarehouseReceipt";
// 合同API函数
import { getContractList, searchContractList } from "@/api/Contract";
import { mapGetters } from "vuex";
export default {
  // 入仓单录入
  name: "WarehousingReceiptEntry",
  components: {
    FileUpload
  },
  data() {
    return {
      Store: {
        store: {
          SID: "",
          RecDate: "",
          RecDepo: "",
          RecPersonID: "",
          Buyby: "",
          SupplierOutID: "",
          StoreName: "",
          RecPlace: "",
          CarBoatID: "",
          RecUnitPerson: "",
          BuyPerson: "",
          TransPrice: 0,
          Ext: "",
          CID: "",
          Id: ""
        },
        goodlist: [
          {
            GName: "",
            Brand: "",
            Standards: "",
            Ton: 0,
            ProfitAndLossTon: 0,
            PackStatus: "",
            RecInfo: "",
            RecInfoBack: "",
            GInfo: "",
            GStatus: "",
            ProRollNo: "",
            RollPackNo: "s",
            UnitPrice: 0,
            OutDate: "",
            InsID: "",
            OutsID: "",
            SteelRollID: "",
            Id: ""
          }
        ]
      },
      Enclosure: [], // 新增附件
      // 校验规则
      rules: {
        CID: [
          { required: true, message: "请输入采购合同编号", trigger: "blur" }
        ],
        SID: [{ required: true, message: "请输入仓单编号", trigger: "blur" }],
        StoreName: [
          { required: true, message: "请输入仓库名称", trigger: "blur" }
        ],
        Buyby: [{ required: true, message: "请输入采购单位", trigger: "blur" }],
        RecPlace: [
          { required: true, message: "请输入收货地点", trigger: "blur" }
        ],
        CarBoatID: [
          { required: true, message: "请输入车船号", trigger: "blur" }
        ],
        RecUnitPerson: [
          { required: true, message: "请输入货物接收入库单位", trigger: "blur" }
        ],
        TransPrice: [{ required: true, message: "请输入运费", trigger: "blur" }]
      },
      // 表头
      tableTitle: [
        {
          prop: "GName",
          label: "品名"
        },
        {
          prop: "Brand",
          label: "牌号"
        },
        {
          prop: "SteelRollID",
          label: "钢卷号"
        },
        {
          prop: "Standards",
          label: "规格(厚*宽)"
        },
        {
          prop: "Ton",
          label: "吨位"
        },
        {
          prop: "UnitPrice",
          label: "单价"
        },
        {
          prop: "TotalPrice",
          label: "总金额"
        },
        {
          prop: "ProfitAndLossTon",
          label: "接收盈亏"
        },
        {
          prop: "PackStatus",
          label: "包装状态"
        },
        {
          prop: "RecInfo",
          label: "接收异议/拍照"
        },
        {
          prop: "RecInfoBack",
          label: "异议反馈"
        },
        {
          prop: "GInfo",
          label: "备注"
        }
      ],
      dialogFormVisible: false, // dialog 对话框显示或隐藏
      editIndex: 0, // 当前编辑表格数据index
      form: {
        SteelRollID: "", // 钢卷号
        GName: "", // 品名
        Brand: "", // 牌号
        Standards: "", // 规格(厚*宽)
        Ton: "", // 吨位
        UnitPrice: 0, // 单价
        TotalPrice: 0, // 总金额
        ProfitAndLossTon: 0, // 接收盈亏
        PackStatus: "", // 包装状态
        RecInfo: "", //  接收异议/拍照
        RecInfoBack: "", // 异议反馈
        GInfo: "" // 备注
      },
      formLabelWidth: "120px", // 表单 label宽度
      operation: "录入" // 操作
    };
  },
  computed: {
    ...mapGetters(["editSteelCoil"]),
    pageTitle() {
      // 页面标题
      return `入仓单信息${this.operation}`;
    }
  },
  created() {
    // 从入仓单汇总表单 入仓单查看 编辑
    if (this.$route.query.operation) {
      if (this.$route.query.operation == "查看编辑") {
        this.operation = this.$route.query.operation;
        this.explicitEdit(this.editSteelCoil);
      }
    }
  },
  methods: {
    // 入仓单汇总表 查看详情 回显 编辑
    explicitEdit(goodlist) {
      this.Store.goodlist = [].concat(goodlist);
      let obj = this.Store.goodlist[0];
      // 数据同步到store
      Object.assign(this.Store.store, obj);
    },
    // 表格新增一行
    addOneRow() {
      let row = {
        SteelRollID: "", // 钢卷号
        GName: "", // 品名
        Brand: "", // 牌号
        Standards: "", // 规格(厚*宽)
        Ton: "", // 吨位
        UnitPrice: 0, // 单价
        TotalPrice: 0, // 总金额
        ProfitAndLossTon: 0, // 接收盈亏
        PackStatus: "", // 包装状态
        RecInfo: "", //  接收异议/拍照
        RecInfoBack: "", // 异议反馈
        GInfo: "" // 备注
      };
      // 判断有否前一行数据存在,存在则复制前一行数据
      let len = this.Store.goodlist.length;
      if (len >= 1) {
        // 把前一行数据赋值给row
        row = JSON.parse(JSON.stringify(this.Store.goodlist[len - 1])); // 克隆
      }
      this.Store.goodlist.push(row);
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
      this.Store.goodlist.splice(index, 1);
    },
    // dialog 对话框确定事件
    dialogFormOkHandle() {
      this.Store.goodlist[this.editIndex] = this.form;
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
        // InsID 数据替换
        let InsID = this.Store.store.SID;
        this.Store.goodlist.map(item => {
          item.InsID = InsID;
        });
        console.log(this.Store);
        // 调用录入API
        this.$loadingShow("入仓单录入...");
        let result = await addWarehouseReceipt(this.Store);
        console.log(result);
        if (result) {
          this.$loadingHide();
          if (result.StatusCode == 200) {
            this.$alert(result.Message, "入仓单录入", {
              confirmButtonText: "确定",
              type: "success",
              // center: true,
              callback: action => {
                this.$message({
                  type: "success",
                  message: `入仓单录入成功`
                });
                // 返回上一页面 或返回入仓单汇总表
                this.$router.push({
                  path: "WarehousingSummary"
                });
              }
            });
          } else if (result.StatusCode == 424) {
            this.$alert("当前采购合同编号不存在", "入仓单录入失败", {
              confirmButtonText: "确定",
              type: "warning",
              // center: true,
              callback: action => {}
            });
          } else {
            this.$alert(result.Message, "入仓单录入失败", {
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
.page-topPart-inputArea {
  width: 100%;
  display: flex;
}
.left-box {
  flex: 1;
}
.right-box {
  flex: 1;
}
.middle-box {
  flex: 1;
}
.input-box {
  display: block;
  text-align: right;
  position: relative;
  right: 30%;
}
.form-item {
  display: inline-flex;
}
.el-form-item__label {
  min-width: 5rem;
}
</style>