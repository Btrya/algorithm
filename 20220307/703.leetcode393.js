/**
 * 2022/03/13 每日一题 393. UTF-8 编码验证
 * https://leetcode-cn.com/problems/utf-8-validation/
 */
/**
 * @param {number[]} data
 * @return {boolean}
 */
var validUtf8 = function (data) {
  let count = 0
  let mostMask = 1 << 7
  let secondMask = 1 << 6
  for (let bit of data) {
    if (count == 0) { // 第一个bit或者后边无关紧要的bit
      let mask = 1 << 7
      while (bit & mask) { // 统计由第一位开始有几个1 字节就是几
        mask = mask >> 1
        count++
      }
      if (count == 0) continue // 0 说明是1字节或者无关紧要的bit 直接continue躲过count - 1
      if (count == 1 || count > 4) return false // 字节 = 1 或者 大于4 直接false
    } else {
      if (!(bit & mostMask && !(bit & secondMask))) return false // 从数组第二位开始 如果10开头的直接false
    }
    count-- // 每次count - 1
  }
  return count === 0
};