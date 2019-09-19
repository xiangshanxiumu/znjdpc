<template>
  <div class="NotFund-wrap">
    <img class="NotFund-img" src="@/assets/img/common/notFund.jpg" />
    <div class="NotFund-button-wrap">
      <el-tooltip class="item" effect="dark" content="点击返回首页" placement="top">
        <el-button type="success" plain @click="backHome">返回首页</el-button>
      </el-tooltip>
    </div>
  </div>
</template>
<script>
export default {
  // 404 NotFund 页面
  name: "NotFund",
  methods:{
      backHome(){
          this.$router.replace({
              path:"/"
          })
      }
  }
};
</script>
<style scoped>
.NotFund-wrap {
  width: 100%;
  height: 100%;
  position: relative;
}
.NotFund-img {
  width: 100%;
  height: 100%;
}
.NotFund-button-wrap {
  position: absolute;
  bottom: 20%;
  left: 50%;
  transform: translate(-50%);
}
</style>