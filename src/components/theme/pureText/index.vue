<template>
  <!-- 纯文本组件 -->
  <div class="pureText">
    <p class="text">纯文本</p>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "pureText",
  props: {
    render: {
      type: Boolean,
      default: false,
    },
    deviceType: {
      type: String,
      default: "pc",
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
.pureText {
  padding: 20px 0;
  text-align: center;
  font-size: 30px;
}
</style>
