<template>
<div>
    <el-form :model="form">
        <el-form-item :label-width="formLabelWidth" v-for="(item,index) in FromData" :key="index" :label="item.label">
          <el-input v-model="item.value" auto-complete="off"></el-input>
        </el-form-item>
    </el-form>
</div>
</template>
<script>
export default {
    // 动态生成表单
    name:"DynaactionForm",
    data(){
        return{
            FromData:[]
        }
    }
}
</script>
<style>
</style>