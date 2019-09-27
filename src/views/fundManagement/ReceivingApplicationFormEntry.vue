<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-14 09:30:21
 * @LastEditTime: 2019-09-15 16:04:59
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="page-wrap">
    <h1>收款通知单录入</h1>
    <el-form :model="Store.store" :rules="rules" ref="ruleForm">
      <div class="page-topPart">
        <div class="page-topPart-inputArea">
          <div class="left-box">
            <div class="input-box">
              <el-form-item label="申请部门" prop="ApplyDep" class="form-item">
                <el-input v-model="Store.store.ApplyDep" placeholder="请输入内容"></el-input>
              </el-form-item>
            </div>
            <div class="input-box">
              <el-form-item label="摘要" prop="Abstract" class="form-item">
                <el-input v-model="Store.store.Abstract" type="textarea" placeholder="请输入内容"></el-input>
              </el-form-item>
            </div>
            <div class="input-box">
              <el-form-item label="合同金额" prop="ContractPrice" class="form-item">
                <el-input v-model="Store.store.ContractPrice" placeholder="请输入内容"></el-input>
              </el-form-item>
            </div>
            <div class="input-box">
              <el-form-item label="付款金额" prop="PayPrice" class="form-item">
                <el-input v-model="Store.store.PayPrice" placeholder="请输入内容"></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="right-box">
            <div class="input-box text-left">
              <el-form-item label="申请日期" prop="ApplyDate" class="form-item">
                <el-date-picker
                  v-model="Store.store.ApplyDate"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="选择日期"
                ></el-date-picker>
              </el-form-item>
            </div>
            <div class="input-box text-left">
              <el-form-item label="合同编号" prop="CID" class="form-item">
                <el-autocomplete
                  v-model="Store.store.CID"
                  placeholder="请输入采购合同编号"
                  :fetch-suggestions="querySearchCID"
                  @select="selectCID"
                ></el-autocomplete>
              </el-form-item>
            </div>
            <div class="input-box text-left">
              <el-form-item label="已付金额" prop="PaidPrice" class="form-item">
                <el-input v-model="Store.store.PaidPrice" placeholder="请输入内容"></el-input>
              </el-form-item>
            </div>
            <div class="input-box text-left">
              <el-form-item label="付款方式" prop="PayMethod" class="form-item">
                <el-radio-group v-model="Store.store.PayMethod">
                  <el-radio label="转账">转账</el-radio>
                  <el-radio label="现金">现金</el-radio>
                  <el-radio label="现金支票">现金支票</el-radio>
                  <el-radio label="银承">银承</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
          </div>
        </div>
        <!-- <h2>收款单位</h2> -->
        <!-- <div style="padding:0 15%">
          <el-alert title="收款单位" type="info" center :closable="false" show-icon></el-alert>
        </div> -->
        <div class="page-topPart-inputArea">
          <div class="left-box">
            <div class="input-box">
              <el-form-item label="付款单位名称" prop="PayUnitName" class="form-item">
                <el-input
                  v-model="Store.store.PayUnitName"
                  placeholder="请输入内容"
                  style="width:24rem"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </div>
            <div class="input-box">
              <el-form-item label="收款单位名称" prop="RecUnitName" class="form-item">
                <el-input
                  v-model="Store.store.RecUnitName"
                  placeholder="请输入内容"
                  style="width:24rem"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="right-box">
            <div class="input-box text-left">
              <el-form-item label="收款单位开户银行" prop="RecUnitBankName" class="form-item">
                <el-input
                  v-model="Store.store.RecUnitBankName"
                  placeholder="请输入内容"
                  style="width:24rem"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </div>
            <div class="input-box text-left">
              <el-form-item label="收款单位账号" prop="RecUnitAccount" class="form-item">
                <el-input
                  v-model="Store.store.RecUnitAccount"
                  placeholder="请输入内容"
                  style="width:24rem"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="page-search">
          <div class="page-search-item">
            <div class="input-row">
              <el-form-item label="审批" prop="Approval" class="form-item">
                <el-input v-model="Store.store.Approval" placeholder="请输入内容"></el-input>
              </el-form-item>
            </div>
            <div class="input-row">
              <el-form-item label="财务部" prop="Finance" class="form-item">
                <el-input v-model="Store.store.Finance" placeholder="请输入内容"></el-input>
              </el-form-item>
            </div>
            <div class="input-row">
              <el-form-item label="会计" prop="Accounting" class="form-item">
                <el-input v-model="Store.store.Accounting" placeholder="请输入内容"></el-input>
              </el-form-item>
            </div>
            <div class="input-row">
              <el-form-item label="部门" prop="Aepartment" class="form-item">
                <el-input v-model="Store.store.Aepartment" placeholder="请输入内容"></el-input>
              </el-form-item>
            </div>
            <div class="input-row">
              <el-form-item label="经办人" prop="Operator" class="form-item">
                <el-input v-model="Store.store.Operator" placeholder="请输入内容"></el-input>
              </el-form-item>
            </div>
          </div>
        </div>
      </div>
      <!--页面内容区域-->
      <div class="page-content">
        <!--按钮区-->
        <div class="footer-btns">
          <el-button @click="backHandle">返回</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        </div>
        <!--按钮区-->
      </div>
    </el-form>
  </div>
</template>
<script>
// 导入添加仓单API函数
import { addWarehouseReceipt } from "@/api/WarehouseReceipt";
import { mapGetters } from "vuex";
export default {
  // 收款通知单录入
  name: "ReceivingApplicationFormEntry",
  data() {
    return {
      Store: {
        store: {
          ApplyDep: "",
          Abstract: "",
          ContractPrice: "",
          PayPrice: "",
          ApplyDate: "",
          PaidPrice: "",
          CID: "",
          PayUnitName: "福建中鞍机电科技有限公司",
          RecUnitName: "中冶南方新余冷轧新材料技术有限公司",
          RecUnitBankName: "中国建设银行新余分行营业室",
          RecUnitAccount: "1234 5678 0000 9012 3456",
          Approval: "",
          Finance: "",
          Accounting: "",
          Aepartment: "",
          Operator: ""
        }
      },
      // 校验规则
      rules: {},
      formLabelWidth: "120px" // 表单 label宽度
    };
  },
  computed: {
    ...mapGetters(["CIDList"])
  },
  methods: {
    // 合同输入检索
    querySearchCID(queryString, cb) {
      let restaurants = this.CIDList;
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
    // 输入框下拉选择事件
    selectCID(item) {
      let word = item.value;
    },
    // 仓库名称输入检索
    querySearchStoreName(queryString, cb) {
      let restaurants = this.StoreNameList;
      let results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },

    // 返回按钮
    backHandle() {
      this.$router.go(-1);
    },
    // 提交按钮
    async submitForm(formName) {
      console.log(this.Store.store)
      return false;
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
.page-topPart {
  display: block;
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
  right: 25%;
}
.text-left {
  text-align: left;
  position: relative;
  padding-left:50%;
}
.form-item {
  display: inline-flex;
}
.el-form-item__label {
  min-width: 5rem;
}
.page-search {
  text-align: center;
}
.input-row {
  margin: 0rem 2rem;
}
</style>