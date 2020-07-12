/**
 * 字符串出现的不重复最长长度
 * @param {String} str
 * @return {number}
 */

function myStrNoRepeatMaxLen(str) {
  const arr = [...str]
  let resLen = 1
  let result = arr.reduce((pre, cur, index, arr) => {
    // 至少为1个长度单位不重复
    if (index == 0) {
      return cur
    } else {
      // 上一个累积值中不包含当前的值则拼接
      if (pre.indexOf(cur) < 0) {
        return pre + cur
      } else if (resLen < pre.length) {  // 有重复值且记录的长度小于当前的长度
        resLen = pre.length
        return pre.slice(pre.indexOf(cur) + 1, pre.length) + cur  // 返回重复值+1到字符串末的这段字符串再加上重复的字符串
      } else {
        return pre.slice(pre.indexOf(cur) + 1, pre.length) + cur
      }
    }
  }, "")
  if (resLen < result.length) {
    resLen = result.length
  }
  return resLen
}


let testData = 'oytabcdefgefgdcba'

console.log(myStrNoRepeatMaxLen(testData))