<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-14 09:30:21
 * @LastEditTime: 2019-09-15 16:03:00
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="home-wrap">
    <div class="home-header">
      <div class="home-logo">
        <img src="@/assets/logo.png" />
        <span>福建中鞍科技(御管家)管理系统</span>
      </div>
      <div class="home-personal">
        <div class="home-personal-msg">个人信息区域</div>
        <el-button @click="logOut">退出</el-button>
      </div>
    </div>
    <div class="home-body">
      <div class="home-left">
        <el-menu
          :collapse="isCollapse"
          @open="handleOpen"
          @close="handleClose"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :default-active="activeMenuIndex"
          router
        >
          <NavMenu :navMenus="roleMenu"></NavMenu>
        </el-menu>
      </div>
      <div class="home-right">
        <div class="home-topBar">
          <div class="home-navBar">
            <div class="navBar-Btn" @click="collapseClickHandle">
              <img src="@/assets/img/home/cdzk.png" v-show="isCollapse" />
              <img src="@/assets/img/home/cdsq.png" v-show="!isCollapse" />
            </div>
            <div class="navBar-breadcrumb">
              <BreadCrumb v-model="breadList" />
            </div>
          </div>
          <div class="home-tags">
            <NavTags :dynamicTags="dynamicTags" :activeTagIndex="activeTagIndex" />
          </div>
        </div>
        <div class="home-content">
          <div class="home-page-content">
            <keep-alive>
              <router-view v-if="$route.meta.KeepAlive"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.KeepAlive"></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NavMenu from "@/components/NavMenu";
