<template>
  <!-- 头部导航 -->
  <div class="Headers flex">
    <div class="left flex">
      <i class="iconfont iconLOGO"></i>
      <p>THEME</p>
    </div>
    <div class="changeSize flex">
      <div class="icons flex">
        <i class="iconfont iconshouji"></i>
      </div>
      <div class="icons flex">
        <i class="iconfont iconshouji"></i>
      </div>
    </div>
    <el-button class="save" size="small">保存</el-button>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "Headers",
  data() {
    return {};
  },
  components: {},
  computed: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.Headers {
  justify-content: space-between;
  align-items: center;
  height: 50px;
  background: #fff;
  padding-right: 10px;
  box-shadow: 0 0 0 1px rgba(63, 63, 68, 0.05),
    0 1px 3px 0 rgba(63, 63, 68, 0.15);
    position: relative;
    z-index: 999;
  .left {
    background: var(--main-color);
    color: #fff;
    justify-content: space-around;
    align-items: center;
    height: 100%;
    width: 100px;
    padding: 0 10px;
    i {
      font-size: 30px;
    }
    p {
      font-size: 14px;
    }
  }
  .changeSize {
    height: 100%;
    .icons {
      height: 100%;
      border-bottom: 2px solid transparent;
      justify-content: center;
      align-items: center;
      margin-left: 10px;
      i {
        font-size: 24px;
        color: var(--minor-color);
      }
    }
    .icons:hover {
      border-color: var(--minor-color);
    }
    .icons:last-child {
      border-color: var(--main-color);
    }
  }
  .save {
    color: #fff;
    background: var(--main-color);
  }
}
</style>
