import request from "@/utils/request";
// 根据条件查询分类
export function getCategoryByCondition(data) {
  return request({
    url: `goodsService/productCategory/category_list`,
    method: "get",
    params: data
  });
}

// 根据分类的Id分页查询产品
export function queryProductByCategoryWithPage(data, params) {
  return request({
    url: `goodsService/terminal/get_terminal_product_by_query`,
    method: "post",
    data,
    params: params
  });
}
export function queryProductInfo(data) {
  return request({
    url: `shopApiService/product/query_product_info`,
    method: "post",
    data
  });
}
