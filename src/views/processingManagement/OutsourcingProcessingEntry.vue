<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-14 09:30:21
 * @LastEditTime: 2019-09-15 16:04:59
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="page-wrap">
    <h1>委外加工单录入</h1>
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
            <el-button size="mini" type="warning" @click="addOneColumn">分条+</el-button>
          </div>
          <div class="table-top-status"></div>
        </div>
        <!--表格顶部区域-->
        <!--表格-->
        <div class="tableWrap">
          <el-table
            :data="InStore.ISGoods"
            border
            show-summary
            :summary-method="getSummaries"
            style="width:100%"
          >
            <el-table-column  prop="Brand" label="牌号" width="120" fixed ="left"></el-table-column>
            <el-table-column prop="Standards" label="规格(厚*宽/单位mm)" width="180" fixed ="left"></el-table-column>
            <el-table-column  prop="Id" label="钢卷号" width="120" fixed ="left"></el-table-column>
            <el-table-column  prop="Ton" label="吨数" width="120" fixed ="left"></el-table-column>
            <!--动态分条区-->
            <el-table-column
              v-for="(item,index) in tableTitle"
              :key="index"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              :fixed="item.fixed"
            >
              <div v-if="item.children" class="children">
                <el-table-column
                  v-for="(item2,index) in item.children"
                  :key="index"
                  :prop="item2.prop"
                  :label="item2.label"
                  :width="item2.width"
                >
                  <el-checkbox label="复选框 A"></el-checkbox>
                </el-table-column>
              </div>
            </el-table-column>
            <!--动态分条区-->
            <el-table-column fixed prop="SurplusMaterial" label="分条余料" width="150"></el-table-column>
            <el-table-column label="操作" min-width="180" fixed="right">
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
        </div>
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
          <el-input v-model="form.GName" auto-complete="off"></el-input>
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
    <!--分条对话框-->
    <!-- <el-dialog title="分条" :visible.sync="dialogFormVisible" class="page-dialog" width="30%">

    </el-dialog>-->
    <!--分条对话框-->
  </div>
