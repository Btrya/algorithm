/**
 * 2020/11/26 每日一题 164. 最大间距
 * 给定一个无序的数组，找出数组在排序之后，相邻元素之间最大的差值。
 * 如果数组元素个数小于 2，则返回 0。
 * 示例 1:
 * 
 * 输入: [3,6,9,1]
 * 输出: 3
 * 解释: 排序后的数组是 [1,3,6,9], 其中相邻元素 (3,6) 和 (6,9) 之间都存在最大差值 3。
 * 示例 2:
 * 
 * 输入: [10]
 * 输出: 0
 * 解释: 数组元素个数小于 2，因此返回 0。
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumGap = function(nums) {
  if (nums.length < 2) return 0
  nums = nums.sort((a, b) => a - b)
  let i = 0, res = Number.MIN_SAFE_INTEGER
  while (i < nums.length - 1) {
    const dif = nums[i + 1] - nums[i]
    res = Math.max(res, dif)
    i++
  }
  return res
};