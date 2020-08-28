<template>
  <!-- 文章组件 -->
  <div class="articles">
    <h3 class="title">{{title}}</h3>
    <div class="content" :style="[{'font-weight':useBold?'bold':''},{'font-style':useItalics?'oblique ':''},]" v-html="content"></div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "articles",
  props: {
    render: {
      type: Boolean,
      default: false,
    },
    deviceType: {
      type: Number,
      default: 2,
    },
    datas: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {};
  },
  components: {},
  computed: {
    title() {
      return this.datas.componentData.title;
    },
    content() {
      return this.datas.componentData.content || "";
    },
    useBold() {
      return this.datas.componentData.useBold || "";
    },
    useItalics() {
      return this.datas.componentData.useItalics || "";
    },
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.articles {
  padding: 20px 20px;
  .title {
    text-align: center;
    font-size: 24px;
  }
  .content {
    margin-top: 20px;
    text-align: center;
    font-size: 14px;
  }
}
</style>
