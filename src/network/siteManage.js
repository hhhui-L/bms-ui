import { request } from './request'

// 添加站点
export function addSite (data) {
  return request({
    url: '/dev/addsite',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}
// 更新站点
export function updateSite (data) {
  return request({
    url: '/dev/updatesite',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}
// 删除站点
export function deleteSite (data) {
  return request({
    url: '/dev/delsite',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}
// 获取站点
export function getSite (data) {
  return request({
    url: '/dev/findsite',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}
