<template>
  <!-- 配置层 -->
  <div class="setUp" :class="{'onlySetUp':onlySetUp,'hideSetUp':hideSetUp}">
    <div class="table flex">
      <div
        class="tableList"
        v-for="(item,index) in tableList"
        :key="index"
        :class="{'isTable':index==tab}"
        @click="changeTab(index)"
      >
        <p>{{item.name}}</p>
      </div>
    </div>
    <!-- 已有组件列表 -->
    <div class="cpList bs" v-if="tab==0">
      <draggable
        :value="getModelList"
        :group="{ pull:false,put:false}"
        animation="300"
        @update="sortCollection"
      >
        <div
          v-for="(item, index) in getModelList"
          :key="index"
          class="list-complete-item"
          @click="showComponentsOptions(index)"
        >
          <modelBox
            :name="item.componentName"
            :componentCode="item.componentCode"
            :visible="item.componentInfo.visible"
            @changeVisible="changeVisible(index)"
          ></modelBox>
        </div>
        <div style="clear: both"></div>
      </draggable>
      <!-- 添加组件 -->
      <div class="addComponents flex" @click="showComponentsList">
        <div class="namebox flex">
          <i class="iconfont iconjiahao"></i>
          <p class="line-clamp1">添加部分</p>
        </div>
      </div>
    </div>
    <!-- 模板设置 -->
    <globalOptions v-else-if="tab==1"></globalOptions>
    <!-- 添加部分组件 -->
    <addComponents v-model="showAddComponents"></addComponents>
    <!-- 修改组件内容 -->
    <changeComponentsOptions v-model="showComOptions"></changeComponentsOptions>
  </div>
</template>

<script type="text/ecmascript-6">
import bus from "@/assets/js/eventBus";
import modelBox from "@/components/tools/modelBox";
import addComponents from "@/components/tools/addComponents";
import changeComponentsOptions from "@/components/tools/changeComponentsOptions";
import globalOptions from "@/components/tools/globalOptions";
import draggable from "vuedraggable";
export default {
  name: "setUp",
  props: {
    onlySetUp: {
      type: Boolean,
      default: false,
    },
    hideSetUp: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      tableList: [
        {
          name: "部分",
          index: 1,
        },
        {
          name: "模板设置",
          index: 2,
        },
      ],
      tab: 0,
      showAddComponents: false,
      showComOptions: false,
    };
  },
  components: {
    modelBox,
    draggable,
    addComponents,
    changeComponentsOptions,
    globalOptions,
  },
  computed: {
    getModelList() {
      return this.$store.state.modelClass.currentPageInfo.components;
    },
  },
  created() {},
  mounted() {
    bus.$on("showComOptions", (type, val, index) => {
      this.showComOptions = val;
      this.operateChange(type, index);
    });
  },
  methods: {
    onstart() {},
    getinitModelList(names) {
      return this.$store.state.commonComponentModel[names];
    },
    sortCollection(evt) {
      let newIndex = evt.newIndex;
      let oldIndex = evt.oldIndex;
      let collection = this.getModelList[oldIndex];
      this.$store.commit("modelClass/removeModelListChild", oldIndex);
      this.getModelList.splice(newIndex, 0, collection);
      setTimeout(() => {
        bus.$emit("contentPageScroll", "edit",newIndex);
      }, 16.7);
    },
    // 修改组件显示状态
    changeVisible(index) {
      console.log(index, "-----------------------85");
      this.$store.commit("modelClass/set_modelListInitFlag", false);
      this.getModelList[index].componentInfo.visible =
        this.getModelList[index].componentInfo &&
        this.getModelList[index].componentInfo.visible == 1
          ? 0
          : 1;
    },
    // 展示
    showComponentsList() {
      this.showAddComponents = true;
    },
    // 点击展示配置
    showComponentsOptions(index) {
      bus.$emit("showComOptions", 1, true, index);
      bus.$emit("contentPageScroll", "edit",index);
    },
    operateChange(type, index) {
      bus.$emit("operateChange", type, index); //展示配置
    },
    // 修改tab
    changeTab(index) {
      if (index != this.tab) {
        this.tab = index;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.setUp {
  position: relative;
  overflow: hidden;
  height: calc(100vh - 50px);
  max-height: 100%;
  width: 280px;
  border-right: 1px solid #dfe3e8;
  transition: all 0.3s;
  .table {
    border-bottom: 1px solid #ededed;
    background: #fff;
    position: sticky;
    top: 0;
    cursor: pointer;
    .tableList {
      width: 50%;
      height: 40px;
      border-bottom: 2px solid transparent;
      p {
        text-align: center;
        line-height: 40px;
        font-size: 14px;
        color: var(--minor-color);
      }
      &:hover {
        border-color: var(--minor-color);
      }
    }
    .isTable {
      border-color: var(--main-color);
    }
  }
  .cpList {
    margin: 10px 0;
    max-height: 100vh;
    overflow-y: auto;
    .list-complete-item {
      cursor: pointer;
    }
    .addComponents {
      justify-content: space-between;
      align-items: center;
      background: #fff;
      border-top: 1px solid #ededed;
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
        color: var(--main-color);
        align-items: center;
        i {
          font-weight: bold;
          font-size: 18px;
        }
        p {
          font-size: 14px;
          margin-left: 10px;
          color: var(--main-color);
        }
      }
    }
  }
}
.onlySetUp {
  width: 100%;
}
.hideSetUp {
  transform: translateX(-100%);
  width: 0;
}
</style>
