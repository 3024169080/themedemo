<template>
  <!-- 添加组件弹窗 -->
  <div class="addComponents bg" :class="{'show':addClass,'dn':!show,'db':show}">
    <div class="top">
      <h2>添加部分</h2>
      <div class="icons flex" @click="closeDia">
        <i class="iconfont iconcha"></i>
      </div>
    </div>
    <div class="content">
      <!-- 基础类 -->
      <div class="componentsList">
        <div class="componentsName">基础类</div>
        <div
          class="componentsTitle flex"
          v-for="(item,index) in getinitModelList('componentsList')"
          :key="index"
          @click="showAddBtn('componentsList',item)"
        >
          <div class="componentsItem">{{item.componentName}}</div>
          <el-button
            class="save"
            size="mini"
            v-if="item.componentName==addComponentName"
            @click.stop="addItem(item)"
          >添加</el-button>
        </div>
      </div>
      <!-- 商品类 -->
      <div class="goodsClassList">
        <div class="componentsName">商品类</div>
        <div
          class="componentsTitle flex"
          v-for="(item,index) in getinitModelList('goodsClassList')"
          :key="index"
          @click="showAddBtn('goodsClassList',item)"
        >
          <div class="componentsItem">{{item.componentName}}</div>
          <el-button
            class="save"
            size="mini"
            v-if="item.componentName==addComponentName"
            @click.stop="addItem(item)"
          >添加</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import bus from "@/assets/js/eventBus";
export default {
  name: "addComponents",
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
      addComponentName: "",
    };
  },
  watch: {
    value(newVal) {
      this.show = newVal;
      this.init();
      setTimeout(() => {
        this.addClass = newVal;
      }, 16.7);
    },
  },
  components: {},
  computed: {},
  created() {},
  mounted() {},
  methods: {
    init() {
      this.addComponentName = "";
    },
    closeDia() {
      if (!this.addComponentName == "") {
        // 弹层展示中非第一次添加
        this.$store.commit(
          "modelClass/removeModelListChild",
          this.$store.state.modelClass.currentPageInfo.components.length - 1
        );
      }
      this.$emit("input", false);
    },
    getinitModelList(names) {
      return this.$store.state.commonComponentModel[names];
    },
    // 展示添加按钮
    showAddBtn(type, item) {
      if (this.addComponentName == item.componentName) {
        // 连续点击两次直接添加并初始化
        this.addItem(item);
        return;
      }
      if (!this.addComponentName == "") {
        // 弹层展示中非第一次添加
        this.$store.commit(
          "modelClass/removeModelListChild",
          this.$store.state.modelClass.currentPageInfo.components.length - 1
        );
      }
      this.$store.dispatch("modelClass/addModellistPushChild", item);
      this.addComponentName = item.componentName;
    },
    // 确认添加
    addItem(item) {
      bus.$emit(
        "showComOptions",
        1,
        true,
        this.$store.state.modelClass.currentPageInfo.components.length - 1
      );
      this.init();
      this.closeDia();
      setTimeout(() => {
        bus.$emit("contentPageScroll", "add");
      }, 16.7);
    },
  },
};
</script>

<style lang="scss" scoped>
.addComponents {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100vh - 50px);
  max-height: 100%;
  overflow-y: auto;
  transition: all 0.3s;
  transform: translateY(100%);
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
      right: 0;
      height: 100%;
      width: 40px;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  }
  .content {
    .componentsName {
      padding: 14px;
      line-height: 20px;
      font-size: 12px;
      color: #637381;
    }
    .componentsTitle {
      cursor: pointer;
      padding: 10px 14px;
      background: #fff;
      line-height: 28px;
      font-size: 14px;
      border-right: 3px solid transparent;
      border-bottom: 1px solid #eeeeee;
      &:hover {
        transition: all 0.3s;
        border-right-color: var(--main-color);
      }
      justify-content: space-between;
      align-items: center;
      .save {
        background: var(--main-color);
        color: #fff;
      }
    }
    .componentsTitle:last-child {
      border-bottom: none;
      box-shadow: 0 5px 6px -5px rgba(63, 63, 68, 0.25);
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
  transform: translateY(0);
}
</style>
