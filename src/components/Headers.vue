<template>
  <!-- 头部导航 -->
  <div class="Headers flex">
    <div class="left flex">
      <i class="iconfont iconLOGO"></i>
      <p>THEME</p>
    </div>
    <div class="changeSize flex">
      <div
        class="icons flex"
        v-for="(item,index) in deviceList"
        :key="index"
        @click="changeDevice(item)"
        :class="{'selectIcons':globalDeviceType==item.type}"
      >
        <i :class="'iconfont '+item.icon"></i>
      </div>
    </div>
    <el-button class="save" size="small" @click="saveAll">保存</el-button>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapState, mapMutations } from "vuex";
export default {
  name: "Headers",
  data() {
    return {
      deviceList: [
        {
          name: "手机端",
          icon: "iconshouji",
          type: 1,
        },
        {
          name: "PC端",
          icon: "icondiannao",
          type: 2,
        },
        {
          name: "PC端拉伸",
          icon: "iconlashentianchong",
          type: 3,
        },
      ],
    };
  },
  components: {},
  computed: {
    ...mapState(["globalDeviceType"]),
  },
  created() {},
  mounted() {},
  methods: {
    ...mapMutations(["changeDeviceType"]),
    // 修改设备
    changeDevice(item) {
      this.changeDeviceType(item.type);
    },
    saveAll(){
      this.$emit("saveAll");
    }
  },
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
      margin-left: 22px;
      cursor: pointer;
      i {
        font-size: 22px;
        color: var(--minor-color);
      }
    }
    .icons:hover {
      border-color: var(--minor-color);
    }
    .selectIcons {
      border-color: var(--main-color);
    }
  }
  .save {
    color: #fff;
    background: var(--main-color);
  }
}
</style>
