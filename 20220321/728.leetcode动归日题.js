/**
 * 2022/03/27 动归日题
 * 53. 最大子数组和
 * 给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
 * 
 * 子数组 是数组中的一个连续部分。
 * 
 * 示例 1：
 * 
 * 输入：nums = [-2,1,-3,4,-1,2,1,-5,4]
 * 输出：6
 * 解释：连续子数组 [4,-1,2,1] 的和最大，为 6 。
 * 示例 2：
 * 
 * 输入：nums = [1]
 * 输出：1
 * 示例 3：
 * 
 * 输入：nums = [5,4,-1,7,8]
 * 输出：23
 *  
 * 
 * 提示：
 * 
 * 1 <= nums.length <= 105
 * -104 <= nums[i] <= 104
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
 var maxSubArray = function(nums) {
  let pre = 0, maxAns = nums[0]
  nums.forEach(x => {
    pre = Math.max(pre + x, x)
    maxAns = Math.max(maxAns, pre)
  })
  return maxAns
};

/**
 * 918. 环形子数组的最大和
 * 给定一个长度为 n 的环形整数数组 nums ，返回 nums 的非空 子数组 的最大可能和 。
 * 
 * 环形数组 意味着数组的末端将会与开头相连呈环状。形式上， nums[i] 的下一个元素是 nums[(i + 1) % n] ， nums[i] 的前一个元素是 nums[(i - 1 + n) % n] 。
 * 
 * 子数组 最多只能包含固定缓冲区 nums 中的每个元素一次。形式上，对于子数组 nums[i], nums[i + 1], ..., nums[j] ，不存在 i <= k1, k2 <= j 其中 k1 % n == k2 % n 。
 * 
 *  
 * 
 * 示例 1：
 * 
 * 输入：nums = [1,-2,3,-2]
 * 输出：3
 * 解释：从子数组 [3] 得到最大和 3
 * 示例 2：
 * 
 * 输入：nums = [5,-3,5]
 * 输出：10
 * 解释：从子数组 [5,5] 得到最大和 5 + 5 = 10
 * 示例 3：
 * 
 * 输入：nums = [3,-2,2,-3]
 * 输出：3
 * 解释：从子数组 [3] 和 [3,-2,2] 都可以得到最大和 3
 *  
 * 
 * 提示：
 * 
 * n == nums.length
 * 1 <= n <= 3 * 104
 * -3 * 104 <= nums[i] <= 3 * 104​​​​​​​
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
 var maxSubarraySumCircular = function(nums) {
  let max = nums[0], min = nums[0]
  let preMax = nums[0], preMin = nums[0]
  for (let i = 1; i < nums.length; ++i) {
    preMax = Math.max(preMax + nums[i], nums[i])
    preMin = Math.min(preMin + nums[i], nums[i])
    max = Math.max(max, preMax)
    min = Math.min(min, preMin)
  }
  if (max < 0) return max
  const sum = nums.reduce((total, item) => total += item, 0)
  return Math.max(sum - min, max)
};