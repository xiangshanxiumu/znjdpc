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
      <div class="home-personal">个人信息区域</div>
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
          <NavMenu :navMenus="menuData"></NavMenu>
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
    <!-- <el-container class="home-container">
      <el-header>
        <div class="home-logo">
          <img src="@/assets/logo.png" />
          <span>福建中鞍科技(御管家)管理系统</span>
        </div>
        <div class="personal-msg">个人信息区域</div>
      </el-header>
      <el-container class="home-content">
        <div class="home-aside">
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
            <NavMenu :navMenus="menuData"></NavMenu>
          </el-menu>
        </div>
        <el-main>
          <div>
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
          <div class="main-content">
            <keep-alive>
              <router-view v-if="$route.meta.KeepAlive"></router-view>
            </keep-alive>

            <router-view v-if="!$route.meta.KeepAlive"></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>-->
  </div>
</template>
<script>
import NavMenu from "@/components/NavMenu";
import BreadCrumb from "@/components/BreadCrumb";
import NavTags from "@/components/NavTags";
import { mapGetters } from "vuex";
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
      isCollapse: false, // 菜单是否收起
      activeMenuIndex: "cggl", // 初始展开菜单
      // 菜单数据
      menuData: [
        {
          entity: {
            id: "cggl",
            path: "资金管理",
            icon: "el-icon-menu",
            name: "资金管理"
          },
          childs: [
            {
              entity: {
                id: "ContractSummary",
                path: "ContractSummary",
                icon: "el-icon-document",
                name: "合同汇总"
              }
            },
            {
              entity: {
                id: "ContractEntry",
                path: "ContractEntry",
                icon: "el-icon-document",
                name: "合同录入"
              }
            },
            {
              entity: {
                id: "PaymentApplicationFormEntry",
                path: "PaymentApplicationFormEntry",
                icon: "el-icon-document",
                name: "付款申请单录入"
              }
            },
            {
              entity: {
                id: "ReceivingApplicationFormEntry",
                path: "ReceivingApplicationFormEntry",
                icon: "el-icon-document",
                name: "收款通知单录入"
              }
            },
            {
              entity: {
                id: "SummaryOfReceiptsAndPayments",
                path: "SummaryOfReceiptsAndPayments",
                icon: "el-icon-document",
                name: "收付款汇总表"
              }
            }
          ]
        },
        {
          entity: {
            id: "cggl",
            path: "入仓管理",
            icon: "el-icon-menu",
            name: "入仓管理"
          },
          childs: [
            {
              entity: {
                id: "gysdab",
                path: "WarehousingReceiptEntry",
                icon: "el-icon-document",
                name: "入仓单录入"
              }
            },
            {
              entity: {
                id: "gysdab",
                path: "WarehousingSummary",
                icon: "el-icon-document",
                name: "入仓单汇总"
              }
            },
            {
              entity: {
                id: "gysdab",
                path: "采购合同管理",
                icon: "el-icon-menu",
                name: "采购合同管理"
              },
              childs: [
                {
                  entity: {
                    id: "gysdab",
                    path: "ProcurementContractEntry",
                    icon: "el-icon-document",
                    name: "采购合同录入"
                  }
                },
                {
                  entity: {
                    id: "gysdab",
                    path: "ProcurementContractSummary",
                    icon: "el-icon-document",
                    name: "采购合同汇总"
                  }
                }
              ]
            },
            {
              entity: {
                id: "gysdab",
                path: "仓储合同管理",
                icon: "el-icon-menu",
                name: "仓储合同管理"
              },
              childs: [
                {
                  entity: {
                    id: "gysdab",
                    path: "WarehousingContractEntry",
                    icon: "el-icon-document",
                    name: "仓储合同录入"
                  }
                },
                {
                  entity: {
                    id: "gysdab",
                    path: "WarehousingContractSummary",
                    icon: "el-icon-document",
                    name: "仓储合同汇总"
                  }
                },
                {
                  entity: {
                    id: "gysdab",
                    path: "LogisticsContractEntry",
                    icon: "el-icon-document",
                    name: "物流合同录入"
                  }
                },
                {
                  entity: {
                    id: "gysdab",
                    path: "LogisticsContractsSummary",
                    icon: "el-icon-document",
                    name: "物流合同汇总"
                  }
                }
              ]
            }
          ]
        },
        {
          entity: {
            id: "cggl",
            path: "出仓管理",
            icon: "el-icon-menu",
            name: "出仓管理"
          },
          childs: [
            {
              entity: {
                id: "gysdab",
                path: "WarehouseEntry",
                icon: "el-icon-document",
                name: "出仓单录入"
              }
            },
            {
              entity: {
                id: "gysdab",
                path: "WarehouseSummary",
                icon: "el-icon-document",
                name: "出仓单汇总"
              }
            },
            {
              entity: {
                id: "gysdab",
                path: "销售合同",
                icon: "el-icon-menu",
                name: "销售合同管理"
              },
              childs: [
                {
                  entity: {
                    id: "gysdab",
                    path: "SalesContractEntry",
                    icon: "el-icon-document",
                    name: "销售合同录入"
                  }
                },
                {
                  entity: {
                    id: "gysdab",
                    path: "SalesContractSummary",
                    icon: "el-icon-document",
                    name: "销售合同汇总"
                  }
                }
              ]
            }
          ]
        },
        {
          entity: {
            id: "cggl",
            path: "加工管理",
            icon: "el-icon-menu",
            name: "加工管理"
          },
          childs: [
            {
              entity: {
                id: "gysdab",
                path: "OutsourcingProcessingEntry",
                icon: "el-icon-document",
                name: "委外加工单录入"
              }
            },
            {
              entity: {
                id: "gysdab",
                path: "OutsourcingProcessingSummary",
                icon: "el-icon-document",
                name: "委外加工单汇总"
              }
            },
            {
              entity: {
                id: "gysdab",
                path: "委外加工合同管理",
                icon: "el-icon-menu",
                name: "委外加工合同管理"
              },
              childs: [
                {
                  entity: {
                    id: "gysdab",
                    path: "OutsourcingProcessingContractEntry",
                    icon: "el-icon-document",
                    name: "委外加工合同录入"
                  }
                },
                {
                  entity: {
                    id: "gysdab",
                    path: "OutsourcingProcessingContractSummary",
                    icon: "el-icon-document",
                    name: "委外加工合同汇总"
                  }
                }
              ]
            }
          ]
        }
      ],
      // 导航条 面包屑组数据
      breadList: [],
      menuMap: [], // 菜单路由映射表,
      dynamicTags: [], // 动态tags
      activeTagIndex: 0
    };
  },
  // computed:{
  //   ...mapGetters(['menuMap','breadList','dynamicTags'])
  // },
  watch: {
    // 监控路由变化
    $route: {
      handler(val, oldval) {
        if (val.path) {
          let curPath = val.path;
          if (val.path.match("/") != null) {
            curPath = val.path.substring(1);
          }
          this.addTag(curPath);
        }
      }
    }
  },
  created() {
    // 生成菜单路由名称映射表
    this.getMenuMap(this.menuData);
    this.$store.commit("updateMenuMap", { menuMap: this.menuMap });
  },
  mounted() {
    // 生成菜单路由名称映射表
    // this.getMenuMap(this.menuData);
  },
  methods: {
    getMenuMap(menuData) {
      menuData.map((item, index) => {
        if (item.entity) {
          this.menuMap.push({
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
      // 清除 undefined
      this.dynamicTags = this.dynamicTags.filter(item => {
        return item != undefined;
      });
      if (this.dynamicTags.length != 0) {
        isHas = this.dynamicTags.some(item => {
          return item.path == path;
        });
      }
      // 不存在情况下 添加tags
      if (!isHas) {
        let tagItem = this.menuMap.find(item => {
          return item.path == path;
        });
        this.dynamicTags.push(tagItem);
        this.activeTagIndex = this.dynamicTags.length - 1;
        console.log("44", this.dynamicTags);
      } else {
        // tags已经添加的情况下
        this.activeTagIndex = this.dynamicTags.findIndex((item, index) => {
          return item.path == path;
        });
        console.log("55", this.dynamicTags);
      }
    },
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
    // 菜单栏选择事件
    handleSelect(key, keyPath) {
      // 每次菜单选择先清空
      this.breadList = [];
      // 获取面包屑数据组
      let arr = keyPath;
      arr.map((path, index) => {
        let list = this.menuMap.filter((menuItem, index) => {
          return menuItem.path == path;
        });
        this.breadList = this.breadList.concat(list);
      });
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
.home-page-content{
  text-align: center;
  width:100%;
  height:auto;
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