<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-14 09:30:21
 * @LastEditTime: 2019-09-15 15:46:37
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div id="app-box">
          <!-- <transition name="fade"> -->
            <!--需要缓存的-->
            <keep-alive>
              <router-view v-if="$route.meta.KeepAlive"></router-view>
            </keep-alive>
            <!--需要缓存的-->
          <!-- </transition>
          <transition name="fade"> -->
            <!--不需要缓存的-->
            <router-view v-if="!$route.meta.KeepAlive"></router-view>
            <!--不需要缓存的-->
          <!-- </transition> -->
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
