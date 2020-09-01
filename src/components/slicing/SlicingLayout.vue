<template>
  <div class="slicing">
    <el-dialog
      title="切图"
      :modal-append-to-body='false'
      :visible.sync="dialogVisible"
      width="70%"
      :before-close="handleClose"
      :fullscreen="true"
    >
      <div class="dialog-wrap">
        <div class="dialog-content">
          <div class="left">
            <div class="menu">
              <p class="item cursor" @click="handleAddSection">
                <i class="iconfont icon-tianjia"></i>
                <span>添加选区</span>
              </p>
              <p class="item cursor" @click="handleReSection">
                <i class="iconfont icon-qingkong1"></i>
                <span>清空选区</span>
              </p>
              <p class="item cursor">
                <i class="iconfont icon-zhongxin"></i>
                <span>重新选图</span>
                <input
                  ref="fileupload1"
                  type="file"
                  name="loadimage"
                  class="loadimage"
                  accept="image/jpeg, image/png"
                  unselectable="on"
                  @change="handleChange"
                />
              </p>
            </div>
            <div class="content">
              <div class="input" v-show="showLayout">
                <i class="iconfont icon-shangchuantupian11" style="font-size: 200px;"></i>
                <h2>点击或将图片拖拽到这里</h2>
                <p>支持扩展名：.png .jpg .jpeg</p>
                <input
                  ref="fileupload2"
                  type="file"
                  name="loadimage"
                  class="loadimage"
                  accept="image/jpeg, image/png"
                  unselectable="on"
                  @change="handleChange"
                />
              </div>
              <div class="canvas" :style="{'width':this.canvasInfo.width+'px'}">
                <canvas id="myCanvas" width="150" height="150" class="myCanvas">您的浏览器不支持canvas</canvas>
                <div class="myPannel">
                  <slicing-section
                    v-for="(item,index) in sectionNum"
                    :ref="'section'+index"
                    :key="item"
                    :tierNum="index"
                    :width="canvasInfo.width"
                    @down="handleSectionDown(index)"
                    @offsetY="e=>{return handleSectionOffsetY(e,index)}"
                    @stop="handleSectionStop(index)"
                    @removeSelf="handleSectionRemove(index)"
                    @initSectionRight="handleInitSectionRight(index)"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="right">
            <h2>操作说明</h2>
            <br />
            <p>点击【添加选区】在最后一个选区下新增一个</p>
            <br />
            <p>【清空选区】全部清除</p>
            <br />
            <p>点击选区，可进行更多操作</p>
            <br />
            <p>【分栏】设置列数可在选区内平均分列</p>
            <br />
            <p>【忽略】忽略此图像</p>
          </div>
        </div>
        <div class="dialog-footer">
          <span slot="footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleAffirm">确 定</el-button>
          </span>
        </div>
      </div>
    </el-dialog>
    <div class="loading" v-show="imgLoading">
      <i class="el-icon-loading"></i>
      <span>图片上传中请耐心等待</span>
    </div>
  </div>
</template>

