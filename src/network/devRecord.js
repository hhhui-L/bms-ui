import { request } from './request'

// 添加设备档案
export function addDevrecord (data) {
  return request({
    url: '/dev/addrecord',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}
// 更新设备档案
export function updateDevrecord (data) {
  return request({
    url: '/dev/updaterecord',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}
// 删除设备档案
export function deleteDevrecord (data) {
  return request({
    url: '/dev/delrecord',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}
// 获取设备档案
export function getDevrecord (data) {
  return request({
    url: '/dev/findrecord',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}
