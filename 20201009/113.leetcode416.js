/**
 * 2020/10/11 每日一题 416.分割等和子集
 * 给定一个只包含正整数的非空数组。是否可以将这个数组分割成两个子集，使得两个子集的元素和相等。
 * 注意:
 * 每个数组中的元素不会超过 100
 * 数组的大小不会超过 200
 * 示例 1:
 * 输入: [1, 5, 11, 5]
 * 输出: true
 * 解释: 数组可以分割成 [1, 5, 5] 和 [11].
 * 示例 2:
 * 输入: [1, 2, 3, 5]
 * 输出: false
 * 解释: 数组不能分割成两个元素和相等的子集.
 */
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function(nums) {
  let sum = 0
  for (let i of nums) {
    sum += i
  }
  if (sum % 2 !== 0) return false 
  const target = sum / 2
  const memo = new Map()
  const helper = (curSum, i) => {
    const key= curSum + '&' + i
    if (memo.has(key))return memo.get(key)
    if (i > nums.length - 1 || curSum > target) return false
    if (curSum == target) return true
    const res = helper(curSum + nums[i], i + 1) || helper(curSum, i + 1)
    memo.set(key, res)
    return res
  }
  return helper(0, 0)
};