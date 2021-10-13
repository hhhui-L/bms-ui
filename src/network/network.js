import { request } from './request'
export function login (data) {
  return request({
    url: 'user/login',
    method: 'post',
    headers: {
      'Content-Type': 'mutipart/form-data'
    },
    data
  })
}
export function register (data) {
  return request({
    url: 'user/register',
    method: 'post',
    headers: {
      'Content-Type': 'mutipart/form-data'
    },
    data
  })
}
export function addUser (data) {
  return request({
    url: 'add/user',
    method: 'post',
    headers: {
      'Content-Type': 'mutipart/form-data'
    },
    data
  })
}
export function changePassword (data) {
  return request({
    url: 'user/changepwd',
    method: 'post',
    headers: {
      'Content-Type': 'mutipart/form-data'
    },
    data
  })
}
export function getData (data) {
  return request({
    url: '/dataTest',
    method: 'post',
    headers: {
      'Content-Type': 'mutipart/form-data'
    },
    data
  })
}
export function getAllData (data) {
  return request({
    url: '/dataAll',
    method: 'post',
    headers: {
      'Content-Type': 'mutipart/form-data'
    },
    data
  })
}
