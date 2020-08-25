const mutations = {
  changeDeviceType(state, val) {
    state.globalDeviceType = val;
  },
  screenWidth(state, val) {
    state.screenWidth = val;
  }
};
export default mutations;
