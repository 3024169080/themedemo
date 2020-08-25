<template>
  <!-- 配置层 -->
  <div class="setUp" :class="{'onlySetUp':onlySetUp,'hideSetUp':hideSetUp}">
    <div class="table flex">
      <div class="tableList" v-for="(item,index) in tableList" :key="index">
        <p>{{item.name}}</p>
      </div>
    </div>
    <!-- 已有组件列表 -->
    <div class="cpList">
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
        >
          <modelBox :name="item.componentName" :componentCode="item.componentCode" :visible="item.componentInfo.visible"></modelBox>
        </div>
        <div style="clear: both"></div>
      </draggable>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import modelBox from "@/components/tools/modelBox";
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
    };
  },
  components: {
    modelBox,
    draggable,
  },
  computed: {
    getModelList() {
      return this.$store.state.modelClass.currentPageInfo.components;
    },
  },
  created() {},
  mounted() {},
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
      // this.$store.commit('modelClass/addModelListChild',newIndex,collection);
      this.getModelList.splice(newIndex, 0, collection);
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
    }
    .tableList:first-child {
      border-color: var(--main-color);
    }
  }
  .cpList {
    margin: 10px 0;
    .list-complete-item{
      cursor: pointer;
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
