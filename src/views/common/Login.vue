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
import { mapGetters } from "vuex";
export default {
  // 登录页面
  name: "Login",
  data() {
    return {
      admin: [
        {
          UserName: "zajd", // 用户名 "中鞍机电管理"
          PassWord: "123456", // 密码
          role: "总管理", // 角色
          authMenu: "menuMap" // 菜单路由访问权限
        },
        {
          UserName: "zajdcw", // 用户名
          PassWord: "123456", // 密码
          role: "财务管理", // 角色
          authMenu: "fundManMenu" // 菜单路由访问权限
        },
        {
          UserName: "zajdcg", // 用户名
          PassWord: "123456", // 密码
          role: "采购管理", // 角色
          authMenu: "PurManMenu" // 菜单路由访问权限
        },
        {
          UserName: "zajdxs", // 用户名
          PassWord: "123456", // 密码
          role: "销售管理", // 角色
          authMenu: "SaleManMenu" // 菜单路由访问权限
        },
        {
          UserName: "zajdjg", // 用户名
          PassWord: "123456", // 密码
          role: "加工管理", // 角色
          authMenu: "ProManMenu" // 菜单路由访问权限
        },
        {
          UserName: "zajdccwl", // 用户名
          PassWord: "123456", // 密码
          role: "仓储物流管理", // 角色
          authMenu: "StoLManMenu" // 菜单路由访问权限
        }
      ],
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
  created() {},
  methods: {
    // 角色权限菜单处理
    rolesAuthMenu(admin, loginData) {
      let UserName = loginData.UserName;
      let PassWord = loginData.PassWord;
      let ITEM = admin.filter(item => {
        return item.UserName == UserName;
      });
      if (ITEM.length == 0) {
        this.$message({
          type: "error",
          showClose: true,
          message: "输入有误,该用户名不存在"
        });
      } else {
        if (ITEM[0].PassWord == PassWord) {
          // 密码正确 路由跳转
          // 生成随机token
          let token =
            `${new Date().getTime()}` + Math.floor(Math.random() * 1000);
          // token
          sessionStorage.token = token;
          // 登录状态
          sessionStorage.isLogin = true;
          // 角色
          sessionStorage.role = ITEM[0].role;
          // 权限菜单
          sessionStorage.authMenu = ITEM[0].authMenu;
          this.$store.commit("updateToken", { token: token });
          if (sessionStorage.token) {
            this.$router.push({
              path: "/Home"
            });
          }
        } else {
          // 密码输入错误
          this.$message({
            type: "error",
            showClose: true,
            message: "密码输入有误"
          });
        }
      }
    },
    // 登录提交
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
        // 前端临时验证
        this.rolesAuthMenu(this.admin, this.LoginForm);
      }
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
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