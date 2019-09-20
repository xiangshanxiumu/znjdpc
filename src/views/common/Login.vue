<template>
  <div class="Login-wrap">
    <div class="Login-box">
      <h1 class="Login-box-title">系统登录</h1>
      <el-form :model="LoginForm" status-icon :rules="rules" ref="LoginForm" label-width="100px">
        <el-form-item label="用户名" prop="UserName">
          <el-input v-model="LoginForm.UserName" placeholder="请输入用户名" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="PassWord">
          <el-input
            type="password"
            v-model="LoginForm.PassWord"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            clearable
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="resetForm('LoginForm')">重置</el-button>
          <el-button type="primary" @click="submitForm('LoginForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  // 登录页面
  name: "Login",
  data() {
    return {
      LoginForm: {
        UserName: "",
        PassWord: ""
      },
      rules: {
        UserName: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        PassWord: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
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
        // 调用API 后端验证
        // zajd 123456 前端测试验证
        if (this.LoginForm.UserName == "zajd") {
          if (this.LoginForm.PassWord == "123456") {
            //   前端测试验证通过
            // 生成随机token
            let token =
              `${new Date().getTime()}` + Math.floor(Math.random() * 1000);
            sessionStorage.token = token;
            sessionStorage.isLogin = true;
            this.$store.commit('updateToken',{"token":token});
            if (sessionStorage.token) {
              this.$router.push({
                path: "/Home"
              });
            }
          } else {
            this.$message({
              type: "error",
              showClose: true,
              message: "密码有误"
            });
          }
        } else {
          this.$message({
            type: "error",
            showClose: true,
            message: "用户名有误"
          });
        }
      }
    }
  }
};
</script>
<style scoped>
.Login-wrap {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2d3a4b;
}
.Login-box {
  width: 25%;
  border-radius: 5px;
  padding: 2rem;
  text-align: right;
  background-color: #fff;
}
.Login-box-title {
  font-size: 3rem;
  padding-bottom: 1rem;
  font-weight: bold;
  text-align: center;
}
</style>