/**
 * 2021/01/20 每日一题 628. 三个数的最大乘积
 * 给定一个整型数组，在数组中找出由三个数组成的最大乘积，并输出这个乘积。
 * 
 * 示例 1:
 * 
 * 输入: [1,2,3]
 * 输出: 6
 * 示例 2:
 * 
 * 输入: [1,2,3,4]
 * 输出: 24
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
// 数组排序，假设数组全部为正整数则取最大三位，假设存在负数，则需要取最小的两个负数做再乘以最大的正数来做比较
var maximumProduct = function(nums) {
  const n = nums.length
  nums.sort((a, b) => b - a)
  return Math.max(nums[0] * nums[1] * nums[2], nums[0] * nums[n - 1] * nums[n - 2])
};