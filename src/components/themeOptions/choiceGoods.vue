<template>
  <div class="choiceGoods">
    <el-dialog class="center-dialog" :visible.sync="dialogGoodsVisible" title="选择商品" width="80%" :append-to-body="true">
      <el-input v-model="searchgoods" class="input-with-select" placeholder="商品名/SPU">
        <el-button slot="append" icon="el-icon-search" @click="queryGoods" />
      </el-input>
      <div class="checkAll" style="height: 370px;overflow-y:auto;">
        <el-table
          v-loading="loading"
          ref="multipleTable"
          :data="tableData"
          element-loading-text="给我一点时间"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="30%" />
          <el-table-column prop="goods" width="300">
            <template slot-scope="scope">
              <div class="img">
                <img :src="scope.row.coverImage?scope.row.coverImage:scope.row.productImgUrl | DFSImg" width="80px" height="80px" />
              </div>
              <!-- <img src="" alt=""> -->
              <div style="margin-left: 84px;height: 88px;width: 200px">
                <!-- <p :title="scope.row.productName" class="goods">{{ scope.row.productName.length>7?scope.row.productName.substring(0,5)+'...':scope.row.productName }}</p>
                <p :title="scope.row.goodsCode" class="goods">{{ scope.row.goodsCode.length>7? scope.row.goodsCode.substring(0,5)+'...':scope.row.goodsCode }}</p>-->
                <p
                  :title="scope.row.productName"
                  class="goods line-clamp1"
                >{{ scope.row.productName}}</p>
                <p
                  :title="scope.row.productCode"
                  class="goods line-clamp1"
                >{{ scope.row.productCode}}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="model" align="center">
            <template slot-scope="scope">{{ scope.row.orgId }}</template>
          </el-table-column>
          <el-table-column prop="model" align="center">
            <template slot-scope="scope">{{ scope.row.productSubtitle }}</template>
          </el-table-column>
          <el-table-column prop="count">
            <template slot-scope="scope" align="center">
              <!-- <p>实际数量：{{ scope.row.currentQty | formatNumber }}</p> -->
              <p>可售数量：{{ scope.row.saleQty | formatNumber }}</p>
            </template>
          </el-table-column>
          <el-table-column prop="price" align="right">
            <template slot-scope="scope">￥{{ scope.row.minPrice | formatNumber }}</template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      
      <pagination
        :total="total"
        :page.sync="query.pageNum"
        :limit.sync="query.pageSize"
        @pagination="handleCurrentChange"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogGoodsVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmSelected">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Pagination from "@/components/themeOptions/Pagination";
import { queryProductByCategoryWithPage } from "@/api/goods/productCategory";
export default {
  name: "ChoiceGoods",
  components: {
    Pagination
    // QueryPanel,
    // QueryPanelItem
  },
  filters: {
    // 格式化为两位小数
    formatNumber: function(value) {
      if (value != null || value != "") {
        return parseFloat(value).toFixed(2);
      }
    }
  },
  data() {
    return {
      loading: false,
      dialogGoodsVisible: false,
      query: {
        pageNum: 1,
        pageSize: 10,
        putawayFlag: 1,
        productName:'',
        sortColumn : 1,
        sortType:1,
        whetherQueryCollectCount:true
      },
      total: 0,
      searchgoods: "",
      tableData: [],
      multipleSelection: []
    };
  },
  methods: {
    onchangeCategory() {
      this.loading = true;
      queryProductByCategoryWithPage(this.query, {
        shopId: this.$route.query.shopid
      }).then(res => {
        if (res.data.code == 200) {
          this.tableData = res.data.data;
          this.total = parseInt(res.data.total);
          // goods.forEach(item => {
          //   var spec = "";
          //   item.specifications.forEach(specItem => {
          //     spec = spec + specItem.specificationValue + ",";
          //     if (
          //       specItem.specificationPictureUrl != "" &&
          //       typeof specItem.specificationPictureUrl != "undefined"
          //     ) {
          //       item.specificationPictureUrl = specItem.specificationPictureUrl;
          //     }
          //   });
          //   if (spec != "") {
          //     spec = spec.substring(0, spec.length - 1);
          //   }
          //   item.specification = spec;
          // });
          this.loading = false;
        }
      });
    },
    open() {
      this.dialogGoodsVisible = true;

      this.onchangeCategory();
    },
    // 分页方法
    handleCurrentChange(val) {
      this.query.pageNum = val.page;
      this.query.pageSize = val.limit;

      this.onchangeCategory();
    },
    queryGoods() {
      this.query.pageNum = 1;
      this.query.pageSize = 10;
      this.query.productNameOrSpu = this.searchgoods;
      this.onchangeCategory();
    },
    confirmSelected() {

      this.$emit("selected", this.multipleSelection);
      this.dialogGoodsVisible = false;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
};
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
.line-clamp1 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.checkAll {
  margin-top: 20px;
  .img {
    width: 80px;
    height: 80px;
    background: #999;
    float: left;
    margin: 0 10px;
  }
  /deep/.cell{
    text-overflow: unset;
  }
}
</style>
<style lang="scss">
.choiceGoods {
  .el-dialog {
    top: -12% !important;
  }
}
</style>
