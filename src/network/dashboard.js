// 获取电池组列表
import { request } from '@/network/request'

export function findAllBatterys () {
  return request({
    url: '/dash/batlist',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function findAlarmLog () {
  return request({
    url: '/dash/alarmlog',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
