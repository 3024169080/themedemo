import Vue from 'vue'
import Vuex from 'vuex'
import actions from "./actions"
import mutations from "./mutations"

Vue.use(Vuex)

const state = {
  screenWidth: 0, //设备宽度
  showMoblie: false//手机模式
};
export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
  }
})
