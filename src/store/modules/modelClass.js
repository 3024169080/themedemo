import { pageInfo } from "@/assets/js/module.js";
//渲染页面数据
const state = () => ({
  value: '渲染页',
  // 模拟环境对象
  vContext: {

  },
  // 当前页面源数据
  originPageInfo:{},
  //当前渲染页面信息
  currentPageInfo: pageInfo,
  //初始化组件数据flag
  modelListInitFlag: false,
  //中间显示区域默认组件 底部导航，顶部导航
  defaultCompontentList: []
});
const getters = {
  // 根据索引获取组件
  getComponentIndex: (state) => (val) => {
    return state.currentPageInfo.components.find(item > item.id === val);
  }
};
const mutations = {
  SET_VALUE(state, value) {
    state.value = value;
  },
  // 初始化页面数据
  initPageInfo(state){
    state.currentPageInfo=pageInfo;
    console.log('初始化页面',state.currentPageInfo)
  },
  // 设置currentPageInfo页面数据z
  setCurrentPageInfo(state,{components,pageSettingData}){
    state.currentPageInfo.components=components || [];
    pageSettingData = pageSettingData || JSON.parse(JSON.stringify(pageInfo.pageSettingData));
    state.currentPageInfo.pageSettingData = pageSettingData instanceof Object ? pageSettingData : JSON.parse(pageSettingData);
  },

  //当前页面元数据
  setOriginPageInfo(state,val){
    state.originPageInfo=val
  },

  //删除子组件
  removeModelListChild(state, indexs) {
    state.currentPageInfo.components.splice(indexs, 1);
  },
  // 指定位置添加子组件
  addModelListChild(state, newIndex, item) {
    state.currentPageInfo.components.splice(newIndex, 0, item)
  },
  //追加子组件
  ADD_MODELLISTPUSHCHILD(state, item) {
    state.currentPageInfo.components.push(item)
  },
  ADD_DEFAULTCOMPONTENT(state, item) {
    state.defaultCompontentList = item;
  },
  set_modelListInitFlag(state, item) {
    state.modelListInitFlag = item;
  }
};
const actions = {
  async getInfo({
    state,
    commit
  }, val) {
    commit('SET_VALUE', val);
  },
  // 添加默认组件
  addDefauleCompontent({ commit }, val) {
    commit('ADD_DEFAULTCOMPONTENT', val)
  },
  //追加子组件
  addModellistPushChild({ commit }, val) {
    commit('ADD_MODELLISTPUSHCHILD', val);
  }

};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
