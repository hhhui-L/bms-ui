import { request } from './request'

// 添加线路
export function addRoute (data) {
  return request({
    url: '/dev/addroute',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}
// 更新线路
export function updateRoute (data) {
  return request({
    url: '/dev/updateroute',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}
// 删除线路
export function deleteRoute (data) {
  return request({
    url: '/dev/delroute',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}
// 获取线路
export function getRoute (data) {
  return request({
    url: '/dev/findroute',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}
