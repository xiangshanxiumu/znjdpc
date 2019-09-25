<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-14 09:30:21
 * @LastEditTime: 2019-09-22 12:48:28
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="page-wrap">
    <h1>委外加工单录入</h1>
    <el-form :model="StoreData.store" :rules="rules" ref="ruleForm">
      <div class="page-topPart">
        <!--顶部input输入区域-->
        <div class="page-topPart-inputArea">
          <div class="left-box">
            <div class="input-box">
              <el-form-item label="加工合同编号" prop="CID" class="form-item">
                <el-input v-model="StoreData.store.CID" placeholder="请输入内容"></el-input>
              </el-form-item>
            </div>
            <div class="input-box">
              <el-form-item label="委托单位" prop="Buyby" class="form-item">
                <el-input v-model="StoreData.store.Buyby" placeholder="请输入内容"></el-input>
              </el-form-item>
            </div>
            <div class="input-box">
              <el-form-item label="加工仓库名称" prop="StoreName" class="form-item">
                <el-input v-model="StoreData.store.StoreName" placeholder="请输入内容"></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="middle-box">
            <div class="input-box">
              <el-form-item label="加工单编号" prop="SID" class="form-item">
                <el-input v-model="StoreData.store.SID" placeholder="请输入内容"></el-input>
              </el-form-item>
            </div>
            <div class="input-box">
              <el-form-item label="加工地点" prop="RecPlace" class="form-item">
                <el-input v-model="StoreData.store.RecPlace" placeholder="请输入内容"></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="right-box">
            <div class="input-box">
              <el-form-item label="加工单位" prop="RecDepo" class="form-item">
                <el-input v-model="StoreData.store.RecDepo" placeholder="请输入内容"></el-input>
              </el-form-item>
            </div>
            <div class="input-box">
              <el-form-item label="加工日期" prop="RecDate" class="form-item">
                <el-date-picker
                  v-model="StoreData.store.RecDate"
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
            <el-button size="mini" type="warning" @click="stripingEdit">分条方案编辑</el-button>
          </div>
          <div class="table-top-status"></div>
        </div>
        <!--表格顶部区域-->
        <!--表格-->
        <div class="tableWrap">
          <el-table
            :data="StoreData.goodlist"
            border
            show-summary
            :summary-method="getSummaries"
            style="width: 100%;"
            v-if="tableShow"
          >
            <!--动态分条区-->
            <el-table-column
              v-for="(item,index) in tableTitle"
              :key="index"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              :fixed="item.fixed"
              resizable
              align="center"
            >
              <div v-if="item.children" class="children">
                <el-table-column
                  v-for="(item2,index) in item.children"
                  :key="index"
                  :prop="item2.prop"
                  :label="item2.label"
                  :width="item2.width"
                  algin="center"
                ></el-table-column>
              </div>
            </el-table-column>
            <!--动态分条区-->
            <el-table-column fixed prop="SurplusMaterial" label="分条余料" width="150"></el-table-column>
            <el-table-column label="操作" min-width="180" fixed="right">
              <template slot-scope="scope">
                <!-- <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)"
                  type="warning"
                  plain
                >编辑</el-button> -->
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
        <h2>附件</h2>
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
      <el-form :model="rowForm">
        <el-form-item
          v-for="(item,index) in rowForm.formItem"
          :label="item.label"
          :key="index"
          :label-width="formLabelWidth"
        >
          <el-input v-model="item.value" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormOkHandle">确 定</el-button>
      </div>
    </el-dialog>
    <!--dialog对话框-->
    <!--分条对话框-->
    <el-dialog title="分条方案"  :visible.sync="StripPlanShow" width="40%">
      <StripPlan :formData="formData" @submit="Submit"></StripPlan>
    </el-dialog>
    <!--分条对话框-->
  </div>
