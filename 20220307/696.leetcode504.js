/**
 * 2022/03/07 每日一题 504. 七进制数
 * 给定一个整数 num，将其转化为 7 进制，并以字符串形式输出。
 * 
 * 示例 1:
 * 
 * 输入: num = 100
 * 输出: "202"
 * 示例 2:
 * 
 * 输入: num = -7
 * 输出: "-10"
 */
/**
 * @param {number} num
 * @return {string}
 */
 var convertToBase7 = function(num) {
  if (num == 0) return "0"
  let isFushu = num < 0
  let res = []
  num = Math.abs(num) // 转成绝对值方便计算
  while (num) {
    res.unshift(num % 7)
    num = Math.floor(num / 7)
  }
  if (isFushu) res.unshift('-')
  return res.join('')
};