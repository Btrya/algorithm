/**
 * 2020/11/02 每日一题 349. 两个数组的交集
 * 给定两个数组，编写一个函数来计算它们的交集。
 * 示例 1：
 * 
 * 输入：nums1 = [1,2,2,1], nums2 = [2,2]
 * 输出：[2]
 * 示例 2：
 * 
 * 输入：nums1 = [4,9,5], nums2 = [9,4,9,8,4]
 * 输出：[9,4]
 */
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
// 短，但是垃圾
var intersection = function(nums1, nums2) {
  return Array.from(new Set(nums1.concat(nums2).filter(v => nums1.includes(v) && nums2.includes(v))))
};

// set 更慢
var intersection = function(nums1, nums2) {
  const generate = (set1, set2) => {
    if (set1.size > set2.size) return generate(set2, set1)
    const tmpSet = new Set()
    for (const num of set1) {
      if (set2.has(num)) tmpSet.add(num)
    }
    return [...tmpSet]
  }
  const set1 = new Set(nums1)
  const set2 = new Set(nums2)
  return generate(set1, set2)
};

// map对象 快
var intersection = function(nums1, nums2) {
  const map = {};
  const res = [];
  for (const num1 of nums1) {
    map[num1] = true; // 记录nums1出现过的数字
  }
  for (const num2 of nums2) {
    if (map[num2]) {  // 如果nums2的这个数字在nums1出现过
      map[num2] = false; // 置为false，避免重复推入res
      res.push(num2);  // 交集数字推入res
    }
  }
  return res;
};