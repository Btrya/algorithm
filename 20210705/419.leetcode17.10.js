/**
 * 2021/07/09 每日一题 面试题 17.10. 主要元素
 * 数组中占比超过一半的元素称之为主要元素。给你一个 整数 数组，找出其中的主要元素。若没有，返回 -1 。
 * 请设计时间复杂度为 O(N) 、空间复杂度为 O(1) 的解决方案。
 * 示例 1：
 * 
 * 输入：[1,2,5,9,5,9,5,5,5]
 * 输出：5
 * 示例 2：
 * 
 * 输入：[3,2]
 * 输出：-1
 * 示例 3：
 * 
 * 输入：[2,2,1,1,1,2,2]
 * 输出：2
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
  if (nums.length == 1) return nums[0]
  let n = nums.length, half = Math.floor(n / 2)
  nums.sort()
  let nowNum = nums[0], count = 1
  for (let i = 1; i < n; ++i) {
    if (nowNum !== nums[i]) {
      nowNum = nums[i]
      count = 1
    } else {
      count++
      if (count > half) return nowNum
    }
  }
  return -1
};

var majorityElement = function(nums) {
  let candidate = -1
  let count = 0
  for (const num of nums) {
    if (count === 0) candidate = num
    if (num === candidate) count++
    else count --
  }
  count = 0
  const length = nums.length
  for (const num of nums) {
    if (num === candidate) count++
  }
  return count * 2 > length ? candidate : -1
};

var majorityElement = function(nums) {
  let obj = {};
  for(let i = 0; i < nums.length; i++){
    obj[nums[i]] = obj[nums[i]] + 1 || 1;
    if(obj[nums[i]] > nums.length / 2)  return nums[i];
  }
  return -1
};