</template>
<script>
import FileUpload from "@/components/common/FileUpload";
import { addWarehouseReceipt } from "@/api/warehousingManagement";
import { getContractList, searchContractList } from "@/api/Contract";
import { mapGetters } from "vuex";
export default {
  // 委外加工单录入
  name: "OutsourcingProcessingEntry",
  components: {
    FileUpload
  },
  data() {
    return {
      // 合同=》仓库=》钢卷 数据模型
      Contract: {
        Supply: "string", // 供应方
        Demand: "string", // 需求方
        Address: "string", // 签订地址
        SignTime: "2019-09-18T02:27:28.808Z", // 签订时间
        CEPath: "string", // 附件地址
        Type: "string", // 合同类型 采购/销售
        Extentions: [
          {
            CEName: "string", // 品名
            CEFactroyName: "string", // 厂家
            CEBrand: "string", // 牌号
            CEStandards: "string", // 规格
            CETon: 0, // 吨位
            CEUnitPrice: 0, // 单价
            CETotalPrice: 0, // 合计金额
            CEInfo: "string", // 备注
            Id: "string" // id
          }
        ],
        InStores: [
          {
            RecDate: "2019-09-18T02:27:28.808Z", //接收日期
            RecDepo: "string", // 接收仓库
            RecPersonID: "string", // 接收人身份证号码
            Buyby: "string", // 采购单位
            SupplierOutID: "string", // 采购单位出仓编号
            StoreName: "string", // 仓库名称
            RecPlace: "string", // 接收地址
            CarBoatID: "string", // 车船号
            RecUnitPerson: "string", // 接收单位签收人
            BuyPerson: "string", // 采购人
            ISGoods: [
              {
                GName: "string", // 品名
                Brand: "string", // 牌号
                Standards: "string", // 规格
                Ton: 0, //吨位
                ProfitAndLossTon: 0, //货物盈亏
                PackStatus: "string", //包裹状态
                RecInfo: "string", //接收异议/拍照
                RecInfoBack: "string", // 异议反馈
                GInfo: "string", //备注
                GStatus: "string", // 货物状态 退货/库存/加工/再入库
                ProRollNo: "string", // 加工分条号
                RollPackNo: "string", // 卷包号
                UnitPrice: 0, // 单价
                OutDate: "2019-09-18T02:27:28.808Z", // 出库日期
                Id: "string" // 钢卷号
              }
            ],
            Ext: "string", // 扩展字段
            Id: "string" // 出入仓编号id
          }
        ],
        Id: "string" // 合同编号id
      },
      // 当前page入仓单数据模型
      InStore: {
        contractId: "", // 合同编号id
        RecDate: "", //接收日期
        RecDepo: "", // 接收仓库
        RecPersonID: "", // 接收人身份证号码
        Buyby: "", // 采购单位
        SupplierOutID: "", // 采购单位出仓编号
        StoreName: "", // 仓库名称
        RecPlace: "", // 接收地址
        CarBoatID: "", // 车船号
        RecUnitPerson: "", // 接收单位签收人
        BuyPerson: "", // 采购人
        ISGoods: [
          {
            GName: "", // 品名
            Brand: "", // 牌号
            Standards: "", // 规格
            Ton: 0, //吨位
            ProfitAndLossTon: 0, //货物盈亏
            PackStatus: "", //包裹状态
            RecInfo: "", //接收异议/拍照
            RecInfoBack: "", // 异议反馈
            GInfo: "", //备注
            GStatus: "", // 货物状态 退货/库存/加工/再入库
            ProRollNo: "", // 加工分条号
            RollPackNo: "", // 卷包号
            UnitPrice: 0, // 单价
            OutDate: "", // 出库日期
            Id: "", // 钢卷号,
            Striping: [
              // 该钢卷 加工所分小条 数据列表
              {
                Id: "1001", // 分小条钢卷 Id
                Standards: "如0.5*30mm", // 分小条钢卷规格
                RollPackNo: "" // 所属卷包号
              },
              {
                Id: "1002", // 分小条钢卷 Id
                Standards: "如0.5*30mm", // 分小条钢卷规格
                RollPackNo: "" // 所属卷包号
              },
              {
                Id: "1003", // 分小条钢卷 Id
                Standards: "如0.5*60mm", // 分小条钢卷规格
                RollPackNo: "" // 所属卷包号
              }
            ],
            SurplusMaterial: "" // 分条后的余料
          }
        ],
        Ext: "", // 扩展字段
        Enclosure: [], // 新增附件
        Id: "" // 出入仓编号id
      },
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
        ]
      },
      // 表头
      tableTitle: [
        {
          prop: "StripPlan",
          label: "分条方案",
          fixed: false,
          width: "",
          children: [
            {
              prop: "Striping1",
              label: "分条规格1(30mm)",
              width: "200"
            },
            {
              prop: "Striping2",
              label: "分条规格2(60mm)",
              width: "200"
            },
            {
              prop: "Striping3",
              label: "分条规格3(90mm)",
              width: "200"
            }
          ]
        }
      ],
      dialogFormVisible: false, // dialog 对话框显示或隐藏
      editIndex: 0, // 当前编辑表格数据index
      form: {
        Id: "", // 钢卷号
        Brand: "", // 牌号
        Standards: "", // 规格(厚*宽)
        Ton: "", // 吨位
        Striping1: "",
        Striping2: "",
        Striping3: ""
      },
      formLabelWidth: "120px", // 表单 label宽度
      tableWidth: ""
    };
  },
  computed: {
    // 加工操作的钢卷列表数据
    ...mapGetters(["steelCoilMachiningList"])
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // 通过 `vm` 访问组件实例 从入仓汇总表页面 =》 委外加工单录入页面
      if (
        from.name == "WarehousingSummary" &&
        to.name == "OutsourcingProcessingEntry"
      ) {
        console.log("ok");
        // 初始渲染表格 加工操作的钢卷
        vm.InStore.ISGoods = vm.steelCoilMachiningList;
        // 初始填充 仓库名称
        if (vm.InStore.ISGoods.length > 0) {
          if (vm.InStore.ISGoods[0].RecDepo) {
            vm.InStore.StoreName = vm.InStore.ISGoods[0].RecDepo;
          }
        }
      }
    });
  },
  methods: {
    // 表格新增一行
    addOneRow() {
      let row = {
        Id: "",
        GName: "",
        Brand: "",
        Standards: "",
        Ton: "",
        ProfitAndLossTon: "",
        PackStatus: "",
        RecInfo: "",
        RecInfoBack: "",
        GInfo: ""
      };
      this.InStore.ISGoods.push(row);
    },
    // 新增列 新增分条
    addOneColumn() {
      let len = this.tableTitle[0].children.length;
      let column = {
        prop: `Striping`,
        label: `分条${len + 1}`,
        width: "200"
      };
      this.tableTitle[0].children.push(column);
    },
    // 表单合计自定义统计计算方法
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        } else if (index == 3) {
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
        let Contract = {};
        Contract.Id = this.InStore.contractId;
        Contract.InStores = [this.InStore];
        // 调用录入API
        let result = await addWarehouseReceipt(Contract);
        const loading = this.$loading({
          lock: true,
          text: "入仓单录入",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
        if (result.StatusCode == 200) {
          setTimeout(() => {
            loading.close(); // 关闭加载动画
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
.tableWrap{
  width: 90%;
  display: block;
  overflow: auto;
  box-sizing: border-box;
}
</style>