</template>
<script>
// 导入 附件文件添加组件
import FileUpload from "@/components/common/FileUpload";
// StripPlan
import StripPlan from './component/StripPlan';
// 导入 合同API函数
import { getContractList, searchContractList } from "@/api/Contract";
// 导入添加仓单API函数
import { addWarehouseReceipt } from "@/api/WarehouseReceipt";
import { mapGetters } from "vuex";
import { parse } from 'path';
export default {
  // 委外加工单录入
  name: "OutsourcingProcessingEntry",
  components: {
    FileUpload,
    StripPlan
  },
  data() {
    return {
      StoreData: {
        store: {
          SID: "", // 加工单
          RecDate: "", // 加工日期
          RecDepo: "", // 加工单位
          RecPersonID: "",
          Buyby: "福建中鞍科技有限公司", // 委托单位
          SupplierOutID: "",
          StoreName: "", // 加工仓库
          RecPlace: "", // 加工地点
          CarBoatID: "",
          RecUnitPerson: "", 
          BuyPerson: "",
          TransPrice: 0,
          Ext: "",
          CID: "",
          Type:"加工",
          Id: "",
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
            ProsID:"", // 加工单
            SeparateSolution:"",// 分条方案 转字符串
            SteelRollID: "",
            Id: ""
          }
        ]
      },
      Enclosure: [], // 新增附件
      // 校验规则
      rules: {
        CID: [
          { required: true, message: "请输入加工合同编号", trigger: "blur" }
        ],
        SID: [{ required: true, message: "请输加工单编号", trigger: "blur" }],
        StoreName: [
          { required: true, message: "请输入加工仓库名称", trigger: "blur" }
        ],
        Buyby: [{ required: true, message: "请输入委托单位", trigger: "blur" }],
        RecPlace: [
          { required: true, message: "请输入加工地点", trigger: "blur" }
        ],
        RecDepo: [
          { required: true, message: "请输入加工单位", trigger: "blur" }
        ],
      },
      // 表头
      tableTitle: [
        {
          prop: "Brand",
          label: "牌号",
          width: "100",
          fixed: "left"
        },
        {
          prop: "Standards",
          label: "规格(厚*宽/单位mm)",
          width: "100",
          fixed: "left"
        },
        {
          prop: "SteelRollID",
          label: "钢卷号",
          width: "100",
          fixed: "left"
        },
        {
          prop: "Ton",
          label: "吨数",
          width: "100",
          fixed: "left"
        },
        {
          prop: "SeparateSolution",
          label: "分条方案",
          fixed: "",
          width: "",
          children: []
        }
      ],
      dialogFormVisible: false, // dialog 对话框显示或隐藏
      editIndex: 0, // 当前编辑表格数据index
      rowForm: {
        // 行数据表
        formItem: [
          {
            prop: "Brand",
            label: "牌号",
            value: ""
          },
          {
            prop: "Standards",
            label: "规格(厚*宽)",
            value: ""
          },
          {
            prop: "SteelRollID",
            label: "钢卷号",
            value: ""
          },
          {
            prop: "Ton",
            label: "吨位",
            value: ""
          }
        ]
      },
      RowForm: {
        // 行数据表 当作原始数据
        formItem: [
          {
            prop: "Brand",
            label: "牌号",
            value: ""
          },
          {
            prop: "Standards",
            label: "规格(厚*宽)",
            value: ""
          },
          {
            prop: "SteelRollID",
            label: "钢卷号",
            value: ""
          },
          {
            prop: "Ton",
            label: "吨位",
            value: ""
          }
        ]
      },
      formLabelWidth: "150px", // 表单 label宽度
      // 分条 title 编辑
      dialogFormVisible2: false,
      // 动态分条数据
      formData: {
        domains: [
          {
            prop: "Striping1",
            label: "分条1",
            Standards: "",
            Num: ""
          }
        ],
        stripWidth:1200, // 分条宽度
        SurplusMaterial: 0, //分条余料
      },
      stripingList: [], // 分条数据列表
      tableShow: true, // 控制table显示或隐藏 刷新数据
      StripPlanShow:false, // 分条方案对话框显示或隐藏
      SeparateSolution:"",//分条方案
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
        // 初始渲染表格 加工操作的钢卷
        vm.StoreData.goodlist = vm.steelCoilMachiningList;
        // 初始填充 仓库名称
        if (vm.StoreData.goodlist.length > 0) {
          if (vm.StoreData.goodlist[0].RecDepo) {
            vm.StoreData.store.StoreName = vm.StoreData.goodlist[0].RecDepo;
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
        Ton: ""
        // ProfitAndLossTon: "",
        // PackStatus: "",
        // RecInfo: "",
        // RecInfoBack: "",
        // GInfo: ""
      };
      this.StoreData.goodlist.push(row);
    },
    // 分条方案 编辑 from title
    stripingEdit() {
      this.TableTitleToStrip();
      this.StripPlanShow = true;
    },
    // 分条方案数据到 表格
    StripToTableTitle(StripData){
      let SurplusMaterial = StripData.SurplusMaterial; // 分条余料
      let StripTitle = []; // 表格分条
      if(StripData.domains.length ==0){
        return false;
      } else{
        StripData.domains.map(item=>{
          let label = item.Standards+"*"+item.Num;
          let prop = item.prop;
          StripTitle.push({
            prop:prop,
            label:label,
            width:"150"
          });
          // 分条方案字符串数据 
          this.SeparateSolution +=label+"/";
        })
      }
      // 分条方案数据同步到表格头部
      this.tableTitle.map(item => {
        if (item.children) {
          item.children = StripTitle;
        }
      });
      // 分条方案同步到表格体
      this.StoreData.goodlist.map(item=>{
        let useTon = 0;// 分条使用吨位
        // 各小分条的吨位计算
        StripData.domains.map(item2=>{
          item[item2.prop] = ((parseInt(item2.Standards)*parseInt(item2.Num))/StripData.stripWidth)*item.Ton;
          
          item[item2.prop] = Number(item[item2.prop].toFixed(3));
          useTon = useTon + item[item2.prop];
        });
        // 余料
        item.SurplusMaterial = Number((Number(item.Ton) - Number(useTon)).toFixed(3));
      })
    },
    // 表格 到分条方案
    TableTitleToStrip(){
      let stripWidth = 1200;
      if(this.StoreData.goodlist.length>0){
        if(this.StoreData.goodlist[0].Standards){
          stripWidth = this.StoreData.goodlist[0].Standards;
          stripWidth = stripWidth.split("*")[1];
        }
      }
      this.formData.stripWidth = parseInt(stripWidth);
    },
    // 分条方案 表单确定提交 事件
    Submit(value) {
      this.StripPlanShow = false;
      // 克隆分条数据
      let StripData = JSON.parse(JSON.stringify(value));
      this.StripToTableTitle(StripData);
    },
    // 表单行 编辑 dialog 对话框确定事件 数据没有及时刷新
    dialogFormOkHandle() {
      let obj = {};
      this.rowForm.formItem.map(item => {
        obj[item.prop] = item.value;
      });
      this.StoreData.goodlist[this.editIndex] = obj;
      // 强制刷新
      // this.$forceUpdate();
      this.tableShow = false;
      this.$nextTick(() => {
        this.tableShow = true;
      });
      this.dialogFormVisible = false;
      this.rowForm.formItem = [];
    },
    // 合同表单 删除事件
    handleDelete(index, row) {
      this.StoreData.goodlist.splice(index, 1);
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
          return false;
        }
      });
      // 验证通过 调用接口
      if (isValid) {
        // 加工分条单id同步
        let ProsID = this.StoreData.store.SID;
        // 分条方案添加到每个钢卷数据对象中 
        this.StoreData.store.SeparateSolution = this.SeparateSolution;
        this.StoreData.goodlist.map(item=>{
          item.ProsID = ProsID;
        })
        // 调用录入API
        let result = await addWarehouseReceipt(this.StoreData);
        console.log(result)
        if (result.StatusCode == 200) {
          setTimeout(() => {
            this.$alert(result.Message, "加工单录入", {
              confirmButtonText: "确定",
              type: "success",
              // center: true,
              callback: action => {
                this.$message({
                  type: "success",
                  message: `加工单录入成功`
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
.tableWrap {
  width: 90%;
  display: block;
  box-sizing: border-box;
  overflow: auto;
}
.el-table__body-wrapper {
  overflow: auto !important;
  position: relative;
}
.page-dialog {
  display: inline-flex;
  flex-direction: column;
}
</style>