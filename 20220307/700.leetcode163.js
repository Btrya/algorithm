/**
 * 2022/03/10 每日一题 163. 缺失的区间
 * 给定一个排序的整数数组 nums ，其中元素的范围在 闭区间 [lower, upper] 当中，返回不包含在数组中的缺失区间。
 * 
 * 示例：
 * 
 * 输入: nums = [0, 1, 3, 50, 75], lower = 0 和 upper = 99,
 * 输出: ["2", "4->49", "51->74", "76->99"]
 */
/**
 * @param {number[]} nums
 * @param {number} lower
 * @param {number} upper
 * @return {string[]}
 */
var findMissingRanges = function (nums, lower, upper) {
  let ret = []
  let getItem = function (a, b) {
    if (a == b) return a + '';
    return a + '->' + b;
  }
  if (!nums || !nums.length) {
    return [getItem(lower, upper)]
  }
  if (lower < nums[0]) {
    ret.push(getItem(lower, nums[0] - 1))
  }
  if (nums.length > 1) {
    for (let i = 0; i < nums.length - 1; i++) {
      let a = nums[i];
      let b = nums[i + 1]
      if (a + 1 != b) {
        ret.push(getItem(a + 1, b - 1))
      }
    }
  }
  let lastNum = nums[nums.length - 1]
  if (lastNum != upper) {
    ret.push(getItem(lastNum + 1, upper))
  }
  return ret;
};

var findMissingRanges = function(nums, lower, upper) {
  let ans = []
  nums.unshift(lower - 1)
  nums.push(upper + 1)
  for (let i = 1; i < nums.length; ++i) {
    let left = nums[i - 1] + 1
    let right = nums[i] - 1
    if (right === left) {
      ans.push(left.toString())
    }
    if (right - left > 0) {
      ans.push(left + '->' + right)
    }
  }
  return ans
};