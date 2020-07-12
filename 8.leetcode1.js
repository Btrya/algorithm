/**
 * 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
 * 你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。
 * 给定 nums = [2, 7, 11, 15], target = 9
 * 因为 nums[0] + nums[1] = 2 + 7 = 9
 * 所以返回 [0, 1]
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */

 // 暴力法
var twoSum = function(nums, target) {
  if (nums.length < 2) 
  return 'error! nums.length not enough to use func'
  let arr = []
  nums.forEach((item, index) => {
    for(let i = index + 1; i < nums.length; i++) {
      if (target - item == nums[i]) {
        arr = [index, i]
      }
    }
  })
  return arr
};

// map解法
var twoSumMap = function(nums, target) {
  if (nums.length < 2) 
  return 'error! nums.length not enough to use func'
  let map = new Map()
  for(let i = 0; i < nums.length; i++) {
    let dif = target - nums[i]
    if (map.has(dif)) {
      return [map.get(dif), i]
    }
    map.set(nums[i], i)
  }
};


console.log(twoSum([2, 7, 11, 15], 9))
console.log(twoSum([3, 3], 6))
console.log(twoSum([1], 2))
console.log(twoSumMap([2, 7, 11, 15], 9))
console.log(twoSumMap([3, 3], 6))
console.log(twoSumMap([1], 2))