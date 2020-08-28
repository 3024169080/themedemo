import request from '@/utils/request.js'

//用户保存
export function updatePageInfo(data) {
  return request({
    url: `${process.env.VUE_APP_OLSHOP_URL}/shopPage/save_or_update_shop_page_and_data`,
    method: 'post',
    data
  })
}
//运维保存
export function CMSupdatePageInfo(data) {
  return request({
    url: `${process.env.VUE_APP_OLSHOP_URL}/cmsPage/add_or_update_cms_page`,
    method: 'post',
    data
  })
}
