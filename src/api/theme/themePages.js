import request from '@/utils/request.js'

export function themePagesInfo(data) {
  return request({
    url: `${process.env.VUE_APP_OLSHOP_URL}/shopPage/get_shop_install_list_by_query`,
    method: 'post',
    data:data
  })
}
export function CMSthemePagesInfo(data) {
  return request({
    url: `${process.env.VUE_APP_OLSHOP_URL}/cmsPage/get_cms_pages_by_theme_id`,
    method: 'post',
    params:data
  })
}
