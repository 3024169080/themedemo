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
  justify-content: space-between;
  align-items: center;
  background: #fff;
  border-top: 1px solid #dfe3e8;
  border-right: 3px solid transparent;
  &:hover{
    transition: all 0.3s;
    border-right-color: var(--main-color);
  }
  .namebox {
    padding: 18px 15px;
    padding-right: 44px;
    flex: 1;
    align-items: center;
    i{
      font-size: 18px;
    }
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
