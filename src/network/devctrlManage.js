import { request } from './request'

// 添加控制器
export function addDevctrl (data) {
  return request({
    url: 'dev/addctrl',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}
// 更新控制器
export function updateDevctrl (data) {
  return request({
    url: '/dev/updatectrl',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}
// 删除控制器
export function deleteDevctrl (data) {
  return request({
    url: '/dev/delctrl',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}
// 获取控制器
export function getctrlData (data) {
  return request({
    url: '/dev/findctrl',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}
