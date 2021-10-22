import { request } from './request'

// 获取某个电池组的信息及其管理的电池单体
export function getPackdetail (data) {
  return request({
    url: '/dash/packdetail',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}
// 获取电池组列表
export function getPacklist (data) {
  return request({
    url: '/dash/packlist',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}
// 获取某个电池组的状态
export function getPackstatus (data) {
  return request({
    url: '/dash/packstatus',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}
// 获取某个电池组及单体的实时信息
export function getRealtime (data) {
  return request({
    url: '/dash/realtime',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}

// 获取电压、电流、SOC
export function getChartData (data) {
  return request({
    url: '/findbycid',
    method: 'get',
    params: data
  })
}

// export function getExpRecordExcel(data) {
//   return myrequest({
//     url: '/api/v1/experiment/getExpRecordExcel',
//     method: 'get',
//     params: data
//   })
// }

// 根据cid和time获取历史数据
export function getRecordList (data) {
  return request({
    url: '/findbycidandtime',
    method: 'get',
    params: data
  })
}
