<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-15 17:09:59
 * @LastEditTime: 2019-09-15 17:56:39
 * @LastEditors: Please set LastEditors
 -->
<template>
<div>
    <div class="uploadBox" v-for="(value, key) in imgs" :key="key">
              <img :src="getObjectURL(value)" alt class="uploadImg" />
              <img src="@/assets/img/common/img-delete.png" alt class="closeImg" @click="delImg(key)" />
   </div>
</div>
</template>
<script>
export default {
    name:"FileUploader",
    data(){
        return {
            imgs:[]
        }
    }
}
</script>
<style>
</style>