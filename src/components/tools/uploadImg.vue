<template>
  <div class="uploadImg">
    <div class="addFile">
      <div class="fileItem flex" v-loading="imgInfo.type=='conduct'">
        <template v-if="imgUrl">
          <img
            class="upImg"
            :src="imgUrl|DFSImg(400,400)"
            alt
          />
        </template>
        <template v-else>
          <el-button class="save" size="small">选择图片</el-button>
          <p class="info">请点击上传图片</p>
        </template>
        <input class="upLoad isPA" title="点击切换" type="file" @change="toInput" :multiple="false" />
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { _ossDT, stopUpdate } from "@/plugins/ossDirectTransmission2.js";
export default {
  name: "uploadImg",
  props: {
    imgUrl: {
      type: String,
      default: "",
    },
    index: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      allImgList: [],
      imgInfo: {
        progress: 0,
        res: {
          relativeUrl: "",
        },
        type: "",
      },
    };
  },
  watch: {
    allImgList: {
      handler(newName, oldName) {
        this.imgInfo = newName[0].info;
        let imgUrl = this.imgInfo.res.absoluteUrl||"";
        if(imgUrl!=""){
          this.$emit("getImg",imgUrl,this.index);
        }
      },
      // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
      // immediate: true,
      deep: true,
    },
  },
  components: {},
  computed: {},
  created() {},
  mounted() {},
  methods: {
    toInput(e) {
      let _this = this;
      if (_this.imgInfo.type == "conduct") {
        return this.$message.info("已有文件正在上传");
      }
      // 上传
      let upList = Object.values(e.target.files);
      if (!upList) return;
      let limitFlag = false;
      let limitSize = false;
      upList.filter((item) => {
        if (this.getFileType(item.name) != "image") {
          limitFlag = true;
        }
        if (item.size / 1024 / 1024 > 4) {
          limitSize = true;
        }
      });
      if (limitFlag) {
        return this.$message.info("请上传图片文件");
      }
      if (limitSize) {
        return this.$message.info(`上传的图片不可超过4M`);
      }
      _ossDT(e.target.files, (res) => {
        _this.allImgList = res;
        console.log(_this.allImgList, "-- _this.allImgList---159");
        e.target.value = "";
      });
    },
    getFileType(name) {
      if (!name) return false;
      var imgType = ["gif", "jpeg", "jpg", "bmp", "png"];
      // var imgType = ["png"];
      var videoType = [
        "avi",
        "wmv",
        "mkv",
        "mp4",
        "mov",
        "rm",
        "3gp",
        "flv",
        "mpg",
        "rmvb",
      ];
      if (
        RegExp(".(" + imgType.join("|") + ")$", "i").test(name.toLowerCase())
      ) {
        return "image";
      } else if (
        RegExp(".(" + videoType.join("|") + ")$", "i").test(name.toLowerCase())
      ) {
        return "video";
      } else {
        return false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.uploadImg {
  .addFile {
    width: 100%;
    padding-bottom: 100%;
    border: 1px solid #c4cdd5;
    background: #f4f6f8;
    position: relative;
    &:before {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
    .fileItem {
      max-width: calc(100% - 2px);
      max-height: calc(100% - 2px);
      margin: auto;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      .upImg{
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
      .upLoad {
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0;
        top: 0;
        left: 0;
        z-index: 1;
        cursor: pointer;
      }
      .info {
        margin-top: 10px;
        color: #999;
        font-size: 12px;
      }
    }
  }
}
</style>
