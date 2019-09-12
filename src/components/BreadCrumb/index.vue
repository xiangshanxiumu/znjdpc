<template>
  <div class="BreadCrumb-wrap">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }" class="BreadCrumb-item" @click="breadCrumbClickHandle()">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item,index) in BreadList" :key="index" :to="{ path:item.path }" @click="breadCrumbClickHandle(item.path)">{{item.breakName}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  // 关联导航栏面包屑
  name: "BreadCrumb",
  props:{
      breadList:{
          type:Array,
          default: ()=>{
              return []
          }                                                                                                                                                                                                     
      }
  },
  model:{
     prop:"breadList",
     event:'select'
  },
  data(){
      return{
          BreadList:[]
      }
  },
  watch:{
      breadList:{
          handler(val){
              this.BreadList = val;
          },
          immediate:true,
          deep:true,
      },
      BreadList:{
          handler(val){
              this.$emit('select',val)
          },
          immediate:true,
          deep:true,
      }
  }
};
</script>
<style scoped>
.BreadCrumb-wrap{
    width:auto;
}
.BreadCrumb-item{
    cursor: pointer;
}
</style>