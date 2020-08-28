import request from "@/utils/request";
export function getOssConfig() {
  return request({
    url: `${process.env
      .VUE_APP_BASE_URL}/commons/getAliyunSign.htm`,
    method: "post"
  });
}
