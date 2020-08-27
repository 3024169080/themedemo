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
import { mapState } from "vuex";
export default {
  name: "home",
  data() {
    return {
      showContentPage: false,
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
    getOssConfig().then((res) => {
      console.log(res, "-----------------------36");
    });
  },
  mounted() {
    let that = this;
    that.initView();
    window.addEventListener("resize", function () {
      that.initView();
    });
    this.$store.dispatch("getPageData");
  },
  methods: {
    initView() {
      this.showContentPage = document.body.offsetWidth <= 600 ? false : true;
      this.$store.commit("screenWidth", document.body.offsetWidth);
      if(this.globalDeviceType == 1){
        this.$store.commit("previewWidth", 375);
      } else if(this.globalDeviceType == 2) {
        this.$store.commit("previewWidth", document.body.offsetWidth - 280);
      } else if (this.globalDeviceType == 3) {
        this.$store.commit("previewWidth", document.body.offsetWidth - 20);
      }
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
