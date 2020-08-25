<template>
  <div class="model-box flex" :title="name">
    <div class="namebox flex">
      <i class="iconfont iconmokuai"></i>
      <p class="line-clamp1">{{name}}</p>
    </div>
    <div class="showIcon">
      <i class="iconfont iconyanjing2" v-if="visible==1"></i>
      <i class="iconfont iconbiyan" v-else></i>
    </div>
    <div class="icons flex">
      <i class="iconfont iconpaixu"></i>
    </div>
  </div>
</template>
<script>
export default {
  props: ["name", "componentCode","visible"],
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
    flex: 1;
    p {
      font-size: 14px;
      margin-left: 10px;
    }
  }
  .showIcon{
    color: var(--minor-color);
  }
  .icons {
    width: 44px;
    justify-content: center;
    align-items: center;
  }
}
</style>