import BreadCrumb from "@/components/BreadCrumb";
import NavTags from "@/components/NavTags";
import { mapGetters } from "vuex";
import {
  getAllCID,
  getAllContractList,
  getAllGlobalInitData
} from "@/api/Contract";
// import { getAllWarehousingReceipt } from "@/api/WarehouseReceipt";
export default {
  // 首页 布局
  name: "Home",
  components: {
    NavMenu,
    BreadCrumb,
    NavTags
  },
  data() {
    return {
      roleMenu: [], // 当前角色权限菜单
      isCollapse: false, // 菜单是否收起
      activeMenuIndex: "资金管理", // 初始展开菜单
      // 导航条 面包屑组数据
      breadList: [],
      dynamicTags: [{ name: "刷新", path: "/Home" }], // 动态tags
      activeTagIndex: 0
    };
  },
  computed: {
    ...mapGetters([
      "menuMap",
      "fundManMenu",
      "PurManMenu",
      "SaleManMenu",
      "ProManMenu",
      "StoLManMenu"
    ])
  },
  watch: {
    // 监控路由变化
    $route: {
      handler(val, oldval) {
        if (val.path) {
          let curPath = val.path;
          this.addTag(curPath);
        }
      }
    }
  },
  created() {
    // 获取全局初始数据
    this.getGlobalData();
    // 初始菜单渲染
    if (sessionStorage.authMenu) {
      this.roleMenu = this[`${sessionStorage.authMenu}`];
    }
    // 销售管理 权限角色 添加上 入仓单汇总表 路由
    // if (sessionStorage.role == "销售管理") {
    //   let menuItem = {
    //     entity: {
    //       id: "WarehousingSummary",
    //       path: "/Home/WarehousingSummary",
    //       icon: "el-icon-document",
    //       name: "入仓明细汇总表"
    //     }
    //   };
    //   // 插入 入仓单汇总表路由数据
    //   this.roleMenu[0].childs.splice(3, 0, menuItem);
    // }
    // 生成菜单路由名称映射表 渲染菜单
    this.getMenuMap(this.roleMenu);
  },
  methods: {
    // 获取全局初始数据
    async getGlobalData() {
      let result = await getAllGlobalInitData();
      if (result) {
        // 合同ID数据列表
        if (result[0]) {
          let list = result[0].Result;
          let CIDList = list.map(item => {
            return {
              value: `${item.CID}(${item.Type})`,
            };
          });
          // 提交store
          this.$store.commit("updteCIDList", { CIDList: CIDList });
        }
        // 牌号 品名 规格 仓库 单位 综合数据
        if (result[1]) {
          if (result[1].Result) {
            let obj = result[1].Result;
            for (let k in obj) {
              obj[k] = obj[k].map(item => {
                return {
                  value: item
                };
              });
              // 过滤掉null 空值
              obj[k] = obj[k].filter(item => {
                return item.value != null && item.value != "";
              });
            }
            // 牌号 品名 规格 仓库 单位
            let {
              BrandList,
              GNameList,
              StandardsList,
              StoreList,
              UnitList
            } = obj;
            // 提交store
            this.$store.commit("updateInitGlobalData", { InitGlobalData: obj });
          }
        }
        // 所有合同列表数据
        if (result[2]) {
          if (result[2].Result) {
            let list = [].concat(result[2].Result);
            // 提交store
            this.$store.commit("updteAllContract", {
              AllContract: list
            });
          }
        }
      }
    },
    // 生成菜单路由名称映射表
    getMenuMap(menuData) {
      menuData.map((item, index) => {
        if (item.entity) {
          this.roleMenu.push({
            path: item.entity.path,
            name: item.entity.name
          });
        }
        if (item.childs) {
          this.getMenuMap(item.childs);
        }
      });
    },
    // 菜单栏选择时 添加tag
    addTag(path) {
      // 首先判断是否存在
      let isHas = false;
      if (this.dynamicTags.length != 0) {
        isHas = this.dynamicTags.some(item => {
          return item.path == path;
        });
      }
      // 不存在情况下 添加tags
      if (!isHas) {
        let tagItem = this.roleMenu.find(item => {
          return item.path == path;
        });
        this.dynamicTags.push(tagItem);
        this.activeTagIndex = this.dynamicTags.length - 1;
      } else {
        // tags已经添加的情况下
        this.activeTagIndex = this.dynamicTags.findIndex((item, index) => {
          return item.path == path;
        });
      }
    },
    // 菜单展开或收起
    collapseClickHandle() {
      this.isCollapse = !this.isCollapse;
    },
    // 菜单栏展开
    handleOpen(key, keyPath) {
      // console.log("open", key, keyPath);
    },
    // 菜单栏收起
    handleClose(key, keyPath) {
      // console.log("close", key, keyPath);
    },
    // 菜单栏选择事件
    handleSelect(key, keyPath) {
      // 每次菜单选择先清空
      this.breadList = [];
      // 获取面包屑数据组
      let arr = keyPath;
      arr.map((path, index) => {
        let list = this.roleMenu.filter((menuItem, index) => {
          return menuItem.path == path;
        });
        this.breadList = this.breadList.concat(list);
      });
    },
    // 登录退出
    logOut() {
      sessionStorage.clear(); // 清楚所有的sessionStorsage信息
      this.$router.replace("/Login");
    }
  }
};
</script>
<style scoped>
.home-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}
.home-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* height: 60px;
  line-height: 60px; */
  color: #333;
  background-color: cornflowerblue;
}
.home-logo {
  display: inline-flex;
  padding: 0.25rem 1rem;
  align-items: center;
}
.home-logo > img {
  width: 3rem;
  height: 3rem;
}
.home-logo > span {
  font-size: 1.5rem;
  font-weight: 700;
  font-family: "songti";
  padding: 0rem 0.5rem;
}
.home-personal {
  display: inline-flex;
  padding: 0.25rem 1rem;
  align-items: center;
  /* background-color: #d3dce6; */
}
.home-personal-msg {
  padding: 0rem 1rem;
}
.home-body {
  flex: 1;
  display: flex;
  box-sizing: border-box;
  overflow-y: auto;
}
.home-left {
  background-color: #d3dce6;
  color: #333;
}
.home-right {
  flex: 1;
  background-color: #e9eef3;
  color: #333;
  display: flex;
  flex-direction: column;
}
.home-topBar {
  text-align: left;
  background-color: #d3dce6;
}
.home-content {
  flex: 1;
  box-sizing: border-box;
  overflow-y: auto;
}
.home-page-content {
  text-align: center;
  width: 100%;
  height: auto;
}
.home-navBar {
  width: 100%;
  padding: 0.5rem;
  text-align: left;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
}
.home-tags {
  text-align: left;
  padding: 0.5rem;
  background-color: #fff;
}
.navBar-Btn {
  cursor: pointer;
}
.navBar-breadcrumb {
  font-size: 1rem;
  padding: 1rem;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>