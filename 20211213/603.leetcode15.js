/**
 * 2021/12/17 每日一题 15. 三数之和
 * 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有和为 0 且不重复的三元组。
 * 
 * 注意：答案中不可以包含重复的三元组。
 * 
 * 示例 1：
 * 
 * 输入：nums = [-1,0,1,2,-1,-4]
 * 输出：[[-1,-1,2],[-1,0,1]]
 * 示例 2：
 * 
 * 输入：nums = []
 * 输出：[]
 * 示例 3：
 * 
 * 输入：nums = [0]
 * 输出：[]
 *  
 * 
 * 提示：
 * 
 * 0 <= nums.length <= 3000
 * -105 <= nums[i] <= 105
 */
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
 var threeSum = function(nums) {
  let ans = []
  const len = nums.length
  if (nums == null || len < 3) return ans
  nums.sort((a, b) => a - b)
  for (let i = 0; i < len; ++i) {
    if (nums[i] > 0) break // 如果当前数字大于0，则三数之和一定大于0，所以结束循环
    if (i > 0 && nums[i] == nums[i - 1]) continue // 去重
    let left = i + 1, right = len - 1 // 定义双指针
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right]
      if (sum == 0) {
        ans.push([nums[i], nums[left], nums[right]])
        while (left < right && nums[left] == nums[left + 1]) left++ // 去重
        while (left < right && nums[right] == nums[right - 1]) right-- // 去重 
        left++
        right--
      } 
      else if (sum < 0) left++
      else if (sum > 0) right--
    }
  }
  return ans
};