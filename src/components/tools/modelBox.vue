<template>
  <div class="model-box flex" :title="name">
    <div class="namebox flex">
      <i class="iconfont iconmokuai"></i>
      <p class="line-clamp1">{{name}}</p>
    </div>
    <div class="showIcon">
      <i class="iconfont iconyanjing2" title="隐藏" v-if="visible==1" @click.stop="changeVisible"></i>
      <i class="iconfont iconbiyan" title="显示" v-else @click.stop="changeVisible"></i>
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
  methods: {
    changeVisible(){
      this.$emit("changeVisible");
    }
  },
};
</script>
<style lang="scss" scoped>
.model-box {
  .namebox {
  }
  .showIcon{
    color: var(--minor-color);
  }
}
</style>
