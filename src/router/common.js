// 公共模块路由 404 timeout 等等
export default [
    {
        path:'/NotFund', // 404
        name:'NotFund',
        component:()=>import('@/views/common/NotFund'),
    },
    {
        path:'/TimeOut', // 超时
        name:'TimeOut',
        component:()=>import('@/views/common/TimeOut')
    }
]