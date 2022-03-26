/**
 * 2022/03/26 动态规划日题
 * 55. 跳跃游戏
 * 给定一个非负整数数组 nums ，你最初位于数组的 第一个下标 。
 * 
 * 数组中的每个元素代表你在该位置可以跳跃的最大长度。
 * 
 * 判断你是否能够到达最后一个下标。
 * 
 *  
 * 
 * 示例 1：
 * 
 * 输入：nums = [2,3,1,1,4]
 * 输出：true
 * 解释：可以先跳 1 步，从下标 0 到达下标 1, 然后再从下标 1 跳 3 步到达最后一个下标。
 * 示例 2：
 * 
 * 输入：nums = [3,2,1,0,4]
 * 输出：false
 * 解释：无论怎样，总会到达下标为 3 的位置。但该下标的最大跳跃长度是 0 ， 所以永远不可能到达最后一个下标。
 *  
 * 
 * 提示：
 * 
 * 1 <= nums.length <= 3 * 104
 * 0 <= nums[i] <= 105
 */
/**
 * @param {number[]} nums
 * @return {boolean}
 */
 var canJump = function(nums) {
  let n = nums.length - 1
  for (let i = n - 1; i >= 0; --i) {
    if (n - i <= nums[i]) {
      n = i
    }
  }
  return n === 0
};

/**
 * 跳跃游戏II
 * 给你一个非负整数数组 nums ，你最初位于数组的第一个位置。
 * 
 * 数组中的每个元素代表你在该位置可以跳跃的最大长度。
 * 
 * 你的目标是使用最少的跳跃次数到达数组的最后一个位置。
 * 
 * 假设你总是可以到达数组的最后一个位置。
 * 
 *  
 * 
 * 示例 1:
 * 
 * 输入: nums = [2,3,1,1,4]
 * 输出: 2
 * 解释: 跳到最后一个位置的最小跳跃数是 2。
 *      从下标为 0 跳到下标为 1 的位置，跳 1 步，然后跳 3 步到达数组的最后一个位置。
 * 示例 2:
 * 
 * 输入: nums = [2,3,0,1,4]
 * 输出: 2
 *  
 * 
 * 提示:
 * 
 * 1 <= nums.length <= 104
 * 0 <= nums[i] <= 1000
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
 var jump = function(nums) {
  let curIndex = 0, nextIndex = 0, steps = 0
  for (let i = 0; i < nums.length - 1; ++i) {
    nextIndex = Math.max(nums[i] + i, nextIndex)
    if (i === curIndex) {
      curIndex = nextIndex
      steps++
    }
  }
  return steps
};