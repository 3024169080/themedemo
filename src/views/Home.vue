<template>
  <div class="home">
    <div class="content flex">
      <setUp :onlySetUp="!showContentPage"></setUp>
      <contentPage :show="showContentPage"></contentPage>
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
      showContentPage: true,
    };
  },
  components: {
    setUp,
    contentPage,
  },
  computed: {
    ...mapState(["screenWidth"]),
  },
  watch: {
    screenWidth(val) {
      this.showContentPage = val <= 600 ? false : true;
      this.$store.commit("showMoblie", val <= 750 ? true : false);
    },
  },
  created() {},
  mounted() {
    let that = this;
    window.addEventListener("resize", function () {
      that.$store.commit("screenWidth", document.body.offsetWidth);
    });
    this.$store.dispatch("getPageData");
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.home {
  height: calc(100vh - 50px);
  .content {
  }
}
</style>
