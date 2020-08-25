<template>
  <div class="home">
    <div class="content flex">
      <setUp :onlySetUp="!showContentPage" :hideSetUp="globalDeviceType==3?true:false"></setUp>
      <contentPage :show="showContentPage||globalDeviceType==3"></contentPage>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import setUp from "@/components/themeOptions/setUp";
import contentPage from "@/components/themeOptions/contentPage";
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
    ...mapState(["screenWidth", "globalDeviceType"]),
  },
  watch: {
    screenWidth(val) {
      this.showContentPage = val <= 600 ? false : true;
    },
  },
  created() {},
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
      this.$store.commit("screenWidth", document.body.offsetWidth);
      this.showContentPage = document.body.offsetWidth <= 600 ? false : true;
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
