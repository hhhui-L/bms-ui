import { request } from './request'

// 添加角色
export function addRole (data) {
  return request({
    url: '/role/addrole',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}
// 更新角色
export function updateRole (data) {
  return request({
    url: '/role/updaterole',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}
// 删除角色
export function deleteRole (data) {
  return request({
    url: '/role/delrole',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}
// 获取角色
export function getRole (data) {
  return request({
    url: '/role/findrole',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}
// 发送月报
export function sendMonthReport (data) {
  return request({
    url: '/mail/report',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}
