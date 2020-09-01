<template>
  <div class="section" :style="{
      'width':width+'px',
      'height':height+'px'
  }">
    <div
      class="outer-left"
      @click="handleClick"
      @mousedown="handleMouseDownLeft"
      :style="rightShow?{'background-color': 'rgba(120, 120, 120, 0.5)','transition': 'all 0.5s ease'}:''"
    >
      <div class="outer-handler">
        <span class="span1">S{{tierNum+1}}</span>
        <span class="span2">高{{height}}px</span>
      </div>
      <div class="outer-slip" v-show="slip" :class="{'slip-open':slip}"></div>
      <!-- 竖向分割线 -->
      <div class="outer-line" ref="outer-line">
        <div
          class="line"
          :ref="'line'+index"
          v-for="(item,index) in Number(rowInput-1)"
          :key="index"
          @mousedown="e=>{return handleMouseDownLine(e,index)}"
        ></div>
      </div>
    </div>
    <div class="outer-right" :style="{
        'left':width+'px'
    }" v-show="rightShow">
      <p>
        <span v-popover:popover5>分栏</span>
      </p>
      <p @click="slip=!slip">
        <span>忽略</span>
      </p>
      <p @click="handleRemove">
        <span>删除</span>
      </p>
    </div>
    <div class="drag-rect" ref="drag-rect" @mousedown="handleMouseDown"></div>
    <el-popover
      class="row-wrap"
      ref="popover5"
      title="分栏"
      placement="bottom"
      v-model="visible2"
      @show="handlePopoverShow"
    >
      <div class="popover-wrap" style="margin-bottom:12px">
        <el-dropdown trigger="click" style="width:100%">
          <el-button style="width:100%">
            列数：{{copyRowInput}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu style="width:150px">
            <el-dropdown-item
              v-for="(item,index) in 7"
              :key="index"
              @click.native="handleDropdown(item)"
            >{{item}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div style="text-align: center; margin: 0">
        <el-button size="mini" type="text" @click="handleCancel">取消</el-button>
        <el-button type="primary" size="mini" @click="handleAddRow">确定</el-button>
      </div>
    </el-popover>
  </div>
</template>

<script>
export default {
  props: {
    tierNum: {
      type: Number,
      default: 0
    },
    heightNum: {
      type: Number,
      default: 0
    },
    width: {
      type: Number
    }
  },
  data() {
    return {
      slip: false,
      copyRowInput: 1,
      rowInput: 1,
      rightShow: false,
      visible2: false,
      oldHeight: 0,
      height: 100,
      top: 0,
      y: 0,
      dev: null,
      oldOffsetHeight: 0,
      firstTime: "",
      lastTime: "",
      key: false,
      stopMove: false,
      direction: -1,
      x: 0,
      clientX: 0,
      targetLine: null,
      lineIndex: -1,
      gapX: 25, //x间距
      gapY: 35, //y间距
      lastLineOffsetLeft: 0,
      nextLineOffsetLeft: 0
    };
  },
  methods: {
    handleMouseDownLeft(e) {
      console.log("-----handle");
      this.firstTime = new Date().getTime();
      document.addEventListener("mousemove", this.handleMouseMove);
      document.addEventListener("mouseup", this.handleMouseUp);
    },
    handleMouseDownLine(e, index) {
      document.addEventListener("mousemove", this.handleMouseMove);
      document.addEventListener("mouseup", this.handleMouseUp);
      console.log("line", index);
      this.lineIndex = index;
      this.direction = 1;
      this.x = e.target.offsetLeft;
      this.clientX = e.clientX;
      this.targetLine = e.target;

      //-----优化
      this.lastLineOffsetLeft =
        this.$refs["line" + (this.lineIndex - 1)] &&
        this.$refs["line" + (this.lineIndex - 1)][0]
          ? this.$refs["line" + (this.lineIndex - 1)][0].offsetLeft
          : null;
      this.nextLineOffsetLeft =
        this.$refs["line" + (this.lineIndex + 1)] &&
        this.$refs["line" + (this.lineIndex + 1)][0]
          ? this.$refs["line" + (this.lineIndex + 1)][0].offsetLeft
          : null;
      console.log(this.lastLineOffsetLeft, this.nextLineOffsetLeft);
    },
    handleClick() {
      if (this.key) {
        console.log("点击");
        this.key = false;
        this.$emit("initSectionRight");
        this.rightShow = !this.rightShow;
      }
    },
    handleMouseDown(e) {
      document.addEventListener("mousemove", this.handleMouseMove);
      document.addEventListener("mouseup", this.handleMouseUp);
      this.direction = 0;
      this.dev = this.$refs["drag-rect"];
      this.y = e.clientY;
      this.top = this.dev.offsetTop;
      this.oldHeight = this.height;
      this.$emit("down");
      console.log("move");
    },
    handleMouseMove(e) {
      console.log("move");
      if (this.direction == 0) {
        let yd = e.clientY - this.y + this.oldHeight;
        if (yd <= this.gapY) {
          yd = this.gapY;
        }
        this.height = yd;
        let offset = this.height - this.oldHeight;
        this.$emit("offsetY", offset);
      } else if (this.direction == 1) {
        let offsetLeft = this.x + (e.clientX - this.clientX);
        // 校验边距
        if (offsetLeft <= this.gapX) {
          offsetLeft = this.gapX;
        } else if (offsetLeft > this.width - this.gapX) {
          offsetLeft = this.width - this.gapX;
        }
        //校验左右line距离
        if (
          this.lastLineOffsetLeft &&
          offsetLeft <= this.lastLineOffsetLeft + this.gapX
        ) {
          offsetLeft = this.lastLineOffsetLeft + this.gapX;
        } else if (
          this.nextLineOffsetLeft &&
          offsetLeft >= this.nextLineOffsetLeft - this.gapX
        ) {
          offsetLeft = this.nextLineOffsetLeft - this.gapX;
        }

        this.targetLine.style.left = offsetLeft + "px";
      }
    },
    handleMouseUp() {
      console.log("?????----------up");
      document.removeEventListener("mousemove", this.handleMouseMove);
      document.removeEventListener("mouseup", this.handleMouseUp);
      this.direction = -1;
      this.lastTime = new Date().getTime();
      if (this.lastTime - this.firstTime < 200) {
        this.key = true;
      }
    },
    setOldHeight(res) {
      this.oldOffsetHeight = this.height;
    },
    setOffsetY(res) {
      this.height = this.oldOffsetHeight - res;
      if (this.height <= this.gapY) {
        this.height = this.gapY;
        this.$emit("stop");
      }
    },
    setStopMove() {
      this.stopMove = true;
      // this.$emit('aaa')
    },
    handleRemove() {
      this.rowInput = 1;
      this.$emit("removeSelf");
    },
    handlePopoverShow() {
      this.copyRowInput = this.rowInput;
    },
    handleCancel() {
      this.visible2 = false;
      this.copyRowInput = this.rowInput;
    },
    handleAddRow() {
      this.visible2 = false;
      this.rowInput = this.copyRowInput;
      //x轴分割
      let rectX = this.width / this.rowInput;
      this.$nextTick(() => {
        for (let i = 0; i < this.rowInput - 1; i++) {
          this.$refs["line" + i][0].style.left = rectX * (i + 1) + "px";
        }
      });
    },
    handleDropdown(item) {
      this.copyRowInput = item;
    },
    getRect() {
      let arr = [];
      if (this.rowInput > 1) {
        for (let i = 0; i <= this.rowInput - 1; i++) {
          arr.push({
            x: i == 0 ? 0 : this.$refs["line" + (i - 1)][0].offsetLeft,
            y: 0,
            w:
              i == 0
                ? this.$refs["line" + i][0].offsetLeft
                : i == this.rowInput - 1
                ? this.width - this.$refs["line" + (i - 1)][0].offsetLeft
                : this.$refs["line" + i][0].offsetLeft -
                  this.$refs["line" + (i - 1)][0].offsetLeft,
            h: this.height
          });
        }
      } else {
        arr.push({
          x: 0,
          y: 0,
          w: this.width,
          h: this.height
        });
      }
      return arr;
    }
  }
};
</script>

<style lang="scss" scoped>
.section {
  width: 100%;
  position: relative;
  clear: both;
  text-align: left;
  .outer-left {
    transition: all 0.5s ease;
    height: 100%;
    background-color: rgba(120, 120, 120, 0.3);
    position: relative;
    .outer-handler {
      height: 30px;
      line-height: 30px;
      position: absolute;
      top: 0;
      left: 0;
      background-color: #aaa;
      color: #fff;
      .span1 {
        padding: 5px 7px;
        background-color: #999;
      }
      .span2 {
        padding: 5px 7px;
      }
    }
    .outer-slip {
      height: 100%;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      overflow: hidden;
    }
    .slip-open {
      background-image: -webkit-gradient(
        linear,
        0 0,
        100% 100%,
        color-stop(0.25, rgba(255, 255, 255, 0.3)),
        color-stop(0.25, transparent),
        color-stop(0.5, transparent),
        color-stop(0.5, rgba(255, 255, 255, 0.3)),
        color-stop(0.75, rgba(255, 255, 255, 0.3)),
        color-stop(0.75, transparent),
        to(transparent)
      );
      background-size: 8px 8px;
    }
    .outer-line {
      height: 100%;
      position: relative;
      .line {
        height: 100%;
        width: 2px;
        border-left: 1.5px dashed #000;
        cursor: w-resize;
        position: absolute;
        top: 0;
        left: 0;
      }
    }
  }
  .outer-right {
    position: absolute;
    top: 0;
    width: 100px;
    padding: 7px;
    color: #fff;
    p {
      padding-bottom: 7px;
      cursor: pointer;
      transition: all 0.5s ease;
      text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.25);
    }
    p:hover {
      transition: all 0.5s ease;
      text-shadow: 2px 1px 5px rgba(0, 0, 0, 1);
    }
  }
  .drag-rect {
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    background-color: #0000ff;
    opacity: 0.5;
    cursor: s-resize;
    padding: 2px;
  }
  /deep/.popover-wrap {
    display: flex;
    align-items: center;
    padding: 5px 0;
    margin-bottom: 12px;
  }
}
</style>