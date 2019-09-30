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
// 仓储物流模块
import warehouseLogistics from './warehouseLogistics';
// 营销管理
import marketManagement from './marketManagement';
// 综合管理
import comprehensiveManagement from './comprehensiveManagement';
// 高层管理
import TopManagement from './TopManagement';
export default [
      {
        path: '/Home',
        name: 'Home',
        component:Home,
        // 子路由 
        children:[
          ...fundManagement,
          ...warehousingManagement,
          ...warehouseManagement,
          ...processingManagement,
          ...warehouseLogistics,
          ...marketManagement,
          ...comprehensiveManagement,
          ...TopManagement
        ],
        meta:{
            // KeepAlive:true,
            auth:true,
        }
      }
]