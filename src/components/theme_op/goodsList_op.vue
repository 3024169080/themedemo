<template>
  <!-- 商品列表 -->
  <div class="goodsList_op">
    <div class="comBlock">
      <div class="comName">设置</div>
      <div class="comMain bs">
        <div class="setBlock">
          <div class="setTitle">标题</div>
          <div class="setMain">
            <el-input size="small" v-model="title" maxlength="10" placeholder="请输入标题"></el-input>
          </div>
        </div>
        <div class="setBlock">
          <div class="setTitle">每行产品数</div>
          <div class="setMain">
            <el-slider v-model="rows" :min="1" :max="5"></el-slider>
          </div>
        </div>
        <div class="setBlock">
          <div class="setTitle">选择产品</div>
          <div class="setMain">
            <el-radio-group v-model="goodsSource" @change="onchangeGoodsSource" size="small">
              <el-radio
                v-for="(item,index) in goodsSourceList"
                :label="item.value"
                :key="index"
              >{{item.name}}</el-radio>
            </el-radio-group>
          </div>
          <div class="setMain goodsSource flex">
            <template v-if="goodsSource==1">
              <div
                v-for="(item,index) in goodsList"
                :key="index"
                class="goodsdiv"
                @click="removeItem(index)"
              >
                <img :src="item.coverImage?item.coverImage:item.productImgUrl | DFSImg" alt />
              </div>
              <div class="addGoods flex" @click="addGoods">
                <i class="iconfont iconhao"></i>
              </div>
            </template>
            <template v-else-if="goodsSource==2">
              <el-select
                v-model="categoryName"
                placeholder="请选择"
                @change="onchangeCategory"
                style="margin-top:10px"
                size="small"
              >
                <el-option
                  v-for="(item,index) in categoryList"
                  :key="item.id"
                  :label="item.categoryName"
                  :value="index"
                ></el-option>
              </el-select>
            </template>
          </div>
        </div>
        <div class="setBlock">
          <div class="setTitle">产品排序</div>
          <div class="setMain">
            <el-select v-model="goodsSort" placeholder="请选择" size="small">
              <el-option
                v-for="item in goodsSortList"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
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
    <!--商品信息-->
    <choice-goods ref="goodsSet" @selected="getSelectedGoodses" />
  </div>
</template>

<script type="text/ecmascript-6">
import choiceGoods from "@/components/themeOptions/choiceGoods";
import { getCategoryByCondition } from "@/api/goods/productCategory";
import { DFSImg } from "@/filters/index";
export default {
  name: "goodsList_op",
  props: {
    datas: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      goodsSourceList: [
        { name: "指定商品", value: 1 },
        { name: "分类商品", value: 2 },
      ],
      goodsSortList: [
        { name: "默认", value: 0 },
        { name: "销量", value: 1 },
        { name: "新品", value: 2 },
      ],
      categoryList: [],
      textSizeList: [
        {
          name: "小",
          value: 1.2,
        },
        {
          name: "中",
          value: 1.4,
        },
        {
          name: "大",
          value: 1.6,
        },
        {
          name: "特大",
          value: 2.2,
        },
      ],
    };
  },
  components: {
    choiceGoods,
  },
  computed: {
    title: {
      get() {
        return this.datas.componentData.title;
      },
      set(newVal) {
        this.datas.componentData.title = newVal;
      },
    },
    rows: {
      get() {
        return this.datas.componentData.rows;
      },
      set(newVal) {
        this.datas.componentData.rows = newVal;
      },
    },
    goodsSource: {
      get() {
        return this.datas.componentData.goodsSource;
      },
      set(newVal) {
        this.datas.componentData.goodsSource = newVal;
      },
    },
    goodsSort: {
      get() {
        return this.datas.componentData.goodsSort;
      },
      set(newVal) {
        this.datas.componentData.goodsSort = newVal;
      },
    },
    goodsList: {
      get() {
        return this.datas.componentData.goodsList || [];
      },
      set(newVal) {
        this.datas.componentData.goodsList = newVal;
      },
    },
    categoryName: {
      get() {
        return this.datas.componentData.categoryName || "";
      },
      set(newVal) {
        this.datas.componentData.categoryName = newVal;
      },
    },
    categoryId: {
      get() {
        return this.datas.componentData.categoryId || "";
      },
      set(newVal) {
        this.datas.componentData.categoryId = newVal;
      },
    },
    textSize: {
      get() {
        return this.datas.componentData.textSize || 1.2;
      },
      set(newVal) {
        this.datas.componentData.textSize = newVal;
      },
    },
  },
  created() {
    //获取分类列表
    getCategoryByCondition({
      parentCategoryId: 0,
    }).then((response) => {
      console.log(response, "!!!!!!!!!!1");
      this.defaultCategoryList = response.data.data;
      this.categoryList = this.defaultCategoryList;
    });
  },
  mounted() {},
  methods: {
    onchangeGoodsSource() {
      this.categoryName = "";
      this.categoryId = "";
      this.goodsList = [];
      this.goodsSort = 0;
    },
    addGoods() {
      this.$refs.goodsSet.open();
    },
    // 获取选择的商品
    getSelectedGoodses(values) {
      values.forEach((item) => {
        let arr = this.goodsList.filter(
          (item1) => item.productId == item1.productId
        );
        if (!arr.length) {
          item.productImgUrl = DFSImg(item.productImgUrl);
          this.goodsList.push(item);
        }
      });
      this.$forceUpdate();
    },
    removeItem(index) {
      this.goodsList.splice(index, 1);
      this.$forceUpdate();
    },
    onchangeCategory(item) {
      this.categoryName = this.categoryList[item].categoryName;
      this.categoryId = this.categoryList[item].id;
      console.log(
        this.categoryName,
        this.categoryId,
        "----this.datas.componentData.categoryId"
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.goodsList_op {
  .goodsSource {
    flex-wrap: wrap;
    align-items: center;
    .addGoods {
      width: 50px;
      height: 50px;
      border-radius: 8px;
      border: 1px dashed var(--minor-color);
      justify-content: center;
      align-items: center;
      cursor: pointer;
      margin-right: 2px;
      margin-bottom: 2px;
      &:hover {
        border-color: var(--main-color);
        color: var(--main-color);
      }
    }
    .goodsdiv {
      width: 50px;
      height: 50px;
      border-radius: 8px;
      overflow: hidden;
      margin-right: 2px;
      margin-bottom: 2px;
      border: 1px solid var(--minor-color);
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}
</style>
