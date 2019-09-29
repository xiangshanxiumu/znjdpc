/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-28 08:56:41
 * @LastEditTime: 2019-09-28 10:14:34
 * @LastEditors: Please set LastEditors
 */
import Vue from 'vue'
import {
  Loading,
  Message,
  MessageBox,
} from 'element-ui';
let loading; //定义loading变量
// 开启loading动画效果
export const startLoading = (loadingText) => {
  if (loadingText == undefined || loadingText == null) {
    loadingText = "加载中..."
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
  if (loading) {
    loading.close()
  }
}
// Message
export const showMessage = (msg,type) => {
  Message({
    showClose: true,
    message: msg,
    type: type,
  })
}
// MessageBox
export const showMessageBox = (title, msg, type) => {
  MessageBox.alert(
    msg, title, {
      confirmButtonText: '确定',
      type: type,
    }
  )
}
// vue全局挂载
Vue.prototype.$loadingShow = (loadingText) => {
  if (loadingText == undefined || loadingText == null) {
    loadingText = "加载中..."
  }
  loading = Loading.service({
    lock: true,
    text: loadingText,
    spinner: "el-icon-loading",
    background: 'rgba(0, 0, 0, 0.7)'
  })
}
Vue.prototype.$loadingHide = () => {
  if (loading) {
    loading.close();
  }
}
