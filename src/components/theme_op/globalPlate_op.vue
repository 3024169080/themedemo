<template>
  <!-- 板式 -->
  <div class="globalPlate_op">
    <div class="options_block bs">
      <p class="title">标题</p>
      <div class="cont">
        <div class="itemNoFlex">
          <p class="sTitle">尺寸</p>
          <div class="slider flex">
            <el-slider v-model="titleSize" :min="14" :max="40"></el-slider>
            <p class="sliderRight">{{titleSize+'px'}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="options_block bs">
      <p class="title">正文</p>
      <div class="cont">
        <div class="itemNoFlex">
          <p class="sTitle">尺寸</p>
          <div class="slider flex">
            <el-slider v-model="textSize" :min="12" :max="20"></el-slider>
            <p class="sliderRight">{{textSize+'px'}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "globalPlate_op",
  data() {
    return {};
  },
  components: {},
  computed: {
    globleThemeData() {
      return this.$store.state.globleThemeData;
    },
    // 标题文字尺寸
    titleSize: {
      get() {
        return this.globleThemeData.globalPlate.componentData.title_op.fontSize;
      },
      set(val) {
        this.globleThemeData.globalPlate.componentData.title_op.fontSize = val;
      },
    },
    // 正文文字尺寸
    textSize: {
      get() {
        return this.globleThemeData.globalPlate.componentData.text_op.fontSize;
      },
      set(val) {
        this.globleThemeData.globalPlate.componentData.text_op.fontSize = val;
      },
    },
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.globalPlate_op {
}
</style>
