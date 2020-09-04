<template>
  <!-- 颜色 -->
  <div class="globalColor_op">
    <div class="options_block bs">
      <p class="title">页面</p>
      <div class="cont">
        <div class="item flex">
          <el-color-picker
            v-model="backgroundColor"
            show-alpha
            :predefine="predefineColors"
            size="small"
          ></el-color-picker>
          <p class="name">背景</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { predefineColors } from "@/assets/js/baseData";
export default {
  name: "globalColor_op",
  data() {
    return {
      predefineColors,
    };
  },
  components: {},
  computed: {
    // 背景色
    backgroundColor: {
      get() {
        return this.$store.state.globleThemeData.globalColor.componentData
          .page_op.pageColor;
      },
      set(val) {
        this.$store.state.globleThemeData.globalColor.componentData.page_op.pageColor = val;
      },
    },
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.globalColor_op {
  margin-top: 10px;
}
</style>
