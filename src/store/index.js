import Vue from "vue";
import Vuex from "vuex";
import commonComponentModel from "./commonComponentModel";
import actions from "./actions";
import mutations from "./mutations";
import modelClass from "./modules/modelClass.js";

Vue.use(Vuex);

const state = {
  screenWidth: 0, //设备宽度
  previewWidth: 0, //展示宽度
  globalDeviceType: 2, //设备模式  1手机2PC
  commonComponentModel, //普通类组件
  componentsIndex:0,//当前选中的组件
  //账号登录token
  token: "",
  // 账户信息
  account: {
    //主题运维人员 or 主题使用人员
    userAdmin: true,
    themId: -1
  },
  // 用户信息
  userInfo: {},
  //页面列表
  pageList: [],
  // 全局主题数据 >主题色>主题字号
  globleThemeData:{
    globalColor: {
      id: "",
      componentName: "颜色",
      componentCode: "globalColor",
      componentType: 1,
      queueNumber: 0,
      componentData: { page_op: { pageColor: "rgba(255,255,255,1)" } }
    },
  }
};
export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
    //中间操作平台组件数据
    modelClass
  }
});
