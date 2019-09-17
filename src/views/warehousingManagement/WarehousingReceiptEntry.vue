<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-14 09:30:21
 * @LastEditTime: 2019-09-15 16:04:59
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="page-wrap">
    <h1>入仓单信息录入</h1>
    <el-form :model="InStore" :rules="rules" ref="ruleForm">
      <div class="page-topPart">
        <!--顶部input输入区域-->
        <div class="page-topPart-inputArea">
          <div class="left-box">
            <div class="input-box">
              <el-form-item label="采购合同编号" prop="contractId" class="form-item">
                <el-input v-model="InStore.contractId" placeholder="请输入内容"></el-input>
              </el-form-item>
            </div>
            <div class="input-box">
              <el-form-item label="仓库名称" prop="StoreName" class="form-item">
                <el-input v-model="InStore.StoreName" placeholder="请输入内容"></el-input>
              </el-form-item>
            </div>
            <div class="input-box">
              <el-form-item label="销售单位" prop="Buyby" class="form-item">
                <el-input v-model="InStore.Buyby" placeholder="请输入内容"></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="middle-box">
            <div class="input-box">
              <el-form-item label="入仓单编号" prop="Id" class="form-item">
                <el-input v-model="InStore.Id" placeholder="请输入内容"></el-input>
              </el-form-item>
            </div>
            <div class="input-box">
              <el-form-item label="收货地点" prop="RecPlace" class="form-item">
                <el-input v-model="InStore.RecPlace" placeholder="请输入内容"></el-input>
              </el-form-item>
            </div>
            <div class="input-box">
              <el-form-item label="车船号" prop="CarBoatID" class="form-item">
                <el-input v-model="InStore.CarBoatID" placeholder="请输入内容"></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="right-box">
            <div class="input-box">
              <el-form-item label="货物接收入库单位" prop="RecUnitPerson" class="form-item">
                <el-input v-model="InStore.RecUnitPerson" placeholder="请输入内容"></el-input>
              </el-form-item>
            </div>
            <div class="input-box">
              <el-form-item label="收货日期" prop="RecDate" class="form-item">
                <el-date-picker
                  v-model="InStore.RecDate"
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
          :data="InStore.ISGoods"
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
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
                type="primary"
                round
              >编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                round
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--表格-->
        <!--合同附件-->
        <h3>附件</h3>
        <div class="enclosure-box">
          <FileUpload v-model="InStore.Enclosure"></FileUpload>
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
          <el-input v-model="form.CEName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="牌号" :label-width="formLabelWidth">
          <el-input v-model="form.Brand" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="钢卷号" :label-width="formLabelWidth">
          <el-input v-model="form.Id" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="规格(厚*宽)" :label-width="formLabelWidth">
          <el-input v-model="form.Standards" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="吨位" :label-width="formLabelWidth">
          <el-input v-model="form.Ton" auto-complete="off"></el-input>
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
          <el-input v-model="form.GStatus" auto-complete="off"></el-input>
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
import { mapGetters } from "vuex";
export default {
  // 入仓单录入
  name: "WarehousingReceiptEntry",
  components: {
    FileUpload
  },
  data() {
    return {
      // 出仓单表单数据
      warehouseReceiptForm: {
        Id: "", // 合同编号
        Supply: "", // 供应方
        Demand: "", //需求方
        Address: "", //签订地址
        SignTime: "", //签订时间
        CEPath: "", //附件地址
        InStores: {
          Id: "", // 出入仓单Id
          RecDate: "", //接收日期
          RecDepo: "", //接收仓库
          RecPersonID: "", //接收人身份证号码
          Buyby: "", //采购单位
          SupplierOutID: "", //采购单位出仓编号
          StoreName: "", //仓库名称
          RecPlace: "", // 接收地址
          CarBoatID: "", // 车船号
          BuyPerson: "", // 采购人
          RecUnitPerson: "", //接收单位签收人
          Ext: "", //扩展字段
          ISGoods: [
            {
              Id: "", // 钢卷号
              GName: "", // 品名
              Brand: "", // 牌号
              Standards: "", //规格
              Ton: "", //吨位
              UnitPrice: null, //单价
              ProfitAndLossTon: "", //货物盈亏
              PackStatus: "", //包裹状态
              RecInfo: null, //接收异议/拍照
              GInfo: null, //备注
              GStatus: null, //货物状态 退货/库存/加工/再入库
              ProRollNo: null, // 加工分条号
              RollPackNo: null, //卷包号
              OutDate: "" //出库日期
            }
          ]
        },
        Extentions: [
          // 合同附件
          {
            Id: "",
            CEName: "", //品名
            CEFactroyName: "", //厂家
            CEBrand: "", //牌号
            CEStandards: "", //规格
            CETon: 0, //吨位
            CEUnitPrice: 0, //单价
            CETotalPrice: 0, //合计金额
            CEInfo: "" //备注
          }
        ]
      },
      // 出入仓单数据信息
      InStore: {
        contractId: "", // 合同编号id
        Id: "", // 出入仓单Id
        RecDate: "", //接收日期
        RecDepo: "", //接收仓库
        RecPersonID: "", //接收人身份证号码
        Buyby: "", //采购单位
        SupplierOutID: "", //采购单位出仓编号
        StoreName: "", //仓库名称
        RecPlace: "", // 接收地址
        CarBoatID: "", // 车船号
        BuyPerson: "", // 采购人
        RecUnitPerson: "", //接收单位签收人
        Ext: "", //扩展字段
        Enclosure: [], // 附件
        ISGoods: [
          {
            Id: "", // 钢卷号
            GName: "", // 品名
            Brand: "", // 牌号
            Standards: "", //规格
            Ton: "", //吨位
            UnitPrice: null, //单价
            ProfitAndLossTon: "", //货物盈亏
            PackStatus: "", //包裹状态
            RecInfo: null, //接收异议/拍照
            GInfo: null, //备注
            GStatus: null, //货物状态 退货/库存/加工/再入库
            ProRollNo: null, // 加工分条号
            RollPackNo: null, //卷包号
            OutDate: "" //出库日期
          }
        ]
      }, // 仓单对象数据
      // 校验规则
      rules: {
        contractId: [
          { required: true, message: "请输入合同编号", trigger: "blur" }
        ],
        Id: [{ required: true, message: "请输入仓单编号", trigger: "blur" }],
        StoreName: [
          { required: true, message: "请输入仓库名称", trigger: "blur" }
        ],
        Buyby: [{ required: true, message: "请输入销售单位", trigger: "blur" }],
        RecPlace: [
          { required: true, message: "请输入收货地点", trigger: "blur" }
        ],
        CarBoatID: [
          { required: true, message: "请输入车船号", trigger: "blur" }
        ],
        RecUnitPerson: [
          { required: true, message: "请输入货物接收入库单位", trigger: "blur" }
        ],
        // RecDate: [
        //   {
        //     type: "date",
        //     required: true,
        //     message: "请选择收货日期",
        //     trigger: "blur"
        //   }
        // ]
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
          prop: "Id",
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
          prop: "GStatus",
          label: "异议反馈"
        },
        {
          prop: "GInfo",
          label: "备注"
        }
      ], // 表格标题
      dialogFormVisible: false, // dialog 对话框显示或隐藏
      editIndex: 0, // 当前编辑表格数据index
      form: {
        Id: "",
        GName: "",
        Brand: "",
        Standards: "",
        Ton: "",
        ProfitAndLossTon: "",
        PackStatus: "",
        RecInfo: "",
        GStatus: "",
        GInfo: ""
      },
      formLabelWidth: "120px", // 表单 label宽度
      files: [] // 附件文件组
    };
  },
  // computed: {
  //   ...mapGetters(["outWarehouseList", "warehouseReceiptList"])
  // },
  mounted() {
  },
  methods: {
    // 表格新增一行
    addOneRow() {
      let row = {
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
      };
      this.InStore.ISGoods.push(row);
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
      this.InStore.ISGoods.splice(index, 1);
    },
    // dialog 对话框确定事件
    dialogFormOkHandle() {
      this.InStore.ISGoods[this.editIndex] = this.form;
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
        console.log(this.InStore);
        // 调用录入API
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