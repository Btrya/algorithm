/**
 * 转至leetcode 315题：计算右侧小于当前元素的个数
 * 给定一个整数数组 nums，按要求返回一个新数组 counts。数组 counts 有该性质： counts[i] 的值是  nums[i] 右侧小于 nums[i] 的元素的数量。
 * 输入: [5,2,6,1]
 * 输出: [2,1,1,0] 
 * @param {number[]} nums
 * @return {number[]}
 */

var countSmaller = function(nums) {
  let arr = []
  nums.forEach((item, index) => {
    let count = 0
    for (let i = index; i < nums.length; i++ ) {
      if (item > nums[i]) {
        count++
      }
    }
    arr.push(count)
  })
  return arr
};


let testData = [5,2,6,1]
console.log(countSmaller(testData))