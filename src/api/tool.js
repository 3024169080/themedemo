import request from "@/utils/request";
import qs from 'qs'

export default {
    postUploadBase64(data) {
        return request({
            url: `baseService/upload/uploadBase64.htm`,
            method: 'post',
            headers: { 'Content-Type':'application/x-www-form-urlencoded' },
            data:qs.stringify(data)
        })
    }
}