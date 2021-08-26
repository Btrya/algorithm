/**
 * 2021/08/26 每日一题 1979. 找出数组的最大公约数
 * 给你一个整数数组 nums ，返回数组中最大数和最小数的 最大公约数 。
 * 
 * 两个数的 最大公约数 是能够被两个数整除的最大正整数。
 * 
 * 示例 1：
 * 
 * 输入：nums = [2,5,6,9,10]
 * 输出：2
 * 解释：
 * nums 中最小的数是 2
 * nums 中最大的数是 10
 * 2 和 10 的最大公约数是 2
 * 示例 2：
 * 
 * 输入：nums = [7,5,6,8,3]
 * 输出：1
 * 解释：
 * nums 中最小的数是 3
 * nums 中最大的数是 8
 * 3 和 8 的最大公约数是 1
 * 示例 3：
 * 
 * 输入：nums = [3,3]
 * 输出：3
 * 解释：
 * nums 中最小的数是 3
 * nums 中最大的数是 3
 * 3 和 3 的最大公约数是 3
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var findGCD = function(nums) {
  let min= Math.min(...nums)
  let max = Math.max(...nums)
  const gcd = (a, b) => {
    if (b == 0) return a
    return gcd(b, a % b)
  }
  return gcd(min, max)
};