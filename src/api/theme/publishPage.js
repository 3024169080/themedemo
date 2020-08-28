import request from '@/utils/request.js'

// 发布/取消发布页面
export function publishOrUnPublishPage(data) {
    return request({
      url: `${process.env.VUE_APP_OLSHOP_URL}/shopPage/publish_or_un_publish_page`,
      method: 'post',
      data
    })
  }