<script>
import section from "@/components/slicing/Section.vue";
import toolApi from "@/api/tool.js";
import { randomName } from "@/utils/tools.js";
import { DFSImg } from "@/filters/index";
export default {
  components: {
    "slicing-section": section
  },
  data() {
    return {
      imgLoading: false,
      sectionKey: 0,
      dialogVisible: false,
      sectionNum: [],
      showLayout: true,
      canvasInfo: {
        width: 0,
        height: 0
      },
      // 上传地址
      uploadUrl: "innerApi/baseService/upload/uploadFile.htm"
    };
  },
  methods: {
    init() {
      this.dialogVisible = false;
      this.sectionNum = [];
      this.showLayout = true;
      this.imgLoading = false;
      let c = document.getElementById("myCanvas");
      let cxt = c.getContext("2d");
      cxt.clearRect(0, 0, c.width, c.height);
      c.width = 0;
      c.height = 0;
      //清空input
      this.$refs.fileupload1.value = "";
      this.$refs.fileupload2.value = "";
    },
    open() {
      this.dialogVisible = true;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.init();
          done();
        })
        .catch(_ => {});
    },
    handleChange(e) {
      this.sectionNum = [];
      let file = e.target.files[0];
      if (file) {
        const fr = new FileReader(file);
        fr.onload = e => {
          let img = new Image();
          let imgbase64 = e.target.result;
          img.src = imgbase64;
          img.onload = () => {
            let c = document.getElementById("myCanvas");
            c.width = img.width;
            c.height = img.height;
            c.getContext("2d").drawImage(img, 0, 0);
            this.showLayout = false;
            this.canvasInfo.width = img.width;
            this.canvasInfo.height = img.height;
          };
        };
        fr.readAsDataURL(file);
      }
    },
    handleAddSection() {
      if (
        this.$refs.fileupload1.value == "" &&
        this.$refs.fileupload2.value == ""
      ) {
        this.$message("请先上传图片再添加选区哦~");
        return;
      }
      this.sectionKey++;
      this.sectionNum.push(this.sectionKey);
    },
    handleReSection() {
      if (this.sectionNum.length > 0) {
        this.$confirm("确认清空所有选区吗？")
          .then(_ => {
            this.sectionNum = [];
            this.$message({
              message: "已清除所有选区",
              type: "success"
            });
            done();
          })
          .catch(_ => {});
      } else {
        this.$message("暂无选区可清除");
      }
    },
    handleSectionDown(index) {
      if (
        this.$refs["section" + (index + 1)] &&
        this.$refs["section" + (index + 1)][0]
      ) {
        this.$refs["section" + (index + 1)][0].setOldHeight();
      }
    },
    handleSectionOffsetY(res, index) {
      if (
        this.$refs["section" + (index + 1)] &&
        this.$refs["section" + (index + 1)][0]
      ) {
        this.$refs["section" + (index + 1)][0].setOffsetY(res);
      }
    },
    handleSectionStop(index) {
      if (
        this.$refs["section" + (index + 1)] &&
        this.$refs["section" + (index - 1)][0]
      ) {
        this.$refs["section" + (index - 1)][0].setStopMove();
      }
    },
    handleSectionRemove(index) {
      this.sectionNum.splice(index, 1);
    },
    async addCirm() {
      let canvas = document.getElementById("myCanvas");
      let ry = 0;
      let imgList = [];
      if (this.sectionNum.length > 0) {
        for (let i = 0; i < this.sectionNum.length; i++) {
          let rect = this.$refs["section" + i][0].getRect();
          if (!this.$refs["section" + i][0].slip) {
            let arr = [];
            for (let j = 0; j < rect.length; j++) {
              arr.push(
                await this.cropImage(
                  canvas,
                  rect[j].x,
                  ry,
                  rect[j].w,
                  rect[0].h
                )
              );
            }
            imgList.push(arr);
          }
          ry += rect[0].h;
        }
      } else {
        imgList.push([
          await this.cropImage(canvas, 0, 0, canvas.width, canvas.height)
        ]);
      }
      this.addPhotoGallery(imgList);
      this.init();

      //  Promise.all([rect.map(item => this.cropImage(canvas, rect[j].x, ry, rect[j].w, rect[0].h))]).then(data => {
      //         arr = data;
      //         });
    },
    cropImage(targetCanvas, x, y, width, height) {
      return new Promise((resolve, reject) => {
        let targetctx = targetCanvas.getContext("2d");
        let targetctxImageData = targetctx.getImageData(x, y, width, height); // sx, sy, sWidth, sHeight
        let c = document.createElement("canvas");
        let ctx = c.getContext("2d");
        c.width = width;
        c.height = height;
        ctx.rect(0, 0, width, height);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.putImageData(targetctxImageData, 0, 0); // imageData, dx, dy // 创建img 块
        let base64 = c.toDataURL("image/jpeg", 0.92);
        base64 = base64.replace(/^data:image\/\w+;base64,/, "");
        let fileName = randomName() + ".jpg";
        toolApi
          .postUploadBase64({ file: base64, fileName: fileName })
          .then(res => {
            if (res.data.code == 200) {
              let dfs = DFSImg(res.data.data.remoteFileUrl);
              console.log(dfs, "promise", res.data.data.remoteFileUrl);
              resolve(dfs);
            } else {
            }
          })
          .catch(err => {
            console.log(err);
          });
      });
    },
    handleAffirm() {
      if (
        this.$refs.fileupload1.value == "" &&
        this.$refs.fileupload2.value == ""
      ) {
        this.$message("请先上传图片再保存");
      } else {
        this.$confirm("确定要保存吗?")
          .then(_ => {
            this.imgLoading = true;
            this.addCirm();
            done();
          })
          .catch(_ => {});
      }
    },
    //初始化section菜单
    handleInitSectionRight(index) {
      for (const key in this.sectionNum) {
        if (index != key) {
          this.$refs["section" + key][0].rightShow = false;
        }
      }
    },
    addPhotoGallery(res) {
      this.$emit("getImg",res);
      return;
      let component = null;
      for (const key in this.$store.state.commonComponentModel[
        "mediaClassList"
      ]) {
        if (
          this.$store.state.commonComponentModel["mediaClassList"][key][
            "componentCode"
          ] == "photo-gallery"
        ) {
          component = this.$store.state.commonComponentModel["mediaClassList"][
            key
          ];
        }
      }
      //遍历切图
      for (let index = 0; index < res.length; index++) {
        let copy = JSON.parse(JSON.stringify(component));
        let imgList = JSON.parse(JSON.stringify(copy.componentData.imgList[0]));
        copy.componentData.titles = "";
        copy.componentData.imgList = [];
        //设置平铺
        if (res[index].length > 1) {
          copy.componentData.style = "tiled";
        }
        for (let i = 0; i < res[index].length; i++) {
          let copyImgList = JSON.parse(JSON.stringify(imgList));
          copyImgList.imageUrl = res[index][i];
          copy.componentData.imgList.push(copyImgList);
        }
        this.$store.dispatch('modelClass/addModellistPushChild',copy);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.slicing {
  .dialog-wrap {
    .dialog-content {
      display: flex;
      height: 100%;
      padding-bottom: 60px;
      .left {
        position: relative;
        width: 100%;
        background-color: #cccccc;
        .menu {
          height: 40px;
          background-color: #333;
          text-align: left;
          display: flex;
          align-items: center;
          .item {
            color: #ffffff;
            padding: 0 10px;
            position: relative;
            cursor: pointer;
            display: flex;
            align-items: center;
            margin-right: 10px;
            span {
              padding: 0 5px;
            }
            input {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              opacity: 0;
              font-size: 0;
              cursor: pointer;
            }
          }
        }
        .content {
          text-align: center;
          overflow: auto;
          height: calc(100% - 40px);
          position: relative;
          .input {
            position: relative;
            width: 366px;
            height: 300px;
            border: 5px dashed #999;
            border-radius: 5px;
            background-size: 128px 128px;
            text-align: center;
            margin: 0 auto;
            transform: translateY(50%);
            .loadimage {
              width: 361px;
              height: 295px;
              position: absolute;
              top: 0;
              left: 0;
              opacity: 0;
              z-index: 999;
            }
          }
          .canvas {
            margin: 0 auto;
            position: relative;
          }
          .myPannel {
            position: absolute;
            top: 0;
            left: 0;
            width: auto;
          }
        }
      }
      .right {
        width: 300px;
        padding: 0 10px;
      }
    }
    .dialog-footer {
      padding: 10px 0;
      position: absolute;
      bottom: 0;
      width: calc(100% - 40px);
      text-align: center;
    }
  }
  .loading {
    background-color: rgba($color: #000000, $alpha: 0.5);
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    z-index: 2100;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    i {
      font-size: 40px;
    }
  }
  /deep/.el-dialog__body {
    padding-top: 0;
    padding-bottom: 0;
    height: calc(100% - 54px);
  }
  .dialog-wrap {
    height: 100%;
  }
}
</style>