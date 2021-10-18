import { request } from './request'

// 添加用户
export function addUser (data) {
  return request({
    url: 'user/addUser',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}
// 删除用户
export function deleteUser (data) {
  return request({
    url: '/user/deleteUser',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}
// 更新用户
export function updateUser (data) {
  return request({
    url: '/user/updateUser',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}
// 获取用户
export function getUser (data) {
  return request({
    url: '/user/findUser',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}
