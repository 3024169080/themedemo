<template>
  <div class="home">
    <Headers @saveAll="saveAll"></Headers>
    <div class="content flex" ref="content">
      <setUp :onlySetUp="!showContentPage" :hideSetUp="globalDeviceType==3?true:false"></setUp>
      <contentPage :show="showContentPage||globalDeviceType==3"></contentPage>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import bus from "@/assets/js/eventBus";
import Headers from "@/components/Headers";
import setUp from "@/components/themeOptions/setUp";
import contentPage from "@/components/themeOptions/contentPage";
import $ from "jquery";
import { getOssConfig } from "@/api/index";
import globleThemeAPI from "@/api/theme/globleTheme";
import { themePagesInfo } from "@/api/theme/themePages.js";
import { singlePageInfo } from "@/api/theme/singlePage.js";
import { updatePageInfo } from "@/api/theme/updatePage.js";
import { publishOrUnPublishPage } from "@/api/theme/publishPage.js";
import { mapState } from "vuex";
export default {
  name: "home",
  data() {
    return {
      showContentPage: false,
      saveFlag: false,
      initModelList: [],
      dropdownIndex: -1,
      itemZoomShow: false,
      shopid: this.$route.query.shopid || -1,
      themeId: this.$route.query.themeId || -1, //运维环境
      pageList: [], //页面组件
      contentLoad: false,
      updateValue: {
        defaultFlag: 0,
        languageCode: "string",
        pageCode: 1,
        pageData: "string",
        pageSettingData: "",
        pageDescription: "string",
        pageType: 2,
        publishFlag: 0,
        id: 0,
        shopId: -1,
        shopPageDatas: [],
      },
    };
  },
  components: {
    setUp,
    contentPage,
    Headers,
  },
  computed: {
    ...mapState(["screenWidth", "previewWidth", "globalDeviceType"]),
    getComponentList() {
      return this.$store.state.modelClass.currentPageInfo.components;
    },
  },
  watch: {
    screenWidth(val) {
      this.showContentPage = val <= 600 ? false : true;
    },
    globalDeviceType(val) {
      this.initView();
      bus.$emit("initComponentsView");
    },
  },
  created() {
    var confirm_msg =
      "-------------\n如果选择离开，您的数据将得不到保存，您确定离开吗？\n-------------";
    window.onbeforeunload = function (event) {
      event = event || window.event;
      event.returnValue = confirm_msg;
    };
    window.localStorage.setItem("Mayi-Token", this.$route.query.token);
    this.$store.commit("setAccount", { themeId: this.$route.query.themeId }); //是否为运维状态
    this.$store.state.token = window.localStorage.getItem("Mayi-Token"); //token
    this.getThemeInfo(); //获取主题全局信息
    this.getThemePagesInfo(); //获取主题页面信息
  },
  mounted() {
    let that = this;
    that.initView();
    window.addEventListener("resize", function () {
      that.initView();
    });
  },
  methods: {
    initView() {
      this.showContentPage = document.body.offsetWidth <= 600 ? false : true;
      this.$store.commit("screenWidth", document.body.offsetWidth);
      if (this.globalDeviceType == 1) {
        this.$store.commit("previewWidth", 375);
      } else if (this.globalDeviceType == 2) {
        this.$store.commit("previewWidth", document.body.offsetWidth - 280);
      } else if (this.globalDeviceType == 3) {
        this.$store.commit("previewWidth", document.body.offsetWidth - 20);
      }
    },
    getThemeInfo() {
      globleThemeAPI
        .shopCmsTheme(this.$route.query.shopThemeId)
        .then((response) => {
          this.responseGetThemeInfo(response);
        })
        .catch((err) => {});
    },
    responseGetThemeInfo(response) {
      if (response.data.code == 200) {
        if (response.data.data.themeData != "") {
          this.$store.state.globleThemeData = {
            ...this.$store.state.globleThemeData,
            ...JSON.parse(response.data.data.themeData),
          };
        }
      }
    },
    //获取主题页面
    getThemePagesInfo(state) {
      themePagesInfo({
        shopid: this.shopid,
      })
        .then((response) => {
          this.responseThemePagesInfo(response, state);
        })
        .catch((err) => {});
    },
    responseThemePagesInfo(response, state) {
      if (response.data.code == 200) {
        this.contentLoad = true;
        console.log("获取页面列表信息：", response);
        this.pageList = response.data.data;
        this.$store.commit("SET_PAGELIST", this.pageList);
        if (state == "updata") {
          this.getSinglePageInfo(this.pageList[this.dropdownIndex]["id"]);
        } else {
          // if (Array.isArray(this.pageList) && this.pageList.length > 0) {
          // this.dropdownIndex = this.pageList.findIndex(
          //   (item) => item.id == pageid
          // );
          // }
          this.dropdownIndex = 0;
          this.getSinglePageInfo(this.pageList[this.dropdownIndex]["id"]);
        }
      }
    },
    //获取单页信息
    getSinglePageInfo(index) {
      singlePageInfo({ id: index })
        .then((response) => {
          this.responesSinglePageInfo(response);
        })
        .catch((err) => {
          this.saveFlag = false;
        });
    },
    responesSinglePageInfo(response) {
      setTimeout(() => {
        this.contentLoad = false;
      }, 500);
      if (response.status == 200 && response.data.code == 200) {
        console.log("id:" + "获取单页面信息：", response);
        this.$store.commit("modelClass/setOriginPageInfo", response.data.data); //当前页面完整数据

        //页面组件数据 设置数据
        let { pageData: components, pageSettingData } = response.data.data;
        // 转数组
        components =
          components.length > 0 && components.charAt(0) == "["
            ? JSON.parse(response.data.data.pageData)
            : [];
        // 当前页面配置数据（组件，页面设置）
        if (response.data.data.pageType == 2) {
          this.$store.commit("modelClass/setCurrentPageInfo", {
            components,
            pageSettingData,
          });
        }
        // 初始化
        this.$store.commit("modelClass/set_modelListInitFlag", false);
        // bus.$emit("viewInit");
        // bus.$emit("operateInit");
        //改变保存发布页面状态
      }
      this.saveFlag = false;
    },

    // 保存
    saveAll() {
      console.log("----------保存");
      if (this.saveFlag) return;
      this.saveFlag = true;
      console.log(
        this.pageList,
        this.dropdownIndex,
        "-----------------------229"
      );
      if (this.pageList.length <= 0) {
        this.$message({
          type: "warning",
          message: "没有页面可以保存!",
        });
        return;
      }
      this.updateValue.id = this.pageList[this.dropdownIndex]["id"];
      this.updateValue.shopId = this.shopid;
      this.updateValue.pageCode = this.pageList[this.dropdownIndex].pageCode;
      //排序
      for (let i = 0; i < this.getComponentList.length; i++) {
        this.getComponentList[i]["queueNumber"] = i;
      }
      //客户保存
      this.updateValue.pageData = JSON.stringify(this.getComponentList);
      this.updateValue.pageSettingData = JSON.stringify(
        this.getPageSettingData
      );
      console.log(this.updateValue, "----------------------203");
      Promise.all([
        updatePageInfo(this.updateValue),
        globleThemeAPI.updateShopCmsTheme({
          id: this.$route.query.shopThemeId,
          themeData: this.$store.state.globleThemeData,
        }),
      ])
        .then((response) => {
          if (
            response.every((item) => {
              return item.data.code == 200;
            })
          ) {
            this.$message({
              message: "保存成功",
              type: "success",
            });
            if (true) {
              this.publishPage();
            } else {
              this.saveFlag = false;
            }
          } else {
            this.saveFlag = false;
          }
        })
        .catch((err) => {
          this.saveFlag = false;
        });
    },
    // 发布页面
    publishPage() {
      if (this.pageList.length <= 0) {
        this.$message({
          type: "warning",
          message: "没有页面可以发布!",
        });
        return;
      }
      let item = this.pageList[this.dropdownIndex];
      item.publishFlag = 1;
      item.coverPageDataFlag = false;
      publishOrUnPublishPage(item)
        .then((res) => {
          if (res.data.data == "true") {
            // this.$message({
            //   type: "success",
            //   message: "发布成功!",
            // });
            //初始化----------页面
            this.getThemePagesInfo("updata");
            this.$store.commit("modelClass/initPageInfo");
          }
        })
        .catch((err) => {
          this.saveFlag = false;
          this.$message({
            type: "error",
            message: "发布失败!" + err,
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  height: calc(100vh - 50px);
  .content {
  }
}
</style>
