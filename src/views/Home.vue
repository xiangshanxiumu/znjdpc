<template>
  <div class="home-wrap">
    <el-container class="home-container">
      <el-header>
        <div class="home-logo">
          <img src="@/assets/logo.png" />
          <span>福建中鞍科技(御管家)管理系统</span>
        </div>
        <div class="personal-msg">个人信息区域</div>
      </el-header>
      <el-container class="home-content">
        <div class="home-aside">
          <!--侧边导航栏菜单-->
          <el-menu
            :collapse="isCollapse"
            @open="handleOpen"
            @close="handleClose"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            :default-active="activeIndex"
            router
          >
            <NavMenu :navMenus="menuData"></NavMenu>
          </el-menu>
          <!--侧边导航栏菜单-->
        </div>
        <el-main>
          <div class="navBar-tags">
            <!--左侧导航条展开收起-->
            <div class="navBar-Btn" @click="collapseClickHandle">
              <img src="@/assets/img/home/cdzk.png" v-show="isCollapse" />
              <img src="@/assets/img/home/cdsq.png" v-show="!isCollapse" />
            </div>
            <!--左侧导航条展开收起-->
            <div class="navBar-breadcrumb">
              <BreadCrumb :breadList="breadList" />
            </div>
          </div>
          <div class="main-content">
            <!--需要缓存的-->
            <keep-alive>
              <router-view v-if="$route.meta.KeepAlive"></router-view>
            </keep-alive>
            <!--需要缓存的-->
            <!--不需要缓存的-->
            <router-view v-if="!$route.meta.KeepAlive"></router-view>
            <!--不需要缓存的-->
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import NavMenu from "@/components/NavMenu";
import BreadCrumb from "@/components/BreadCrumb";
export default {
  // 首页 布局
  name: "Home",
  components: {
    NavMenu,
    BreadCrumb
  },
  data() {
    return {
      isCollapse: false, // 菜单是否收起
      activeIndex: "cggl", // 初始展开菜单
      // 菜单数据
      menuData:[
        {
          entity: {
            id: "cggl",
            path: "/",
            icon: "el-icon-menu",
            name: "合同管理"
          },
          childs:[
            {
              entity: {
                id: "ContractSummary",
                path: "ContractSummary",
                icon: "el-icon-document",
                name: "合同汇总"
              },
            },
            {
              entity: {
                id: "ContractEntry",
                path: "ContractEntry",
                icon: "el-icon-document",
                name: "合同录入"
              },
            }
          ]
        },
        {
          entity: {
            id: "cggl",
            path: "/",
            icon: "el-icon-menu",
            name: "入仓管理"
          },
          childs:[
            {
              entity: {
                id: "gysdab",
                path: "WarehousingSummary",
                icon: "el-icon-document",
                name: "入仓单汇总"
              },
            },
            {
              entity: {
                id: "gysdab",
                path: "WarehouseReceiptEntry",
                icon: "el-icon-document",
                name: "入仓单录入"
              },
            }
          ]
        }
      ],
      // 导航条 面包屑组数据
      breadList: []
    };
  },
  watch:{

  },
  methods: {
    // 菜单展开或收起
    collapseClickHandle() {
      this.isCollapse = !this.isCollapse;
    },
    // 菜单栏展开
    handleOpen(key, keyPath) {
      console.log("open", key, keyPath);
    },
    // 菜单栏收起
    handleClose(key, keyPath) {
      console.log("close", key, keyPath);
    },
    // 获取菜单名
    getMenuName(path,menuData){
      let NAME="";
      menuData.map((item,index)=>{
        if(item.entity.path == path){
          NAME = item.entity.name;
          return NAME;
        } else if(item.childs) {
          this.getMenuName(path,item.childs);
        }
      });
      return NAME;
    },
    // 获取面包屑数据
    getBreadData(arr,menuData){
      // 数据检测
      if(menuData==undefined || !Array.isArray(menuData)) return false;
      if(arr==undefined || !Array.isArray(arr)) return false;
      
      let breadList = [];
      arr.map((path,index)=>{
        let breakName = this.getMenuName(path,menuData);
        console.log("breakName",breakName)
        breadList.push({
          path:path,
          breakName:breakName
        })
      });
      return breadList;
    },
    // 菜单栏选择事件
    handleSelect(key, keyPath) {
      console.log("select", key, keyPath);
      // 获取面包屑数据组
      let arr = keyPath;
      console.log(arr)
      this.breadList =  this.getBreadData(arr,this.menuData);
      console.log(this.breadList);
    },
  }
};
</script>
<style scoped>
.home-wrap {
  width: 100%;
  height: 100%;
}
.home-container {
  width: 100%;
  height: 100%;
}
.home-logo {
  position: absolute;
  left: 20px;
  display: inline-flex;
}
.home-logo > img {
  width: 60px;
  height: 60px;
}
.home-logo > span {
  font-size: 1.5rem;
  font-weight: 700;
  font-family: "songti";
}
.personal-msg {
  position: absolute;
  right: 20px;
  width: 100px;
  height: 60px;
  background-color: #d3dce6;
}
.el-header {
  background-color: skyblue;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  /* line-height: 160px; */
  padding: 0px;
  display: flex;
  flex-direction: column;
}
.navBar-tags {
  width: 100%;
  /* height: 60px; */
  padding: 10px;
  text-align: left;
  background-color: #909399;
  display: flex;
  align-items: center;
}
.navBar-Btn {
  cursor: pointer;
}
.navBar-breadcrumb {
  font-size: 1rem;
  padding: 1rem;
}
.main-content {
  flex: 1;
  display: flex;
}
.home-content {
  display: flex;
}
.home-aside {
  width: auto;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>