<template>
  <!-- 组件内容编辑 -->
  <div class="changeComponentsOptions bg" :class="{'show':addClass,'dn':!show,'db':show}">
    <div class="top">
      <h2>{{comData.componentName}}</h2>
      <div class="icons flex" @click="closeDia">
        <i class="iconfont iconarrow-down"></i>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import bus from "@/assets/js/eventBus";
export default {
  name: "changeComponentsOptions",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      show: false,
      addClass: false,
      comData: "",
      update: true,
    };
  },
  watch: {
    value(newVal) {
      this.show = newVal;
      setTimeout(() => {
        this.addClass = newVal;
      }, 16.7);
    },
  },
  components: {},
  computed: {
    getModelList() {
      return this.$store.state.modelClass.currentPageInfo.components;
    },
  },
  created() {},
  mounted() {
    bus.$on("operateChange", this.itemOnClick); //变化
  },
  methods: {
    closeDia() {
      this.$emit("input", false);
    },
    itemOnClick(data) {
      // 选中基础组件
      if (!isNaN(Number(data))) {
        this.shu = data;
        this.comData = this.getModelList[this.shu];
        bus.$emit("viewChange", this.shu);
        //更新组件视图
        this.update = false;
        this.$nextTick(() => {
          this.update = true;
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.changeComponentsOptions {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100vh - 50px);
  max-height: 100%;
  overflow-y: auto;
  transition: all 0.3s;
  transform: translateX(100%);
  .top {
    height: 50px;
    line-height: 50px;
    position: sticky;
    top: 0;
    background: #f9fafb;
    text-align: center;
    box-shadow: 0 0 0 1px rgba(63, 63, 68, 0.05),
      0 1px 3px 0 rgba(63, 63, 68, 0.15);
    h2 {
      font-size: 16px;
    }
    .icons {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 40px;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  }
}
.dn {
  display: none;
}
.db {
  display: block;
}
.show {
  transform: translateX(0);
}
</style>
