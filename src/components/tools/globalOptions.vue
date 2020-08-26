<template>
  <!-- 模板设置 -->
  <div class="globalOptions bs">
    <div
      class="list"
      v-for="(item,key,index) in pageSettingData"
      :key="index"
      @click="showComponentsOptions(item,key,index)"
    >
      <div class="model-box flex" :title="item.componentName">
        <div class="namebox flex">
          <i class="iconfont iconshezhi"></i>
          <p class="line-clamp1">{{item.componentName}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import bus from "@/assets/js/eventBus";
export default {
  name: "globalOptions",
  data() {
    return {};
  },
  components: {},
  computed: {
    pageSettingData() {
      return this.$store.state.modelClass.currentPageInfo.pageSettingData;
    },
  },
  created() {},
  mounted() {},
  methods: {
    // 展示修改配置
    showComponentsOptions(item, key, index) {
      console.log(item, key, index, "-----------------34");
      bus.$emit("showComOptions", 2, true, key);
    },
  },
};
</script>

<style lang="scss" scoped>
.globalOptions {
  margin: 10px 0;
  max-height: 100vh;
  overflow-y: auto;
  .model-box {
    justify-content: space-between;
    align-items: center;
    background: #fff;
    border-top: 1px solid #dfe3e8;
    border-right: 3px solid transparent;
    cursor: pointer;
    &:hover {
      transition: all 0.3s;
      border-right-color: var(--main-color);
    }
    .namebox {
      padding: 18px 15px;
      padding-right: 44px;
      flex: 1;
      align-items: center;
      i {
        font-size: 18px;
      }
      p {
        font-size: 14px;
        margin-left: 10px;
      }
    }
  }
}
</style>
