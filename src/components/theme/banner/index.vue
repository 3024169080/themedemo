<template>
  <!-- 纯文本组件 -->
  <div class="banner">
    <div class="swipe">
      <van-swipe ref="Swiper" class="my-swipe" :autoplay="3000" indicator-color="var(--main-color)">
        <van-swipe-item v-for="(item,index) in 4" :key="index">
          <div class="img">
            <img draggable="false" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1598092514179&di=0e18ba763cacbc72ec4f92fb14a8db34&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2017-10-26%2F59f182e5c1157.jpg" alt="">
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import bus from "@/assets/js/eventBus";
export default {
  name: "banner",
  props: {
    render: {
      type: Boolean,
      default: false,
    },
    deviceType: {
      type: Number,
      default: 2,
    },
  },
  data() {
    return {};
  },
  components: {},
  computed: {},
  created() {},
  mounted() {
    this.init();
    bus.$on("initComponentsView", this.init);
  },
  methods: {
    init() {
      this.$nextTick(() => {
        setTimeout(() => {
          console.log("------change");
          this.$refs.Swiper.resize();
        }, 400);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.banner {
  font-size: 12px;
  width: 100%;
  .swipe {
    .my-swipe {
      .van-swipe-item {
        width: 100%;
        color: #fff;
        font-size: 20px;
        text-align: center;
        background-color: #efefef;
      }
    }
  }
}
</style>
