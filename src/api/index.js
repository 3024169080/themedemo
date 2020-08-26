import request from "@/utils/request";
export function getOssConfig() {
  return request({
    url: `${process.env
      .VUE_APP_OLSHOP_URL}/baseService/commons/getAliyunSign.htm`,
    method: "post"
  });
}
