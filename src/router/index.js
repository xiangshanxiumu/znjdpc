/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-14 09:30:21
 * @LastEditTime: 2019-09-14 17:21:36
 * @LastEditors: Please set LastEditors
 */
import Vue from 'vue'
import Router from 'vue-router'

import home from './home'

Vue.use(Router)

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};
export default new Router({
  mode:'history',
  routes: [
    ...home
  ]
})
