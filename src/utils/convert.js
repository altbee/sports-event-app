const shortMonthStrs = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

// str: '2018-02-03'
export const dateStringToDMM = str => {
  const ymd = String(str).split('-')
  const mm = Number(ymd[1])
  const dd = ymd[2]

  return `${dd} ${shortMonthStrs[mm - 1]}`
}

// str: '2018-02-03'
export const dateStringToDMMYYYY = str => {
  const ymd = String(str).split('-')
  const mm = Number(ymd[1])
  const dd = ymd[2]

  return `${dd} ${shortMonthStrs[mm - 1]},${ymd[0]}`
}

export const getTimeFromUTCDateStr = str => {
  const date = new Date(str)
  //const offset = date.getTimezoneOffset()
  //date.setMinutes(date.getMinutes() + offset)
  const mm = date.getMinutes()
  const hh = date.getHours()
  return `${hh > 9 ? hh : `0${hh}`}:${mm > 9 ? mm : `0${mm}`}`
}
