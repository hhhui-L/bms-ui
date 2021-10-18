export function formatDate () {
  var time = new Date()
  const year = time.getFullYear() // 年
  const month = time.getMonth() + 1 // 月
  const day = time.getDate() // 日
  let hour = time.getHours() // 时
  hour = hour < 10 ? '0' + hour : hour // 如果只有一位，则前面补零
  let minute = time.getMinutes() // 分
  minute = minute < 10 ? '0' + minute : minute // 如果只有一位，则前面补零
  let second = time.getSeconds() // 秒
  second = second < 10 ? '0' + second : second // 如果只有一位，则前面补零
  var date = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
  console.log(date)
  return date
}
export function exchangeDate (time) {
  const year = time.getFullYear() // 年
  const month = time.getMonth() + 1 // 月
  const day = time.getDate() // 日
  let hour = time.getHours() // 时
  hour = hour < 10 ? '0' + hour : hour // 如果只有一位，则前面补零
  let minute = time.getMinutes() // 分
  minute = minute < 10 ? '0' + minute : minute // 如果只有一位，则前面补零
  let second = time.getSeconds() // 秒
  second = second < 10 ? '0' + second : second // 如果只有一位，则前面补零
  var date = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
  return date
}
