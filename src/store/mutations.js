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
};
export default mutations;
