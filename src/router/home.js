// 首页
const Home = () =>import('@/views/home');

// 合同管理模块路由
// import contractManagement from './contractManagement';
// 资金管理
import fundManagement from './fundManagement';
// 
import warehousingManagement from './warehousingManagement';
//
import warehouseManagement from './warehouseManagement';
//
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
        ]
      }
]