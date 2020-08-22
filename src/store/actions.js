const actions = {
  getPageData({ commit, state }) {
    // 添加页面组件
    let components = state.commonComponentModel.componentsList;
    components.forEach((item, index) => {
      item.id = index;
    })
    commit("modelClass/setCurrentPageInfo", {
      components
    });
  }
};
export default actions;
