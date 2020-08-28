import request from '@/utils/request.js'
//用户页面数据
export function singlePageInfo(data) {
  return request({
    url: `${process.env.VUE_APP_OLSHOP_URL}/shopPage/get_shop_pages_detail_by_id`,
    method: 'post',
    params: data
  })
}
//运维页面获取单页面数据
export function CMSsinglePageInfo(data) {
  return request({
    url: `${process.env.VUE_APP_OLSHOP_URL}/cmsPage/get_cms_page_detail_by_id`,
    method: 'post',
    params: data
  })
}
