<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-22 09:29:48
 * @LastEditTime: 2019-09-22 11:50:20
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-form :model="FormData" ref="FormData" label-width="80px"  class="form-dynamic">
    <el-form-item
      v-for="(domain, index) in FormData.domains"
      :label="domain.label + (index+1)"
      :key="domain.key"
      :prop="'domains.' + index + '.value'"
      :rules="{required: true, message: '内容不能为空', trigger: 'blur'}"
    >
      <el-input v-model="domain.value"></el-input>
      <a
        class="remove-item"
        v-show="FormData.domains.length>1"
        @click.prevent="removeDomain(domain)"
      >
        <i class="el-icon-close"></i>
      </a>
    </el-form-item>
    <el-form-item class="submit-btn">
      <el-button @click="addDomain">新增一项</el-button>
      <!-- <el-button type="warning" @click="resetForm('FormData')">重置</el-button> -->
      <el-button type="primary" @click="submitForm('FormData')">确定</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  // 动态表单
  name: "DynaactionForm",
  model: {
    prop: "formData",
    event: "change"
  },
  props: {
    formData: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      labelPosition:"right",
      FormData: {
        domains: [
          {
            label: "表单项",
            value: ""
          }
        ]
      },
      Label: "表单项", // 表单行名称前缀
    };
  },
  watch: {
    formData: {
      handler(val, oldval) {
        this.FormData = val;
        // label
        if (val.domains.length > 0) {
          if (val.domains[0].label) {
            this.Label = val.domains[0].label;
          }
        }
      },
      immediate: true,
      deep: true
    },
    FormData: {
      handler(val, oldval) {
        this.$emit("change", val);
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    /*增加表单项*/
    addDomain() {
      this.FormData.domains.push({
        label: this.Label,
        value: ""
      });
    },
    /*删除表单项*/
    removeDomain(item) {
      var index = this.FormData.domains.indexOf(item);
      if (index !== -1) {
        this.FormData.domains.splice(index, 1);
      }
    },
    /*格式化表单数据*/
    formatData(data) {
      //动态表单生成的是一个对象数组，需要把对象数组转成一个对象
      let obj = {};
      data.forEach((item, index) => {
        obj["value" + (index + 1)] = item.value;
      });
      return obj;
    }, //确定
    /*提交表单*/ submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let value = this.formatData(this.FormData.domains);
          this.$emit("submit", value);
        } else {
          this.$message({
            type: "warning",
            message: "内容不能为空"
          });
          return false;
        }
      });
    },
    /*重置表单*/
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
.form-dynamic {
  width: 650px;
  background: #fff;
  padding: 10px;
  padding-top: 20px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  text-align: left;
}
.el-input {
  width: 95%;
}
.remove-item {
  color: red;
}
.submit-btn {
  text-align: right;
  padding-top: 20px;
  padding-right: 20px;
}
.form-item {
  display: inline-flex;
}
</style>