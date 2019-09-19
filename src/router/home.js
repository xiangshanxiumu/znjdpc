// 首页
const Home = () =>import('@/views/home');

// 合同管理模块路由
// 资金管理
import fundManagement from './fundManagement';
// 入仓管理模块
import warehousingManagement from './warehousingManagement';
// 出仓管理模块
import warehouseManagement from './warehouseManagement';
// 加工管理模块
import processingManagement from './processingManagement';
export default [
      {
        path: '/',
        name: 'Home',
        component:Home,
        // 子路由
        children:[
          // ...contractManagement,
          ...fundManagement,
          ...warehousingManagement,
          ...warehouseManagement,
          ...processingManagement
        ],
        // meta:{
        //     KeepAlive:true,
        // }
      }
]