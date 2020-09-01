<template>
  <!-- 图片轮播 -->
  <div class="banner_op">
    <!-- 设置 -->
    <div class="comBlock">
      <div class="comName">设置</div>
      <div class="comMain bs">
        <div class="setBlock">
          <div class="setTitle">图片高度</div>
          <div class="setMain">
            <el-select v-model="pictureHeight" placeholder="请选择" size="small">
              <el-option
                v-for="item in pictureHeightList"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="setBlock">
          <div class="setTitle">幻灯片切换时间间隔</div>
          <div class="setMain">
            <div class="flexItem">
              <el-slider v-model="intervalTime" :min="1" :max="10"></el-slider>
              <p class="itemRight">{{intervalTime+'s'}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="comBlock content">
      <div class="comName">内容</div>
      <div class="comMain bs">
        <draggable
          class="banner"
          :value="imgList"
          :group="{ pull:false,put:false}"
          animation="300"
          @update="sortCollection"
        >
          <div v-for="(item, index) in imgList" :key="index" class="list-complete-item">
            <el-collapse accordion>
              <el-collapse-item>
                <template slot="title">
                  <div class="model-boxs flex" :title="item.name">
                    <div class="namebox flex">
                      <i class="iconfont icontupianxian" v-if="!item.imgUrl"></i>
                      <div class="img" v-else>
                        <img :src="item.imgUrl | DFSImg(400,400)" alt />
                      </div>
                      <p class="line-clamp1">{{item.name}}</p>
                    </div>
                  </div>
                </template>
                <div class="modelMain">
                  <div class="setBlock">
                    <div class="setTitle">图片</div>
                    <div class="setMain">
                      <uploadImg :imgUrl="item.imgUrl" :index="index" @getImg="getImg"></uploadImg>
                    </div>
                  </div>
                  <div class="setBlock">
                    <div class="setTitle">选择连接</div>
                    <div class="setMain">
                      <el-input
                        size="small"
                        v-model="item.links.links"
                        placeholder="请输入连接(https://开头)"
                        @blur="checkLinks(item.links.links)"
                      ></el-input>
                    </div>
                  </div>
                  <div class="flexItem delImg" @click="delImg(index)">
                    <i class="iconfont iconlajitong"></i>
                    <p class="itemRight">删除内容</p>
                  </div>
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>
          <div style="clear: both"></div>
        </draggable>
        <!-- 添加 -->
        <div class="addComponents flex addImg" @click="addImg">
          <div class="namebox flex">
            <i class="iconfont iconjiahao"></i>
            <p class="line-clamp1">添加图片</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import draggable from "vuedraggable";
import uploadImg from "@/components/tools/uploadImg";
export default {
  name: "banner_op",
  props: {
    datas: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      pictureHeightList: [
        {
          name: "小",
          value: 200,
        },
        {
          name: "中",
          value: 250,
        },
        {
          name: "大",
          value: 300,
        },
        {
          name: "特大",
          value: 350,
        },
      ],
    };
  },
  components: {
    draggable,
    uploadImg,
  },
  computed: {
    pictureHeight: {
      get() {
        return this.datas.componentData.pictureHeight;
      },
      set(newVal) {
        this.datas.componentData.pictureHeight = newVal;
      },
    },
    intervalTime: {
      get() {
        return this.datas.componentData.intervalTime;
      },
      set(newVal) {
        this.datas.componentData.intervalTime = newVal;
      },
    },
    imgList: {
      get() {
        return this.datas.componentData.imgList;
      },
      set(newVal) {
        this.datas.componentData.imgList = newVal;
      },
    },
  },
  created() {},
  mounted() {},
  methods: {
    sortCollection(evt) {
      let newIndex = evt.newIndex;
      let oldIndex = evt.oldIndex;
      let collection = this.imgList[oldIndex];
      this.imgList.splice(oldIndex, 1);
      this.imgList.splice(newIndex, 0, collection);
    },
    getImg(item, index) {
      this.imgList[index].imgUrl = item;
    },
    delImg(index) {
      this.imgList.splice(index, 1);
    },
    addImg() {
      this.imgList.push({
        imgUrl: "",
        name: "图片幻灯片",
        links: {
          type: 0,
          links: "",
        },
      });
    },
    checkLinks(links) {
      if (links.indexOf("http://") < 0 && links.indexOf("https://") < 0) {
        this.$message.info("请输入带http://或https://的链接");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.banner_op {
  .delImg {
    display: flex;
    align-items: center;
    padding: 0 20px;
    i,
    p {
      font-size: 14px;
    }
    p {
      margin-left: 6px;
    }
    &:hover {
      color: var(--main-color);
    }
  }
  .addImg {
    margin-left: 6px;
  }
}

.list-complete-item {
  cursor: pointer;
}
.content {
  .model-boxs {
    padding-left: 14px;
    .namebox {
      justify-content: center;
      align-items: center;
      i {
        margin-left: 6px;
      }
      .img {
        width: 30px;
        height: 30px;
        border-radius: 4px;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
    p {
      margin-left: 20px;
    }
  }
}
.el-slider {
  width: 100%;
}
</style>
