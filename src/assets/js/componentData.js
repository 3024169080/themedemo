import { DFSImg } from "@/filters/index";

export default {
  list: [
    {
      componentCode: "goodsList",
      queryProductInfo: require("@/api/goods/productCategory").queryProductInfo,
      DFSImg: DFSImg
    }
  ]
};
