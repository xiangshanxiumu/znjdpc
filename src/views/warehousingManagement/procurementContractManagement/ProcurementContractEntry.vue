<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-14 09:30:21
 * @LastEditTime: 2019-09-15 17:53:55
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="page-wrap">
    <h1>采购合同录入</h1>
    <el-form :model="Contract" :rules="rules" ref="ruleForm">
      <div class="page-topPart">
        <div class="left-box">
          <div class="input-item">
            <div class="input-box">
              <el-form-item label="供方" prop="Supply" class="form-item">
                <el-input v-model="Contract.Supply" placeholder="请输入内容"></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="input-item">
            <div class="input-box">
              <el-form-item label="需方" prop="Demand" class="form-item">
                <el-input v-model="Contract.Demand" placeholder="请输入内容"></el-input>
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="right-box">
          <div class="input-item">
            <div class="input-box">
              <el-form-item label="合同编号" prop="Id" class="form-item">
                <el-input v-model="Contract.Id" placeholder="请输入内容"></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="input-item">
            <div class="input-box">
              <el-form-item label="签订地址" prop="Address" class="form-item">
                <el-input v-model="Contract.Address" placeholder="请输入内容"></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="input-item">
            <div class="input-box">
              <el-form-item label="签订时间" prop="SignTime" class="form-item">
                <el-date-picker
                  v-model="Contract.SignTime"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="选择日期"
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
            <el-button size="mini" type="primary" @click="addOneRow">新增一行</el-button>
          </div>
          <div class="table-top-status"></div>
        </div>
        <!--表格顶部区域-->
        <!--表格-->
        <el-table
          :data="Contract.Extentions"
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
          <FileUpload v-model="Contract.Enclosure"></FileUpload>
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
          <el-input v-model="form.CEName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="厂家" :label-width="formLabelWidth">
          <el-input v-model="form.CEFactroyName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="牌号" :label-width="formLabelWidth">
          <el-input v-model="form.CEBrand" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="规格" :label-width="formLabelWidth">
          <el-input v-model="form.CEStandards" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="数量" :label-width="formLabelWidth">
          <el-input v-model="form.CETon" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="单价(含税)" :label-width="formLabelWidth">
          <el-input v-model="form.CEUnitPrice" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="合计金额" :label-width="formLabelWidth">
          <el-input v-model="form.CETotalPrice" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.CEInfo" auto-complete="off"></el-input>
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
import { addContract } from "@/api/warehousingManagement";
export default {
  // 采购合同录入
  name: "ProcurementContractEntry",
  components: {
    FileUpload
  },
  data() {
    return {
      // 合同=》仓库=》钢卷 数据模型
      contract: {
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
      Contract: {
        Supply: "", // 供应方
        Demand: "福建中鞍科技有限公司", // 需求方
        Address: "", // 签订地址
        SignTime: "", // 签订时间
        CEPath: "", // 附件地址
        Type: "采购", // 合同类型 采购/销售
        Extentions: [
          {
            CEName: "", // 品名
            CEFactroyName: "", // 厂家
            CEBrand: "", // 牌号
            CEStandards: "", // 规格
            CETon: 0, // 吨位
            CEUnitPrice: 0, // 单价
            CETotalPrice: 0, // 合计金额
            CEInfo: "", // 备注
            Id: "" // id
          }
        ],
        InStores: [], // 出入仓数据
        Enclosure: [], // 新增附件
        Id: "" // 合同编号id
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
        ]
        // SignTime: [
        //   {
        //     type: "date",
        //     required: true,
        //     message: "请选择合同签订日期",
        //     trigger: "blur"
        //   }
        // ]
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
        CEInfo: "" // 备注
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
        CEName: "", // 品名
        CEFactroyName: "", // 厂家
        CEBrand: "", // 牌号
        CEStandards: "", // 规格
        CETon: 0, // 吨位
        CEUnitPrice: 0, // 单价
        CETotalPrice: 0, // 合计金额
        CEInfo: "" // 备注
      };
      this.Contract.Extentions.push(row);
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
      this.Contract.Extentions.splice(index, 1);
    },
    // dialog 对话框确定事件
    dialogFormOkHandle() {
      this.Contract.Extentions[this.editIndex] = this.form;
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
        console.log(this.Contract);
        let result = await addContract(this.Contract);
        const loading = this.$loading({
          lock: true,
          text: "采购合同录入",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
        console.log(result);
        // Message;
        if (result.StatusCode == 200) {
          loading.close(); // 关闭加载动画
          this.$alert(result.Message, "采购合同录入", {
            confirmButtonText: "确定",
            type: "success",
            callback: action => {
              this.$message({
                  type: "success",
                  message: `采购合同录入成功`
              });
              // 返回上一页面
              this.$router.go(-1);
              // this.$forceUpdate();
            }
          });
        } else{
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