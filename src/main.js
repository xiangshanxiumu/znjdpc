/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-14 09:30:21
 * @LastEditTime: 2019-09-15 16:11:11
 * @LastEditors: Please set LastEditors
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import 'normalize.css/normalize.css'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// import 'normalize.css';

import App from './App'
import router from './router'
import store from './store'
// 导入全局封装的http(基于axios)
import http  from './global/http';
// 全局挂载到vue上
Vue.prototype.$http = http;
// Vue.use(ElementUI)
// 基于element导航菜单 div替换 递归菜单收起时文字隐藏
import Fragment from 'vue-fragment'
Vue.use(Fragment.Plugin)

Vue.config.productionTip = false

/* eslint-disable no-new */
const vm = new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#znjd')
