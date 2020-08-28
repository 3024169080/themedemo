<template>
  <div class="home">
    <div class="content flex" ref="content">
      <setUp :onlySetUp="!showContentPage" :hideSetUp="globalDeviceType==3?true:false"></setUp>
      <contentPage :show="showContentPage||globalDeviceType==3"></contentPage>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import bus from "@/assets/js/eventBus";
import setUp from "@/components/themeOptions/setUp";
import contentPage from "@/components/themeOptions/contentPage";
import $ from "jquery";
import { getOssConfig } from "@/api/index";
import globleThemeAPI from "@/api/theme/globleTheme";
import { themePagesInfo } from "@/api/theme/themePages.js";
import { singlePageInfo } from "@/api/theme/singlePage.js";
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
        pageType: 0,
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
  },
  computed: {
    ...mapState(["screenWidth", "previewWidth", "globalDeviceType"]),
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
        if (response.data.data.themeData != ""&&response.data.data.versionNumber!='0.1') {
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
          if (Array.isArray(this.pageList) && this.pageList.length > 0) {
            let pageid = this.$route.query.pageid;
            console.log(pageid, "------------------------130");
            if (pageid == undefined) {
              this.dropdownIndex = this.pageList.findIndex((item) =>
                item.pageCode == "1" && item.publishFlag === undefined
                  ? true
                  : item.publishFlag == "1"
              );
              this.getSinglePageInfo(this.pageList[this.dropdownIndex]["id"]);
            } else {
              this.dropdownIndex = this.pageList.findIndex(
                (item) => item.id == pageid
              );
              this.getSinglePageInfo(pageid);
            }
          }
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
        console.log(response.data.data.versionNumber=='0.1','-----------------------177')
        // 当前页面配置数据（组件，页面设置）
        if(response.data.data.versionNumber!='0.1'){
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
