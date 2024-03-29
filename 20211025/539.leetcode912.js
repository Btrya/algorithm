/**
 * 2021/10/26 每日五题 912. 排序数组
 * 给你一个整数数组 nums，请你将该数组升序排列。
 * 示例 1：
 * 
 * 输入：nums = [5,2,3,1]
 * 输出：[1,2,3,5]
 * 示例 2：
 * 
 * 输入：nums = [5,1,1,2,0,0]
 * 输出：[0,0,1,1,2,5]
 *  
 * 
 * 提示：
 * 
 * 1 <= nums.length <= 50000
 * -50000 <= nums[i] <= 50000
 */
/**
 * 快速排序
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function(nums) {
  let minIndex
  for (let i = 0; i < nums.length - 1; ++i) {
    minIndex = i
    for (let j = i + 1; j < nums.length; ++j) {
      if (nums[minIndex] > nums[j]) {
        minIndex = j
      }
    }
    let temp = nums[i]
    nums[i] = nums[minIndex]
    nums[minIndex] = temp
  }
  return nums
};