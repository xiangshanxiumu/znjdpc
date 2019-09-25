let loading; //定义loading变量
import { Loading } from 'element-ui'; 
// 开启loading动画效果
export const startLoading = (loadingText) => {
  loading = Loading.service({
    lock: true,
    text: loadingText,
    spinner: "el-icon-loading",
    background: 'rgba(0, 0, 0, 0.7)'
  })
}
// 关闭loading动画效果
export const endLoading = () => {
  loading.close()
}
