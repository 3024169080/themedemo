<template>
  <div class="model-box flex">
    <div class="namebox flex">
      <i class="iconfont iconmokuai"></i>
      <p>{{name}}</p>
    </div>
    <div class="icons flex">
      <i class="iconfont iconpaixu"></i>
    </div>
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
  justify-content: space-between;
  align-items: center;
  background: #fff;
  border-top: 1px solid #ededed;
  .namebox {
    padding: 18px 15px;
    padding-right: 44px;
    p {
      font-size: 14px;
      flex: 1;
      margin-left: 10px;
    }
  }
  .icons {
    width: 44px;
    justify-content: center;
    align-items: center;
  }
}
</style>
