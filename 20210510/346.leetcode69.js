/**
 * 2021/05/11 每日第二题 69. x 的平方根
 * 实现 int sqrt(int x) 函数。
 * 
 * 计算并返回 x 的平方根，其中 x 是非负整数。
 * 
 * 由于返回类型是整数，结果只保留整数的部分，小数部分将被舍去。
 * 
 * 示例 1:
 * 
 * 输入: 4
 * 输出: 2
 * 示例 2:
 * 
 * 输入: 8
 * 输出: 2
 * 说明: 8 的平方根是 2.82842..., 
 *      由于返回类型是整数，小数部分将被舍去。
 */
/**
 * @param {number} x
 * @return {number}
 */
 var mySqrt = function(x) {
  if (x < 2) return x
  let left = 0, right = Math.floor(x / 2)
  while (left <= right) {
    const mid = Math.floor((right - left) / 2) + left
    if (mid * mid == x) return mid
    if (mid * mid < x) left = mid + 1
    else right = mid - 1
  }
  return right
};