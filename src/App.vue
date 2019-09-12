<template>
  <div id="app-box">
          <transition name="fade">
            <!--需要缓存的-->
            <keep-alive>
              <router-view v-if="$route.meta.KeepAlive"></router-view>
            </keep-alive>
            <!--需要缓存的-->
          </transition>
          <transition name="fade">
            <!--不需要缓存的-->
            <router-view v-if="!$route.meta.KeepAlive"></router-view>
            <!--不需要缓存的-->
          </transition>
  </div>
</template>

<script>
// 统一初始样式
import "@/assets/css/normalize.css";
// 公共样式
import "@/assets/css/common.css";
export default {
  name: "App"
};
</script>
<style scoped >
#app-box {
  width: 100%;
  height: 100%;
}
.home-container {
  width: 100%;
  height: 100%;
}
.home-logo{
  position: absolute;
  left:20px;
  display: inline-flex;
}
.home-logo>img{
  width:60px;
  height:60px;
}
.home-logo>span{
  font-size: 1.5rem;
  font-weight: 700;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  transition: all 0.5s linear;
}
.fade-leave-active {
  transition: all 0.5s linear;
  opacity: 0;
}
</style>
