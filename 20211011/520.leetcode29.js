/**
 * 2021/10/12 每日一题 29. 两数相除
 * 给定两个整数，被除数 dividend 和除数 divisor。将两数相除，要求不使用乘法、除法和 mod 运算符。
 * 
 * 返回被除数 dividend 除以除数 divisor 得到的商。
 * 
 * 整数除法的结果应当截去（truncate）其小数部分，例如：truncate(8.345) = 8 以及 truncate(-2.7335) = -2
 * 
 * 示例 1:
 * 
 * 输入: dividend = 10, divisor = 3
 * 输出: 3
 * 解释: 10/3 = truncate(3.33333..) = truncate(3) = 3
 * 示例 2:
 * 
 * 输入: dividend = 7, divisor = -3
 * 输出: -2
 * 解释: 7/-3 = truncate(-2.33333..) = -2
 *  
 * 
 * 提示：
 * 
 * 被除数和除数均为 32 位有符号整数。
 * 除数不为 0。
 * 假设我们的环境只能存储 32 位有符号整数，其数值范围是 [−231,  231 − 1]。本题中，如果除法结果溢出，则返回 231 − 1。
 */
/**
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 */
var divide = function (a, b) {
  const INT_MIN = -Math.pow(2, 31)
  const INT_MAX = Math.pow(2, 31) - 1

  if (a == INT_MIN && b == -1) return INT_MAX

  const sign = (a > 0) ^ (b > 0) ? -1 : 1
  a = Math.abs(a)
  b = Math.abs(b)

  let res = 0
  for (let x = 31; x >= 0; x--) {
    if ((a >>> x) - b >= 0) {
      a = a - (b << x)
      res = res + (1 << x)
    }
  }
  if (res == -2147483648) return -2147483648
  // bug 修复：因为不能使用乘号，所以将乘号换成三目运算符
  return sign == 1 ? res : -res
};