// 首页
const Home = () =>import('@/views/home');

// 合同管理模块路由
import contractManagement from './contractManagement';
// 
import warehousingManagement from './warehousingManagement';
export default [
      {
        path: '/',
        name: 'Home',
        component:Home,
        // 子路由
        children:[
          ...contractManagement,
          ...warehousingManagement
        ]
      }
]