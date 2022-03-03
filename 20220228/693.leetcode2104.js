/**
 * 2022/03/04 每日一题 2104. 子数组范围和
 * 给你一个整数数组 nums 。nums 中，子数组的 范围 是子数组中最大元素和最小元素的差值。
 * 
 * 返回 nums 中 所有 子数组范围的 和 。
 * 
 * 子数组是数组中一个连续 非空 的元素序列。
 * 
 *  
 * 
 * 示例 1：
 * 
 * 输入：nums = [1,2,3]
 * 输出：4
 * 解释：nums 的 6 个子数组如下所示：
 * [1]，范围 = 最大 - 最小 = 1 - 1 = 0 
 * [2]，范围 = 2 - 2 = 0
 * [3]，范围 = 3 - 3 = 0
 * [1,2]，范围 = 2 - 1 = 1
 * [2,3]，范围 = 3 - 2 = 1
 * [1,2,3]，范围 = 3 - 1 = 2
 * 所有范围的和是 0 + 0 + 0 + 1 + 1 + 2 = 4
 * 示例 2：
 * 
 * 输入：nums = [1,3,3]
 * 输出：4
 * 解释：nums 的 6 个子数组如下所示：
 * [1]，范围 = 最大 - 最小 = 1 - 1 = 0
 * [3]，范围 = 3 - 3 = 0
 * [3]，范围 = 3 - 3 = 0
 * [1,3]，范围 = 3 - 1 = 2
 * [3,3]，范围 = 3 - 3 = 0
 * [1,3,3]，范围 = 3 - 1 = 2
 * 所有范围的和是 0 + 0 + 0 + 2 + 0 + 2 = 4
 * 示例 3：
 * 
 * 输入：nums = [4,-2,-3,4,1]
 * 输出：59
 * 解释：nums 中所有子数组范围的和是 59
 *  
 * 
 * 提示：
 * 
 * 1 <= nums.length <= 1000
 * -109 <= nums[i] <= 109
 *  
 * 
 * 进阶：你可以设计一种时间复杂度为 O(n) 的解决方案吗？
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var subArrayRanges = function (nums) {
  const n = nums.length;
  const minLeft = new Array(n).fill(0);
  const minRight = new Array(n).fill(0);
  const maxLeft = new Array(n).fill(0);
  const maxRight = new Array(n).fill(0);
  let minStack = [];
  let maxStack = [];
  for (let i = 0; i < n; i++) {
    while (minStack.length && nums[minStack[minStack.length - 1]] > nums[i]) {
      minStack.pop();
    }
    minLeft[i] = minStack.length === 0 ? -1 : minStack[minStack.length - 1];
    minStack.push(i);

    // 如果 nums[maxStack[maxStack.length - 1]] == nums[i], 那么根据定义，
    // nums[maxStack[maxStack.length - 1]] 逻辑上小于 nums[i]，因为 maxStack[maxStack.length - 1] < i
    while (maxStack.length && nums[maxStack[maxStack.length - 1]] <= nums[i]) {
      maxStack.pop();
    }
    maxLeft[i] = maxStack.length === 0 ? -1 : maxStack[maxStack.length - 1];
    maxStack.push(i);
  }
  minStack = [];
  maxStack = [];
  for (let i = n - 1; i >= 0; i--) {
    // 如果 nums[minStack[minStack.length - 1]] == nums[i], 那么根据定义，
    // nums[minStack[minStack.length - 1]] 逻辑上大于 nums[i]，因为 minStack[minStack.length - 1] > i
    while (minStack.length && nums[minStack[minStack.length - 1]] >= nums[i]) {
      minStack.pop();
    }
    minRight[i] = minStack.length === 0 ? n : minStack[minStack.length - 1];
    minStack.push(i);

    while (maxStack.length && nums[maxStack[maxStack.length - 1]] < nums[i]) {
      maxStack.pop();
    }
    maxRight[i] = maxStack.length === 0 ? n : maxStack[maxStack.length - 1];
    maxStack.push(i);
  }

  let sumMax = 0,
    sumMin = 0;
  for (let i = 0; i < n; i++) {
    sumMax += (maxRight[i] - i) * (i - maxLeft[i]) * nums[i];
    sumMin += (minRight[i] - i) * (i - minLeft[i]) * nums[i];
  }
  return sumMax - sumMin;
};