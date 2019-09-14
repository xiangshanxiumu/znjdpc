<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-14 09:30:21
 * @LastEditTime: 2019-09-14 18:10:06
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="BreadCrumb-wrap">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item class="BreadCrumb-item">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item,index) in BreadList" :key="index" @click="breadCrumbClickHandle(item.path)">{{item.name}}</el-breadcrumb-item>
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