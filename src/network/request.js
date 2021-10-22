// 另外的服务端口，重新创建实例
/* const instance = axios.create({
  baseURL: 'http://localhost:8089',
  timeout: 5000
})
instance({
  url: '/login'
}).then(res =>{
  console.log(res);
}) */
import axios from 'axios'

export function request (config) {
  // 1.创建axios的实例
  const instance = axios.create({
    // baseURL: 'http://47.97.21.239:5000',
    baseURL: 'http://192.168.0.110:5000',
    // baseURL: 'http://192.168.0.122:5000',
    timeout: 5000
  })
  // 2.axios的拦截器:config,err只是参数名称，可以写其他的
  // 2.1 请求拦截
  instance.interceptors.request.use(config => {
    console.log(config)
    /* 应用：1)拦截一些不满足服务器要求的信息
    2)每次发送网络请求时，都希望在界面中显示一个请求的图标
    3)某些网络请求(比如登录(token))，必须携带一些特殊的信息 */
    // 拦截后需要返回
    return config
  }, err => {
    console.log(err)
  })
  // 2.2 响应拦截
  instance.interceptors.response.use(res => {
    console.log(res)
    // data是真正的返回结果
    return res
  }, err => {
    console.log(err)
  })
  // 3.发送真正的网络请求(返回的是Promise)
  return instance(config)
}
/* export function request (config, success, failure) {
  // 1.创建axios的实例
  const instance = axios.create({
    baseURL: 'http://localhost:8089',
    timeout: 5000
  })
  // 发送真正的网络请求
  instance(config).then(res =>{
    // console.log(res)
    success(res)
  })
    .catch(err =>{
      // console.log(err)
      failure(err)
    })
} */
