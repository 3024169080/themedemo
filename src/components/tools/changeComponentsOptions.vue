<template>
  <!-- 组件内容编辑 -->
  <div class="changeComponentsOptions bg" :class="{'show':addClass,'dn':!show,'db':show}">
    <div class="top">
      <h2>{{title}}</h2>
      <div class="icons flex" @click="closeDia">
        <i class="iconfont iconarrow-down"></i>
      </div>
    </div>
    <template v-if="changeType==1">
      <div class="com-op-content" v-if="update">
        <component
          v-if="shu>=0"
          :is="comData['componentCode']+'_op'"
          :datas="comData"
          class="componentCla"
        ></component>
      </div>
      <hr class="te-panel__separator" />
      <!-- 删除当前组件 -->
      <div class="delCom">
        <el-button icon="el-icon-delete" class="delBtn" size="medium" @click="removeHandle">删除部分</el-button>
      </div>
    </template>
    <template v-if="changeType==2">
      <div class="com-op-content" v-if="update">
        <component
          v-if="shu!=''"
          :is="comData['componentCode']+'_op'"
          :datas="comData"
          class="componentCla"
        ></component>
      </div>
    </template>
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
      title: "",
      show: false,
      addClass: false,
      comData: "",
      shu: null,
      update: false,
      changeType: 1, //修改类型
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
  components: {
    // 组件设置
    imageText_op: () => import("@/components/theme_op/imageText_op"),
    imageRow_op: () => import("@/components/theme_op/imageRow_op"),
    pureText_op: () => import("@/components/theme_op/pureText_op"),
    // 模板设置
    globalColor_op: () => import("@/components/theme_op/globalColor_op"),
    globalPlate_op: () => import("@/components/theme_op/globalPlate_op"),
  },
  computed: {
    getModelList() {
      return this.$store.state.modelClass.currentPageInfo.components;
    },
    pageSettingData() {
      return this.$store.state.modelClass.currentPageInfo.pageSettingData;
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
    itemOnClick(type, data) {
      // 选中基础组件
      // type: 1修改组件配置  2修改全局配置
      this.changeType = type;
      if (type == 1) {
        if (!isNaN(Number(data))) {
          this.shu = data;
          this.comData = this.getModelList[this.shu];
        }
      } else if (type == 2) {
        this.shu = data;
        this.comData = this.pageSettingData[this.shu];
      }
      this.title = this.comData.componentName;
      //更新组件视图
      this.update = false;
      this.$nextTick(() => {
        this.update = true;
      });
    },
    removeHandle() {
      this.$store.commit("modelClass/removeModelListChild", this.shu);
      this.closeDia();
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
  .delCom {
    padding: 8px;
    .delBtn {
      background: var(--main-color);
      color: #fff;
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
