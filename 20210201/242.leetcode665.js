/**
 * 2021/02/07 每日一题 665. 非递减数列
 * 给你一个长度为 n 的整数数组，请你判断在 最多 改变 1 个元素的情况下，该数组能否变成一个非递减数列。
 * 我们是这样定义一个非递减数列的： 对于数组中所有的 i (0 <= i <= n-2)，总满足 nums[i] <= nums[i + 1]。
 * 示例 1:
 * 
 * 输入: nums = [4,2,3]
 * 输出: true
 * 解释: 你可以通过把第一个4变成1来使得它成为一个非递减数列。
 * 示例 2:
 * 
 * 输入: nums = [4,2,1]
 * 输出: false
 * 解释: 你不能在只改变一个元素的情况下将其变为非递减数列。
 */
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var checkPossibility = function(nums) {
  if (nums.length < 1) return false
  let couldChange = true, n = nums.length
  for (let i = 0; i < n - 1; i++) {
    const x = nums[i], y = nums[i + 1]
    if (x > y) {
      if (!couldChange) {
          return false;
      }
      couldChange = false;
      if (i > 0 && y < nums[i - 1]) {
          nums[i + 1] = x;
      }
    }
  }
  return true
};