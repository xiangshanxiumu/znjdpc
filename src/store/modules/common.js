// 全局公共数据
export default {
  state: {
    token: "",
    isLogin: false,
    isLoading:false, // 是否loading状态
    // 前端临时设置的管理员权限信息 路由控制
    admin: [{
        UserName: "zajd", // 用户名 "中鞍机电管理"
        PassWord: "123456", // 密码
        role: "总管理", // 角色
        authMenu: "menuMap", // 菜单路由访问权限
      },
      {
        UserName: "zajdcw", // 用户名
        PassWord: "123456", // 密码
        role: "财务管理", // 角色
        authMenu: "fundManMenu", // 菜单路由访问权限
      },
      {
        UserName: "zajdcg", // 用户名
        PassWord: "123456", // 密码
        role: "采购管理", // 角色
        authMenu: "PurManMenu", // 菜单路由访问权限
      },
      {
        UserName: "zajdxs", // 用户名
        PassWord: "123456", // 密码
        role: "销售管理", // 角色
        authMenu: "SaleManMenu", // 菜单路由访问权限
      },
      {
        UserName: "zajdjg", // 用户名
        PassWord: "123456", // 密码
        role: "加工管理", // 角色
        authMenu: "ProManMenu", // 菜单路由访问权限
      },
      {
        UserName: "zajdccwl", // 用户名
        PassWord: "123456", // 密码
        role: "仓储物流管理", // 角色
        authMenu: "StoLManMenu", // 菜单路由访问权限
      }
    ],
  },
  getters: {
    token: (state) => state.token,
    isLogin: (state) => state.isLogin,
    admin: (state) => state.admin,
  },
  mutations: {
    updateToken(state, payload) {
      state.token = payload.token;
    },
    isLogin(state, payload) {
      state.isLogin = payload.isLogin;
    },
  }
}
