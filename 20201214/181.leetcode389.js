/**
 * 2020/12/18 每日一题 389. 找不同
 * 给定两个字符串 s 和 t，它们只包含小写字母。
 * 字符串 t 由字符串 s 随机重排，然后在随机位置添加一个字母。
 * 
 * 请找出在 t 中被添加的字母。
 * 示例 1：
 * 
 * 输入：s = "abcd", t = "abcde"
 * 输出："e"
 * 解释：'e' 是那个被添加的字母。
 * 示例 2：
 * 
 * 输入：s = "", t = "y"
 * 输出："y"
 * 示例 3：
 * 
 * 输入：s = "a", t = "aa"
 * 输出："a"
 * 示例 4：
 * 
 * 输入：s = "ae", t = "aea"
 * 输出："a"
 */
/**
 * @param {string} s
 * @param {string} t
 * @return {character}
 */
// 将每一个s出现的字符替换成空，剩余的字符就是所求答案，时间复杂度偏高
var findTheDifference = function(s, t) {
  for (let i = 0; i < s.length; i++) {
    t = t.replace(s[i], '')
  }
  return t
};

// 求和，计算两者的ASCII码值得差得出被添加字符得ASCII码再转化回来，时间复杂度O(N)
var findTheDifference = function(s, t) {
  let as = 0, at = 0;
  for (let i = 0; i < s.length; i++) {
      as += s[i].charCodeAt();
  }
  for (let i = 0; i < t.length; i++) {
      at += t[i].charCodeAt();
  }
  return String.fromCharCode(at - as);
};

// 位运算，两个字符串相加，转换成求字符串出现奇数次的字符，时间复杂度O(N)
var findTheDifference = function(s, t) {
  let ret = 0
  for (const ch of s) {
    ret ^= ch.charCodeAt()
  }
  for (const ch of t) {
    ret ^= ch.charCodeAt()
  }
  return String.fromCharCode(ret)
};

/**
 * 闲得蛋疼加个餐 4. 寻找两个正序数组的中位数
 * 给定两个大小为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。请你找出并返回这两个正序数组的中位数。
 * 进阶：你能设计一个时间复杂度为 O(log (m+n)) 的算法解决此问题吗？
 * 示例 1：
 * 
 * 输入：nums1 = [1,3], nums2 = [2]
 * 输出：2.00000
 * 解释：合并数组 = [1,2,3] ，中位数 2
 * 示例 2：
 * 
 * 输入：nums1 = [1,2], nums2 = [3,4]
 * 输出：2.50000
 * 解释：合并数组 = [1,2,3,4] ，中位数 (2 + 3) / 2 = 2.5
 * 示例 3：
 * 
 * 输入：nums1 = [0,0], nums2 = [0,0]
 * 输出：0.00000
 * 示例 4：
 * 
 * 输入：nums1 = [], nums2 = [1]
 * 输出：1.00000
 * 示例 5：
 * 
 * 输入：nums1 = [2], nums2 = []
 * 输出：2.00000
 */
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
  if (nums1.length > nums2.length) {
    [nums1, nums2] = [nums2, nums1]
  }
  const m = nums1.length
  const n = nums2.length
  let low = 0
  let high = m
  while(low <= high) {
    const i = low + Math.floor((high - low) / 2)
    const j = Math.floor((m + n + 1) / 2) - i

    const maxLeftA = i === 0 ? -Infinity : nums1[i-1]
    const minRightA = i === m ? Infinity : nums1[i]
    const maxLeftB = j === 0 ? -Infinity : nums2[j-1]
    const minRightB = j === n ? Infinity : nums2[j]

    if (maxLeftA <= minRightB && minRightA >= maxLeftB) {
      return (m + n) % 2 === 1
        ? Math.max(maxLeftA, maxLeftB)
        : (Math.max(maxLeftA, maxLeftB) + Math.min(minRightA, minRightB)) / 2
    } else if (maxLeftA > minRightB) {
      high = i - 1
    } else {
      low = low + 1
    }
  }
};