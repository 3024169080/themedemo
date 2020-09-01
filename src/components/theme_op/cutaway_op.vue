<template>
  <!-- 切图配置 -->
  <div class="cutaway_op">
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
          <div v-for="(item1, index1) in imgList" :key="index1" class="list-complete-item">
            <div class v-for="(item, index) in item1" :key="index">
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
                        <div class="cutawayImg">
                          <img :src="item.imgUrl|DFSImg" alt />
                        </div>
                      </div>
                    </div>
                    <div class="setBlock">
                      <div class="setTitle">选择链接</div>
                      <div class="setMain">
                        <el-input
                          size="small"
                          v-model="item.links.links"
                          placeholder="请输入链接(https://开头)"
                          @blur="checkLinks(item.links.links)"
                        ></el-input>
                      </div>
                    </div>
                    <div class="flexItem delImg" @click="delImg(item1,index)">
                      <i class="iconfont iconlajitong"></i>
                      <p class="itemRight">删除内容</p>
                    </div>
                  </div>
                </el-collapse-item>
              </el-collapse>
            </div>
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
import bus from "@/assets/js/eventBus";
import draggable from "vuedraggable";
export default {
  name: "cutaway_op",
  props: {
    datas: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {};
  },
  components: {
    draggable,
  },
  computed: {
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
    addImg() {
      bus.$emit("openSlicingLayout");
    },
    delImg(item1,index){
      item1.splice(index,1);
    },
    checkLinks(links){
      if(links.indexOf('http://')<0&&links.indexOf('https://')<0){
        this.$message.info("请输入带http://或https://的链接");
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.cutaway_op {
  .cutawayImg {
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    position: relative;
    background: #efefef;
    img {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      z-index: 1;
    }
  }
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
}
</style>
