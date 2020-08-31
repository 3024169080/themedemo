<template>
  <!-- 文本 -->
  <div class="articles_op">
    <div class="comBlock">
      <div class="comName">设置</div>
      <div class="comMain bs">
        <div class="setBlock">
          <el-checkbox v-model="wideScreenShow">宽屏显示</el-checkbox>
        </div>
        <div class="setBlock">
          <div class="setTitle">标题</div>
          <div class="setMain">
            <el-input size="small" v-model="title" placeholder="请输入标题"></el-input>
          </div>
        </div>
        <div class="setBlock">
          <div class="setTitle">文本</div>
          <div class="tools flex">
            <div class="tools-item flex" :class="{'isTools':useBold}" @click="useBold=!useBold">
              <i class="iconfont iconjiacu"></i>
            </div>
            <div
              class="tools-item flex"
              :class="{'isTools':useItalics}"
              @click="useItalics=!useItalics"
            >
              <i class="iconfont iconxieti"></i>
            </div>
          </div>
          <div class="setMain">
            <el-input type="textarea" size="mini" :rows="8" placeholder="请输入内容" v-model="content"></el-input>
          </div>
        </div>
        <div class="setBlock">
          <div class="setTitle">大小</div>
          <div class="setMain">
            <el-select v-model="textSize" placeholder="请选择" size="small">
              <el-option
                v-for="item in textSizeList"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "articles_op",
  props: {
    datas: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      textSizeList:[
        {
          name:'小',
          value:1.2,
        },
        {
          name:'中',
          value:1.4,
        },
        {
          name:'大',
          value:1.6,
        }
      ]
    };
  },
  components: {},
  computed: {
    wideScreenShow: {
      get() {
        return this.datas.componentData.wideScreenShow;
      },
      set(newVal) {
        this.datas.componentData.wideScreenShow = newVal;
      },
    },
    title: {
      get() {
        return this.datas.componentData.title;
      },
      set(newVal) {
        this.datas.componentData.title = newVal;
      },
    },
    content: {
      get() {
        return this.datas.componentData.content;
      },
      set(newVal) {
        this.datas.componentData.content = newVal;
      },
    },
    useBold: {
      get() {
        return this.datas.componentData.useBold;
      },
      set(newVal) {
        this.datas.componentData.useBold = newVal;
      },
    },
    useItalics: {
      get() {
        return this.datas.componentData.useItalics;
      },
      set(newVal) {
        this.datas.componentData.useItalics = newVal;
      },
    },
    textSize: {
      get() {
        return this.datas.componentData.textSize;
      },
      set(newVal) {
        this.datas.componentData.textSize = newVal;
      },
    },
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.articles_op {
  .tools {
    margin-top: 4px;
    align-items: center;
    .tools-item {
      width: 30px;
      height: 30px;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      border: 1px solid #efefef;
      i {
        font-size: 14px;
        color: var(--minor-color);
      }
    }
    .isTools {
      background: var(--main-color);
      i {
        color: #fff;
      }
    }
  }
}
</style>
