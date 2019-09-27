import Vue from 'vue'
import { Loading } from 'element-ui';
let loading; //定义loading变量
// 开启loading动画效果
export const startLoading = (loadingText) => {
  if(loadingText == undefined ||loadingText==null){
    loadingText="加载中..."
  }
  loading = Loading.service({
    lock: true,
    text: loadingText,
    spinner: "el-icon-loading",
    background: 'rgba(0, 0, 0, 0.7)'
  })
}
// 关闭loading动画效果
export const endLoading = () => {
  if(loading){
    loading.close()
  }
}
// vue全局挂载
Vue.prototype.$loadingShow = (loadingText) =>{
  if(loadingText == undefined ||loadingText==null){
    loadingText="加载中..."
  }
  loading = Loading.service({
    lock: true,
    text: loadingText,
    spinner: "el-icon-loading",
    background: 'rgba(0, 0, 0, 0.7)'
  })
}
Vue.prototype.$loadingHide = ()=>{
  if(loading){
    loading.close();
  }
}