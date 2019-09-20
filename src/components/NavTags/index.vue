<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-14 11:32:08
 * @LastEditTime: 2019-09-14 18:53:27
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="NavTags-wrap">
    <el-tag
      class="NavTags-item"
      :class="{'NavTags-active':ActiveIndex==index}"
      v-for="(item,index) in DynamicTags"
      :key="index"
      :closable="item.name!='首页'"
      :disable-transitions="false"
      @close="handleClose(index,item)"
      @click="tabClickHandle(index)"
    >{{item.name}}</el-tag>
  </div>
</template>
<script>
export default {
  // 导航菜单标签
  name: "NavTags",
  // model: {
  //   prop: "dynamicTags",
  //   event: "change"
  // },
  props: {
    dynamicTags: {
      type: Array,
      default: () => {
        return [];
      }
    },
    activeTagIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      DynamicTags: [],
      ActiveIndex: 0
    };
  },
  watch: {
    dynamicTags: {
      handler(val) {
        this.DynamicTags = val;
      },
      immediate: true,
      deep: true
    },
    activeTagIndex: {
      handler(val) {
        this.ActiveIndex = val;
      },
      immediate: true
    }
  },
  methods: {
    // tag 删除 关闭页面事件
    handleClose(index, item) {
      let curPath = item.path;
      let INDEX = index;
      // 删除
      this.DynamicTags.splice(index, 1);
      // 如果 关闭是当前路由页面
      if (this.ActiveIndex == index) {
        INDEX = this.DynamicTags.length - 1;
        if(INDEX>=0){
          // 路由改变 active的位置有变化
          this.tabClickHandle(INDEX);
        } else{
          
        }
      } else if (this.ActiveIndex > index) {
        // 删除tag在激活tag排序前面
        // 路由不变 active的位置有变化
        this.ActiveIndex -= 1;
      } else {
        // 删除tag在激活tag排序后面 路由不变 active的位置没有变化
      }
    },
    // tag 点击触发事件
    tabClickHandle(index) {
      this.ActiveIndex = index;
      let path = "/";
      if (index >= 0) {
        path = this.DynamicTags[index].path;
      } else {
        path = '/';
        this.DynamicTags = [];
      }
      // if(path.match('/')==null){
      //   path = '/'+path;
      // }
      this.$router.push({
        path: path
      });
      // 清除 undefined
      this.DynamicTags = this.DynamicTags.filter(item => {
        return item != undefined;
      });
    },
    //首页点击事件
    homeClickHandle(){
      this.$router.replace({
        path:'/Home'
      })
    }
  }
};
</script>
<style scoped lang="less">
.NavTags-wrap {
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
}
.NavTags-item {
  margin:0.5rem;
  // margin-right: 0.5rem;
  cursor: pointer;
}
.NavTags-active {
  background-color: #67c23a;
  color: #fff;
  .el-icon-close {
    color: #fff !important;
  }
}


























</style>