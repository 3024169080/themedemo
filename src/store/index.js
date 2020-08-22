import Vue from "vue";
import Vuex from "vuex";
import commonComponentModel from "./commonComponentModel";
import actions from "./actions";
import mutations from "./mutations";
import modelClass from "./modules/modelClass.js";

Vue.use(Vuex);

const state = {
  screenWidth: 0, //设备宽度
  showMoblie: false, //手机模式
  commonComponentModel //普通类组件
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
