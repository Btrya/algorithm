/**
 * 2021/01/02 每日一题 239. 滑动窗口最大值
 * 给你一个整数数组 nums，有一个大小为 k 的滑动窗口从数组的最左侧移动到数组的最右侧。
 * 你只可以看到在滑动窗口内的 k 个数字。滑动窗口每次只向右移动一位。
 * 返回滑动窗口中的最大值。
 * 示例 1：
 * 
 * 输入：nums = [1,3,-1,-3,5,3,6,7], k = 3
 * 输出：[3,3,5,5,6,7]
 * 解释：
 * 滑动窗口的位置                最大值
 * ---------------               -----
 * [1  3  -1] -3  5  3  6  7       3
 *  1 [3  -1  -3] 5  3  6  7       3
 *  1  3 [-1  -3  5] 3  6  7       5
 *  1  3  -1 [-3  5  3] 6  7       5
 *  1  3  -1  -3 [5  3  6] 7       6
 *  1  3  -1  -3  5 [3  6  7]      7
 * 示例 2：
 * 
 * 输入：nums = [1], k = 1
 * 输出：[1]
 * 示例 3：
 * 
 * 输入：nums = [1,-1], k = 1
 * 输出：[1,-1]
 * 示例 4：
 * 
 * 输入：nums = [9,11], k = 2
 * 输出：[11]
 * 示例 5：
 * 
 * 输入：nums = [4,-2], k = 2
 * 输出：[4]
 */
var maxSlidingWindow = function(nums, k) {
  const n = nums.length;
  const q = [];
  for (let i = 0; i < k; i++) {
      while (q.length && nums[i] >= nums[q[q.length - 1]]) {
          q.pop();
      }
      q.push(i);
  }

  const ans = [nums[q[0]]];
  for (let i = k; i < n; i++) {
      while (q.length && nums[i] >= nums[q[q.length - 1]]) {
          q.pop();
      }
      q.push(i);
      while (q[0] <= i - k) {
          q.shift();
      }
      ans.push(nums[q[0]]);
  }
  return ans;
}