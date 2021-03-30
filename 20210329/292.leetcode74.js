/**
 * 2021/03/30 每日一题  74. 搜索二维矩阵
 * 编写一个高效的算法来判断 m x n 矩阵中，是否存在一个目标值。该矩阵具有如下特性：
 * 
 * 每行中的整数从左到右按升序排列。
 * 每行的第一个整数大于前一行的最后一个整数。
 *  
 * 
 * 示例 1：
 * 
 * 
 * 输入：matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
 * 输出：true
 * 示例 2：
 * 
 * 
 * 输入：matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13
 * 输出：false
 */
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
 var searchMatrix = function(matrix, target) {
  let n = matrix.length
  for (let i = 1;i < n; i++) {
    if (matrix[i][0] > target) {
      return searchInsert(matrix[i - 1], target)
    }
  }
  return searchInsert(matrix[n - 1], target)
};
// 二分查找法
var searchInsert = function(nums, target) {
  let left = 0,
      right = nums.length - 1
  while(left <= right) {
      const mid = (left + right) >> 1
      if (nums[mid] === target) return true
      if (target < nums[mid]) {
          right = mid - 1
      } else {
          left = mid + 1
      }
  }
  return nums[left] == target
};