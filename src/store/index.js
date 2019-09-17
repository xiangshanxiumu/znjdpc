import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
// 首页
import home from './modules/home'
// 入仓
import warehousingManagement from './modules/warehousingManagement';
// 出仓
import warehouseManagement from './modules/warehouseManagement';

export default new Vuex.Store({
    modules:{
        home,
        warehousingManagement,
        warehouseManagement
    }
})