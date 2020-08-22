<template>
  <!-- 配置层 -->
  <div class="setUp" :class="{'onlySetUp':onlySetUp}">设置</div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "setUp",
  props: {
    onlySetUp: {
      type: Boolean,
      default: false,
    },
  },
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
.setUp {
  position: relative;
  overflow: hidden;
  height: calc(100vh - 50px);
  max-height: 100%;
  width: 280px;
  background: #fff;
  border-right: 1px solid #dfe3e8;
  transition: all 0.3s;
}
.onlySetUp{
  width: 100%;
}
</style>
