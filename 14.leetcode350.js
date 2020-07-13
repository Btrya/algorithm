/**
 * 给定两个数组，编写一个函数来计算它们的交集。
 * 示例 1:
 * 输入: nums1 = [1,2,2,1], nums2 = [2,2]
 * 输出: [2,2]
 * 示例 2:
 * 输入: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
 * 输出: [4,9]
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */

// 利用Map  时间复杂度O(n) 空间复杂度O(n)
var intersect = function(nums1, nums2) {
  let map = new Map()
  let res = []
  for(let i = 0;i < nums1.length; i++) {
      if (map.has(nums1[i])) {
          map.set(nums1[i], map.get(nums1[i]) + 1)
      } else {
          map.set(nums1[i], 1)
      }
  }
  for (let i = 0; i < nums2.length; i++) {
      let temp = nums2[i]
      let hashKey = map.get(nums2[i])
      if (map.has(temp)) {
          if (hashKey > 0) {
              map.set(temp, hashKey - 1)
              res.push(nums2[i])
          } else {
              map.delete(temp)
          }
      }
  }
  return res
};

// 双指针
var intersect = function(nums1, nums2) {
  let p1 = p2 = 0
  nums1 = nums1.sort((a, b) => a - b)
  nums2 = nums2.sort((a, b) => a - b)
  let res = []
  while (p1 < nums1.length && p2 < nums2.length) {
    if (nums1[p1] == nums2[p2]) {
      res.push(nums1[p1])
      p1++
      p2++
    } else if (nums1[p1] < nums2[p2]) {
      p1++
    } else {
      p2++
    }
  }
  return res
};

console.log(intersect([1, 2, 2, 1], [2, 2]))
console.log(intersect([4, 9, 5], [9, 4, 9, 8, 4]))