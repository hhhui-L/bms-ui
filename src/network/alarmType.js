import { request } from './request'

// 添加警告类型
export function addAlarmType (data) {
  return request({
    url: '/oa/addOaInfo',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}
// 更新警告类型
export function updateAlarmType (data) {
  return request({
    url: '/oa/updateOaInfo',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}
// 删除警告类型
export function deleteAlarmType (data) {
  return request({
    url: '/oa/deleteOaInfo',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}
// 获取警告类型
export function getAlarmType (data) {
  return request({
    url: '/oa/findOaInfoAll',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}

// 获取警告类型
export function conditionQueryAlarmType (data) {
  return request({
    url: '/oa/findOaInfo',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}
