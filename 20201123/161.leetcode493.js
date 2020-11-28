/**
 * 2020/11/28 每日一题 493. 翻转对
 * 给定一个数组 nums ，如果 i < j 且 nums[i] > 2*nums[j] 我们就将 (i, j) 称作一个重要翻转对。
 * 你需要返回给定数组中的重要翻转对的数量。
 * 
 * 示例 1:
 * 
 * 输入: [1,3,2,3,1]
 * 输出: 2
 * 示例 2:
 * 
 * 输入: [2,4,3,5,1]
 * 输出: 3
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var reversePairs = function(nums) {
  if (nums.length == 0) return 0
  return mergeSort(nums, new Array(nums.length), 0, nums.length - 1)
};
function mergeSort(nums, temp, start, end) {
  if (start == end) return 0
  let count = 0
  const mid = start + ((end - start) >> 1)
  count += mergeSort(nums, temp, start, mid)
  count += mergeSort(nums, temp, mid + 1, end)
  let i = start
  let j = mid + 1
  while (i <= mid && j <= end) {
    if (nums[i] > 2 * nums[j]) {
      count += mid - i + 1
      j++
    } else {
      i++
    }
  }
  i = start
  j = mid + 1
  for (let i = start; i <= end; i++) {
    temp[i] = nums[i]
  }
  let index = start
  while (i <= mid && j <= end) {
    if (temp[i] < temp[j]) {
      nums[index] = temp[i]
      index++
      i++
    } else {
      nums[index] = temp[j]
      index++
      j++
    }
  }
  while (i <= mid) {
    nums[index] = temp[i]
    index++
    i++
  }
  while (j <= end) {
    nums[index] = temp[j]
    index++
    j++
  }
  return count
}