/**卷包相关API */
import http from '@/global/http';
const loadingText = "加载卷包数据中...";
// 加工打包后 添加卷包
export const addRollPack = (data) =>http.post('/api/RollPack/AddRollPack',data);
// 获取卷包数据列表
export const getRollPackList = () =>http.get('/api/RollPack/GetRollPackList',{params:{loadingText:loadingText}});
// 添加卷包 出仓操作
export const addRollPackOutStore = (data) =>http.post('/api/Store/InsertOrUpdateRPStore',data);