<template>
  <div class="model-box">
    <div class="namebox">{{name}}</div>
  </div>
</template>
<script>
export default {
  props: ["name", "componentCode"],
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.model-box {
  display: flex;
  flex-direction: column;
  .namebox {
    text-align: center;
    font-size: 14px;
  }
}
</style>
