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
            <!-- <el-button size="mini" type="warning" @click="addOneColumn">分条+</el-button>
            <el-button size="mini" type="warning" @click="deleteOneColumn">分条-</el-button>-->
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
              algin="center"
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
    <el-dialog title="分条方案" :visible.sync="dialogFormVisible2" width="700px">
      <DynaactionForm :formData="formData" @submit="Submit"></DynaactionForm>
    </el-dialog>
    <!--分条对话框-->
  </div>
</template>
<script>
// 导入 附件文件添加组件
import FileUpload from "@/components/common/FileUpload";
// 导入 动态表单组件
import DynaactionForm from "@/components/DynaactionForm";
// 导入 合同API函数
import { getContractList, searchContractList } from "@/api/Contract";
import { mapGetters } from "vuex";
export default {
  // 委外加工单录入
  name: "OutsourcingProcessingEntry",
  components: {
    FileUpload,
    DynaactionForm
  },
  data() {
    return {
      StoreData: {
        store: {
          SID: "", // 加工单
          RecDate: "", // 加工日期
          RecDepo: "", // 加工单位
          RecPersonID: "",
          Buyby: "", // 委托单位
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
          children: [
            // {
            //   prop: "Striping1",
            //   label: "30mm",
            //   width: "150"
            // }
            // {
            //   prop: "Striping2",
            //   label: "45mm",
            //   width: "150"
            // },
            // {
            //   prop: "Striping3",
            //   label: "50mm",
            //   width: "150"
            // }
          ]
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
        //
        domains: [
          {
            label: "分条",
            value: ""
          }
        ]
      },
      stripingList: [], // 分条数据列表
      tableShow: true // 控制table显示或隐藏 刷新数据
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
    // 新增列 新增分条
    addOneColumn() {
      let len = this.tableTitle[0].children.length;
      let column = {
        prop: `Striping`,
        label: `分条${len + 1}`,
        width: "150"
      };
      this.tableTitle[0].children.push(column);
    },
    // 删除列 减少分条
    deleteOneColumn() {
      let len = this.tableTitle[0].children.length;
      if (len > 0) {
        this.tableTitle[0].children.splice(len - 1, 1);
      }
    },
    // 分条方案 编辑 from title
    stripingEdit() {
      this.formData.domains = [];
      let ITEM = this.tableTitle.find(item => {
        return item.children;
      });
      ITEM.children.map(item => {
        let obj = {
          prop: item.prop,
          label: "分条",
          value: item.label
        };
        this.formData.domains.push(obj);
      });
      // 分条方案列表数据更新
      this.stripingList = [].concat(this.formData.domains);
      // 显示对话框
      this.dialogFormVisible2 = true;
    },
    // 分条方案 表单确定提交 事件
    Submit(value) {
      this.formData.domains.map((item, index) => {
        item.label = item.value;
        if (!item.prop) {
          item.prop = `Striping${index + 1}`;
        }
        return item;
      });
      this.tableTitle.map(item => {
        if (item.children) {
          item.children = this.formData.domains;
          item.children.map(item => {
            (item.value = ""), (item.width = "150");
          });
        }
      });
      // 分条方案列表数据更新
      this.stripingList = [].concat(this.formData.domains);
      // 各小卷大概吨位计算&分条余料计算
      if (this.StoreData.goodlist.length > 0) {
        this.StoreData.goodlist.map(item => {
          // 钢卷吨位 Ton
          let GoodsTon = item.Ton;
          // 获取规格
          if (item.Standards) {
            let Standards = item.Standards;
            let index = Standards.indexOf("*");
            let standardsWidth = Number(Standards.substr(index + 1));
            let SurplusMaterial = 0; // 余料
            // 计算各小分条大概吨位
            this.stripingList.map((item2, index) => {
              if (item2.label) {
                // 分条方案 里面规格
                let width = parseInt(item2.label); // parseInt()从字符串中获取数字，需要数字在前
                item2[`stripingTon${index + 1}`] =
                  (width / standardsWidth) * GoodsTon;
                // 各小分条吨位
                item[item2.prop] = item2[`stripingTon${index + 1}`].toFixed(3);
                // 余料累加
                SurplusMaterial += item2[`stripingTon${index + 1}`];
              }
            });
            // 余料
            item.SurplusMaterial = (GoodsTon - SurplusMaterial).toFixed(3);
            // 强制刷新
            // this.$forceUpdate();
            this.tableShow = false;
            this.$nextTick(() => {
              this.tableShow = true;
            });
          }
        });
      }
      // 对话框隐藏
      this.dialogFormVisible2 = false;
    },
    // 表单行 编辑事件
    handleEdit(index, row) {
      // tableTitle更新 对话框表单项数据
      let StripingArr = this.tableTitle.filter(item => {
        return !item.children;
      });
      let ITEM = this.tableTitle.find(item => {
        return item.children;
      });
      ITEM.children.map(item => {
        StripingArr.push(item);
      });
      // 添加 分条余料 项
      StripingArr.push({
        prop: "SurplusMaterial",
        label: "分条余料",
        value: ""
      });
      // 赋原始值
      // StripingArr.map(item=>{
      //   if(row[item.prop]){
      //     item.value = row[item.prop];
      //   }
      // })
      this.rowForm.formItem = [].concat(StripingArr);
      this.editIndex = index;
      this.dialogFormVisible = true;
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
        let ProsID = this.StoreData.store.ProsID;
        this.StoreData.goodlist.map(item=>{
          item.ProsID = ProsID;
          // 分条方案添加到每个钢卷数据对象中 
          item.SeparateSolution = JSON.stringify(this.stripingList)
        })
        console.log(this.StoreData)
        return false;
        // 调用录入API
        let result = await addWarehouseReceipt(this.StoreData);
        const loading = this.$loading({
          lock: true,
          text: "入仓单录入",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
        console.log(result)
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