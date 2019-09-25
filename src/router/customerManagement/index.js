/**客户管理模块 */
// 客户往来账
const CustomerAccount = ()=>import("@/views/customerManagement/CustomerAccount");
export default [
    {
        path:'CustomerAccount',
        name:'CustomerAccount',
        component:CustomerAccount,
        meta:{
            auth:true,
        }
    }
]