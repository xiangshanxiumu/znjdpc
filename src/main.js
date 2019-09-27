import Vue from 'vue'
// import 'normalize.css';

import App from './App'
import router from './router'
import store from './store'
// 导入全局封装的http(基于axios)
import http  from './global/http';
// 全局挂载到vue上
Vue.prototype.$http = http;
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
