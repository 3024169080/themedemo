import request from '@/utils/request.js'
//获取主题信息
export default {
    shopCmsTheme(data) {
        return request({
            url: `${process.env.VUE_APP_OLSHOP_URL}/shopCmsTheme/${data}`,
            method: 'get'
        })
    },
    //运维获取主题信息
    CMSshopCmsTheme(data) {
        return request({
            url: `${process.env.VUE_APP_OLSHOP_URL}/cmsTheme/${data}`,
            method: 'get'
        })
    },

    //更新主题信息
    updateShopCmsTheme(data) {
        return request({
            url: `${process.env.VUE_APP_OLSHOP_URL}/shopCmsTheme/update_shop_cms_theme`,
            method: 'post',
            data
        })
    },

    //运维更新主题信息
    CMSupdateShopCmsTheme(data) {
        return request({
            url: `${process.env.VUE_APP_OLSHOP_URL}/cmsTheme/update_cms_theme_data`,
            method: 'post',
            data
        })
    }
}

