<template>
  <!-- 视图层 -->
  <div class="contentPage flex" v-if="show">
    <div
      class="preview"
      :class="{'wrapperMobile':globalDeviceType==1}"
      ref="preview"
      :style="[{'background':backgroundColor,'width':previewWidth+'px'}]"
    >
      <!-- <draggable
        :value="getModelList"
        :group="{name: 'article', put: true}"
        filter=".disable"
        animation="300"
        scrollSensitivity="40"
      >-->
      <div
        :ref="'list-complete-item'+index"
        v-for="(element, index) in getModelList"
        v-show="((element.componentType==3 || element.componentType==1) && element.componentInfo?element.componentInfo.visible==1:true)"
        :key="index"
        class="list-complete-item"
        @click.stop="itemClick(element,index)"
        @mouseenter="mousemovesss(index)"
        :class="checkDisable(element)"
      >
        <component
          :is="element.componentCode"
          :datas="element"
          :render="false"
          :deviceType="globalDeviceType==1||screenWidth<=1045?1:globalDeviceType"
          class="component-el"
          :ref="element.componentCode+index"
        ></component>
      </div>
      <!-- </draggable> -->
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { uniqueId } from "@/assets/js/componentBase.js";
import { mapState } from "vuex";
import bus from "@/assets/js/eventBus";
import draggable from "vuedraggable";
import $ from "jquery";
export default {
  name: "contentPage",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  components: {
    draggable,
    // imageText,
    // imageRow,
    // banner,
  },
  computed: {
    ...mapState(["globalDeviceType", "screenWidth", "previewWidth"]),
    getModelList() {
      return this.$store.state.modelClass.currentPageInfo.components;
    },
    backgroundColor() {
      return this.$store.state.modelClass.currentPageInfo.pageSettingData
        .globalColor.componentData.page_op.pageColor;
    },
  },
  created() {},
  mounted() {
    bus.$on("contentPageScroll", (val, index = 0) => {
      this.getContentPageScroll(val, index);
    });
  },
  methods: {
    getKey(value) {
      return value.id || uniqueId(this.getModelList);
    },
    itemClick() {},
    mousemovesss() {},
    checkDisable() {},
    // 获取滚动距离
    getContentPageScroll(val, index) {
      if (this.$refs.preview) {
        if (val == "add") {
          // 新增滚到底部
          $(".preview").animate(
            { scrollTop: this.$refs.preview.scrollHeight },
            500
          );
        } else if (val == "edit") {
          // 编辑到指定位置
          let { offsetTop } = this.$refs[
            this.getModelList[index].componentCode + index
          ][0].$el;
          $(".preview").animate({ scrollTop: offsetTop - 60 }, 500);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.contentPage {
  flex: 1;
  margin: 10px;
  justify-content: center;
}
.preview {
  width: 100%;
  transition: all 0.2s;
  height: calc(100vh - 50px - 20px);
  overflow-y: auto;
}
.wrapperMobile {
  width: 375px;
}
</style>
