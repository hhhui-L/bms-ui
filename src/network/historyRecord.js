import { request } from './request'

// 添加设备类型
export function addDevtype (data) {
  return request({
    url: '/dev/addtype',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}
// 更新设备类型
export function updateDevtype (data) {
  return request({
    url: '/dev/updatetype',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}
// 删除设备类型
export function deleteDevtype (data) {
  return request({
    url: '/dev/deltype',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}
// 获取设备类型
export function getDevtype (data) {
  return request({
    url: '/dev/findtype',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}
