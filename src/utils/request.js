/*
 * @Author: your name
 * @Date: 2020-08-10 13:51:24
 * @LastEditTime: 2020-08-11 15:42:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ghsc-front-pc\utils\request.js
 */
import axios from 'axios'
import { Message, MessageBox } from 'element-ui'

const service = axios.create({
  baseURL: process.env.VUE_APP_domain,
  timeout: 500000
});

service.interceptors.request.use(
  config => {
    console.log(process.env.VUE_APP_domain, "---------------------19");
    config.headers['Mayi-Token'] = localStorage.getItem('Mayi-Token') || ''
    return config
  },
  error => {
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// respone interceptor
service.interceptors.response.use(
  /**
     * 下面的注释为通过在response里，自定义code来标示请求状态
     * 当code返回如下情况则说明权限有问题，登出并返回到登录页
     * 如想通过xmlhttprequest来状态码标识 逻辑可写在下面error中
     * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
     */
  response => {
    const res = response.data
    res.ok = !(res.ok === 'false' || !res.ok)
    if (res.code !== '200') {
      if (res.msg) {
        Message({
          message: res.msg,
          type: 'error',
          duration: 2 * 1000
        })
      }
      // 未登录res.code === '-1' ||
      if (res.code === 401) {
        // 请自行在引入 MessageBox
        // import { Message, MessageBox } from 'element-ui'
        MessageBox.confirm('你已被退出，请重新登录', '确定退出', {
          confirmButtonText: '重新登录',
          type: 'warning'
        }).then(() => {
          // store.dispatch('FedLogOut').then(() => {
          //   location.reload() // 为了重新实例化vue-router对象 避免bug
          // })
          window.location.href = '/login'
        }).catch(() => {
          window.location.href = '/login'
        })
      }
      // return Promise.reject('error')
      return response
    } else {
      return response
    }
  },
  error => {
    console.log('err:' + error) // for debug
    return Promise.reject(error)
  }
)

export default service
