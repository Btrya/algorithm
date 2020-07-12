/**
 * 给定一个排序数组，你需要在 原地 删除重复出现的元素，使得每个元素只出现一次，返回移除后数组的新长度。
 * 不要使用额外的数组空间，你必须在 原地 修改输入数组 并在使用 O(1) 额外空间的条件下完成。
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
  let count = 0
  for (let i = 1; i < nums.length; i ++) {
    if (nums[i] != nums[i-1]) {
      count++
      nums[count] = nums[i]
    }
  }
  return ++count
};


console.log(removeDuplicates([1,1,2]))
console.log(removeDuplicates([0,0,1,1,1,2,2,3,3,4]))


/**
 * 给你 n 个非负整数 a1，a2，...，an，每个数代表坐标中的一个点 (i, ai) 。在坐标内画 n 条垂直线，垂直线 i 的两个端点分别为 (i, ai) 和 (i, 0)。找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。
 * 说明：你不能倾斜容器，且 n 的值至少为 2。
 * @param {number[]} height
 * @return {number}
 */
// 暴力法
var maxArea = function(height) {
  let size = 0,
      len = height.length
  for (let i = 0; i < len - 1; i++) {
    for (let j = i + 1; j < len; j++) {
      let y = Math.min(height[i], height[j])
      size = Math.max(size, (j - i) * y)
    }
  }
  return size
};

// 双指针法
var maxArea = function(height) {
  let size = 0,
      left = 0,
      right = height.length - 1
  while(left < right) {
    // 求面积，选出短的作为一条边，右指针下标-左指针下标作为另一条边，两者相乘
    let tempArea = Math.min(height[left], height[right]) * (right - left)
    size = Math.max(size, tempArea)
    if (height[left] <= height[right]) {
      left ++
    } else {
      right --
    }
  }
  return size
};

console.log(maxArea([1,8,6,2,5,4,8,3,7]))