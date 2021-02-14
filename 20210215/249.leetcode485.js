/**
 * 2021/02/15 每日一题 485.最大连续1的个数
 * 给定一个二进制数组， 计算其中最大连续1的个数。
 * 
 * 示例 1:
 * 
 * 输入: [1,1,0,1,1,1]
 * 输出: 3
 * 解释: 开头的两位和最后的三位都是连续1，所以最大连续1的个数是 3.
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaxConsecutiveOnes = function(nums) {
  let max = 0, count = 0
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] == 1) count++
    else {
      max = Math.max(max, count)
      count = 0
    }
  }
  max = Math.max(max, count)
  return max
};