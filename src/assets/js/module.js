/* 链接模块 */
export const link = {
  name: "选择链接",
  link: "",
  type: 0, // 什么都不选为0  1链接 2功能
  feature: {
    type: "",
    value: ""
  }
};

/* view页面信息 */
export const pageInfo = {
  components: [],
  pageSettingData: {
    globalColor: {
      id: "",
      componentName: "颜色",
      componentCode: "globalColor",
      componentType: 1,
      queueNumber: 0,
      componentData: {
        page_op: { pageColor: "#fff",borderColor:"#fff" },
        button_op: { mainColor:"#fff" }
      }
    },
    globalPlate: {
      id: "",
      componentName: "板式",
      componentCode: "globalPlate",
      componentType: 1,
      queueNumber: 0,
      componentData: {}
    }
  }
}; //页面组件 //1显示 //0 不可自由拖拽  1可移动
