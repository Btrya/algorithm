/**
 * 2021/02/04 每日一题 643.子数组最大平均数I
 * 给定 n 个整数，找出平均数最大且长度为 k 的连续子数组，并输出该最大平均数。
 * 示例：
 * 输入：[1,12,-5,-6,50,3], k = 4
 * 输出：12.75
 * 解释：最大平均数 (12-5-6+50)/4 = 51/4 = 12.75
 * 提示：
 * 
 * 1 <= k <= n <= 30,000。
 * 所给数据范围 [-10,000，10,000]。
 */
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findMaxAverage = function(nums, k) {
  let i = 0, n = nums.length,sum = 0, maxSum = 0
  while (i < k) {
    sum += nums[i]
    i++
  }
  maxSum = sum
  while (i < n) {
    sum = sum - nums[i - k] + nums[i]
    sum += nums[i] - nums[i - k]
    maxSum = Math.max(maxSum, sum)
    i++
  }
  return maxSum / k
};