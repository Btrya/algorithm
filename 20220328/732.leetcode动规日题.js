/**
 * 2022/03/28 动规日题
 * 152. 乘积最大子数组
 * 给你一个整数数组 nums ，请你找出数组中乘积最大的非空连续子数组（该子数组中至少包含一个数字），并返回该子数组所对应的乘积。
 * 
 * 测试用例的答案是一个 32-位 整数。
 * 
 * 子数组 是数组的连续子序列。
 * 
 *  
 * 
 * 示例 1:
 * 
 * 输入: nums = [2,3,-2,4]
 * 输出: 6
 * 解释: 子数组 [2,3] 有最大乘积 6。
 * 示例 2:
 * 
 * 输入: nums = [-2,0,-1]
 * 输出: 0
 * 解释: 结果不能为 2, 因为 [-2,-1] 不是子数组。
 *  
 * 
 * 提示:
 * 
 * 1 <= nums.length <= 2 * 104
 * -10 <= nums[i] <= 10
 * nums 的任何前缀或后缀的乘积都 保证 是一个 32-位 整数
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function (nums) {
  let n = nums.length
  let max = new Array(n).fill(0)
  let min = new Array(n).fill(0)
  let ans = nums[0]
  max[0] = min[0] = nums[0]
  for (let i = 1; i < n; ++i) {
    max[i] = Math.max(max[i - 1] * nums[i], Math.max(min[i - 1] * nums[i], nums[i]))
    min[i] = Math.min(min[i - 1] * nums[i], Math.min(max[i - 1] * nums[i], nums[i]))
    ans = Math.max(ans, max[i])
  }
  return ans
};
// 空间优化
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function (nums) {
  let n = nums.length
  let max = nums[0]
  let min = nums[0]
  let ans = nums[0]
  for (let i = 1; i < n; ++i) {
    const mx = max,
      mn = min
    max = Math.max(mx * nums[i], Math.max(mn * nums[i], nums[i]))
    min = Math.min(mn * nums[i], Math.min(mx * nums[i], nums[i]))
    ans = Math.max(ans, max)
  }
  return ans
};

/**
 * 1567. 乘积为正数的最长子数组长度
 * 给你一个整数数组 nums ，请你求出乘积为正数的最长子数组的长度。
 * 
 * 一个数组的子数组是由原数组中零个或者更多个连续数字组成的数组。
 * 
 * 请你返回乘积为正数的最长子数组长度。
 * 
 *  
 * 
 * 示例  1：
 * 
 * 输入：nums = [1,-2,-3,4]
 * 输出：4
 * 解释：数组本身乘积就是正数，值为 24 。
 * 示例 2：
 * 
 * 输入：nums = [0,1,-2,-3,-4]
 * 输出：3
 * 解释：最长乘积为正数的子数组为 [1,-2,-3] ，乘积为 6 。
 * 注意，我们不能把 0 也包括到子数组中，因为这样乘积为 0 ，不是正数。
 * 示例 3：
 * 
 * 输入：nums = [-1,-2,-3,0,1]
 * 输出：2
 * 解释：乘积为正数的最长子数组是 [-1,-2] 或者 [-2,-3] 。
 *  
 * 
 * 提示：
 * 
 * 1 <= nums.length <= 10^5
 * -10^9 <= nums[i] <= 10^9
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var getMaxLen = function (nums) {
  let res = 0
  let z = 0,
    f = 0
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] == 0) {
      z = 0 // 正数长度
      f = 0 // 负数长度
    } else if (nums[i] > 0) {
      z++
      if (f > 0) f++
    } else {
      let temp = z
      z = f
      f = temp
      f++
      if (z > 0) z++
    }
    res = Math.max(res, z)
  }
  return res
};