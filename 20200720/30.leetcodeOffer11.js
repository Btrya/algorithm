/**
 * 2020/7/22 leetcode每日一题 剑指 Offer 11. 旋转数组的最小数字
 * 把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。输入一个递增排序的数组的一个旋转，输出旋转数组的最小元素。
 * 例如，数组 [3,4,5,1,2] 为 [1,2,3,4,5] 的一个旋转，该数组的最小值为1。  
 * 示例 1：
 * 
 * 输入：[3,4,5,1,2]
 * 输出：1
 * 示例 2：
 * 
 * 输入：[2,2,2,0,1]
 * 输出：0
 */
/**
 * @param {number[]} numbers
 * @return {number}
 */
// 升序排序后返回第0个
var minArray = function(numbers) {
  if (!numbers) return -1
  return numbers.sort((a, b) => a - b)[0]
};

// 二分查找
var minArray = function(numbers) {
  let left = 0, right = numbers.length - 1
  while(left <= right) {
    let mid = Math.floor((right - left) / 2) + left
    if (numbers[mid] < numbers[right]) {
      right = mid
    } else if (numbers[mid] == numbers[right]){
      right = right - 1
    } else if (numbers[mid] > numbers[right]) {
      left = mid + 1
    }
  }
  return numbers[left]
};