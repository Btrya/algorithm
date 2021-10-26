/**
 * 2021/10/26 每日四题 215. 数组中的第K个最大元素
 * 给定整数数组 nums 和整数 k，请返回数组中第 k 个最大的元素。
 * 
 * 请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。
 * 示例 1:
 * 
 * 输入: [3,2,1,5,6,4] 和 k = 2
 * 输出: 5
 * 示例 2:
 * 
 * 输入: [3,2,3,1,2,4,5,5,6] 和 k = 4
 * 输出: 4
 *  
 * 
 * 提示：
 * 
 * 1 <= k <= nums.length <= 104
 * -104 <= nums[i] <= 104
 */
/**
 * 快速排序
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */
 var findKthLargest = function(arr, k) {
  let maxIndex
  const n = arr.length
  for (let i = 0; i < k; ++i) {
    maxIndex = i
    for (let j = i + 1; j < n; ++j) {
      // 记录最大值的下标
      if (arr[maxIndex] < arr[j]) {
        maxIndex = j
      }
    }
    // 将最小元素交换至首位
    let temp = arr[i]
    arr[i] = arr[maxIndex]
    arr[maxIndex] = temp
  }
  return arr[k - 1]
};