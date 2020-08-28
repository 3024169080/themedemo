const mutations = {
  changeDeviceType(state, val) {
    state.globalDeviceType = val;
  },
  screenWidth(state, val) {
    state.screenWidth = val;
  },
  previewWidth(state, val) {
    state.previewWidth = val;
  },
  /* 运维操作 */
  setAccount(state, { themId }) {
    if (themId != undefined) {
      state.account.userAdmin = true;
      state.account.themId = themId;
    } else {
      state.account.userAdmin = false;
    }
  },
  //页面信息
  SET_PAGELIST(state, val) {
    state.pageList = val;
  }
};
export default mutations;
