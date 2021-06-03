/**
 * 2021/06/03 每日一题 525. 连续数组
 * 给定一个二进制数组 nums , 找到含有相同数量的 0 和 1 的最长连续子数组，并返回该子数组的长度。
 * 示例 1:
 * 
 * 输入: nums = [0,1]
 * 输出: 2
 * 说明: [0, 1] 是具有相同数量0和1的最长连续子数组。
 * 示例 2:
 * 
 * 输入: nums = [0,1,0]
 * 输出: 2
 * 说明: [0, 1] (或 [1, 0]) 是具有相同数量0和1的最长连续子数组。
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaxLength = function(nums) {
  const n = nums.length
  let maxLength = 0
  const map = new Map()
  let counter = 0
  map.set(counter, -1)
  for (let i = 0; i < n; i++) {
    const num = nums[i]
    if (num == 1) counter++
    else counter--
    if (map.has(counter)) {
      const prevIndex = map.get(counter)
      maxLength = Math.max(maxLength, i - prevIndex)
    } else {
      map.set(counter, i)
    }
  }
  return maxLength
};