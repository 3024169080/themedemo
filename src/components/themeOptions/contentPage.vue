<template>
  <!-- 视图层 -->
  <div class="contentPage flex" v-if="show">
    <div class="preview" :class="{'wrapperMobile':showMoblie}">
      <imageText :render="false" :deviceType="showMoblie?'moblie':'pc'"></imageText>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import imageText from "@/components/theme/imageText";
import { mapState } from "vuex";
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
    imageText,
  },
  computed: {
    ...mapState(["showMoblie", "screenWidth"]),
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.contentPage {
  flex: 1;
  margin: 10px;
  justify-content: center;
  height: calc(100vh - 50px - 20px);
  overflow-y: auto;
}
.preview {
  background: #fff;
  width: 100%;
  transition: all 0.4s;
}
.wrapperMobile {
  width: 375px;
  max-width: 375px;
}
</style>
