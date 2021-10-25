/**
 * 2021/10/26 每日一题 剑指offer45.把数组排成最小的数
 * 输入一个非负整数数组，把数组里所有数字拼接起来排成一个数，打印能拼接出的所有数字中最小的一个。
 * 示例 1:
 * 
 * 输入: [10,2]
 * 输出: "102"
 * 示例 2:
 * 
 * 输入: [3,30,34,5,9]
 * 输出: "3033459"
 *  
 * 
 * 提示:
 * 
 * 0 < nums.length <= 100
 * 说明:
 * 
 * 输出结果可能非常大，所以你需要返回一个字符串而不是整数
 * 拼接起来的数字可能会有前导 0，最后结果不需要去掉前导 0
 */
/**
 * 冒泡排序完成
 * @param {number[]} nums
 * @return {string}
 */
 var minNumber = function(nums) {
  // 交换元素
  function swap(arr, i, j) {
    let temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
  }
  let swapped = true
  const n = nums.length
  // 最后一个没有经过排序的元素的下标
  let indexOfLastUnsortedElement = n - 1
  // 上次交换的位置
  let swappedIndex = -1
  while (swapped) {
    // 正常进入循环，先设置为 false ，如果发生了交换再设置为 true
    swapped = false
    for (let i = 0; i < indexOfLastUnsortedElement; ++i) {
      // 如果左边拼右边的数比 右边拼左边的数大 则交换
      if (('' + nums[i] + nums[i + 1]) > ('' + nums[i + 1] + nums[i])) {
        swap(nums, i, i + 1)
        // 发生了交换， swapped设置为 true， swappedIndex更新到对应下标
        swapped = true
        swappedIndex = i
      }
    }
    // 最后一个没有经过排序的元素的下标就是最后一次发生交换的位置
    indexOfLastUnsortedElement = swappedIndex
  }
  return nums.join('')
};