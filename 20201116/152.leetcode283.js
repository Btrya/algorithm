/**
 * 2020/11/19 每日一题 283. 移动零
 * 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
 * 示例:
 * 
 * 输入: [0,1,0,3,12]
 * 输出: [1,3,12,0,0]
 */
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
// 快慢指针
var moveZeroes = function(nums) {
  for (let slow = 0, fast = 0; fast < nums.length; fast++) {
    if (nums[fast] !== 0) {
      if (fast !== slow) {
        nums[slow] = nums[fast]
        nums[fast] = 0
      }
      slow++
    }
  }
};

// 冒泡排序
var moveZeroes = function(nums) {
  // 交换元素
  function swap(arr, i, j) {
    let temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
    // 当然你也可以使用es6语法 [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  let zeroCount = 0
  for (let i = 0; i < nums.length - zeroCount; ++i) {
    if (nums[i] == 0) {
      for (let j = i; j < nums.length - zeroCount - 1; ++j) {
        swap(nums, j, j + 1)
      }
      zeroCount ++
      i--
    }
  }
};
