import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
// 首页
import home from './modules/home'
// common
import common from './modules/common';
// 入仓
import warehousingManagement from './modules/warehousingManagement';
// 出仓
import warehouseManagement from './modules/warehouseManagement';
// 加工
import processingManagement from './modules/processingManagement';
// 所有合同
import contract from './modules/contract';
// 所有仓单
import warehouseReceipt from './modules/warehouseReceipt';
export default new Vuex.Store({
    modules:{
        home,
        common,
        warehousingManagement,
        warehouseManagement,
        processingManagement,
        contract,
        warehouseReceipt,
    }
})