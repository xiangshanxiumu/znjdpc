/*
 * @Description: In User Settings Edit
 * @Author: xiangshanxiumu
 * @Date: 2019-09-14 16:10:33
 * @LastEditTime: 2019-09-14 16:19:45
 * @LastEditors: Please set LastEditors
 */
export default {
    state:{
        // 菜单路由映射表,
        menuMap:[],
        // 导航条 面包屑组数据
        breadList: [],
        // 动态tags
        dynamicTags: [],
    },
    getters:{
        menuMap:(state)=>state.menuMap,
        breadList:(state)=>state.breadList,
        dynamicTags:(state)=>state.dynamicTags,
    },
    mutations:{
        updateMenuMap(state,payload){
            state.menuMap = payload.menuMap;
        },
        updateBreadList(state,payload){
            state.breadList = payload.breadList;
        },
        updateDynamicTags(state,payload){
            state.dynamicTags = payload.dynamicTags;
        },
    },
    actions:{
        changeUpdateMenuMap(context,payload){
            context.commit('updateMenuMap',payload)
        }
    }
}
