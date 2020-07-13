/**
 * 给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。
 * 你可以假设数组中无重复元素。
 * 
 * 示例 1:
 * 输入: [1,3,5,6], 5
 * 输出: 2
 * 
 * 示例 2:
 * 输入: [1,3,5,6], 2
 * 输出: 1
 * 
 * 示例 3:
 * 输入: [1,3,5,6], 7
 * 输出: 4
 * 
 * 示例 4:
 * 输入: [1,3,5,6], 0
 * 输出: 0
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */

// 直接遍历一遍，大于等于target的下标直接返回  时间复杂度O(n) 空间复杂度是O(1)
var searchInsert = function(nums, target) {
  if(target > nums[nums.length - 1]) return nums.length
  for (let i = 0; i < nums.length; i++) {
      if (target <= nums[i])
      return i
  }
};

// 二分查找法
var searchInsert = function(nums, target) {
  let left = 0,
      right = nums.length - 1
  while(left <= right) {
      const mid = (left + right) >> 1
      if (nums[mid] === target) return mid
      if (target < nums[mid]) {
          right = mid - 1
      } else {
          left = mid + 1
      }
  }
  return left
};
