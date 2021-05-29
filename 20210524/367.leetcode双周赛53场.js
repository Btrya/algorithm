/**
 * 2021/05/29 双周赛第53场 fight！！！！
 * 5754. 长度为三且各字符不同的子字符串
 * 如果一个字符串不含有任何重复字符，我们称这个字符串为 好 字符串。
 * 
 * 给你一个字符串 s ，请你返回 s 中长度为 3 的 好子字符串 的数量。
 * 
 * 注意，如果相同的好子字符串出现多次，每一次都应该被记入答案之中。
 * 
 * 子字符串 是一个字符串中连续的字符序列。
 * 示例 1：
 * 
 * 输入：s = "xyzzaz"
 * 输出：1
 * 解释：总共有 4 个长度为 3 的子字符串："xyz"，"yzz"，"zza" 和 "zaz" 。
 * 唯一的长度为 3 的好子字符串是 "xyz" 。
 * 示例 2：
 * 
 * 输入：s = "aababcabc"
 * 输出：4
 * 解释：总共有 7 个长度为 3 的子字符串："aab"，"aba"，"bab"，"abc"，"bca"，"cab" 和 "abc" 。
 * 好子字符串包括 "abc"，"bca"，"cab" 和 "abc" 。
 */
/**
 * @param {string} s
 * @return {number}
 */
 var countGoodSubstrings = function(s) {
  let ans = 0
  let strs = [-1, s[0], s[1]]
  for (let i = 2; i < s.length; i++) {
    strs.shift()
    strs.push(s[i])
    const s1 = strs[0], s2 = strs[1], s3 = strs[2]
    if (s1 !== s2 && s1 !== s3 && s2 !== s3) ans++
  }
  return ans
};

/**
 * 5755. 数组中最大数对和的最小值
 * 一个数对 (a,b) 的 数对和 等于 a + b 。最大数对和 是一个数对数组中最大的 数对和 。
 * 
 * 比方说，如果我们有数对 (1,5) ，(2,3) 和 (4,4)，最大数对和 为 max(1+5, 2+3, 4+4) = max(6, 5, 8) = 8 。
 * 给你一个长度为 偶数 n 的数组 nums ，请你将 nums 中的元素分成 n / 2 个数对，使得：
 * 
 * nums 中每个元素 恰好 在 一个 数对中，且
 * 最大数对和 的值 最小 。
 * 请你在最优数对划分的方案下，返回最小的 最大数对和 。
 * 示例 1：
 * 
 * 输入：nums = [3,5,2,3]
 * 输出：7
 * 解释：数组中的元素可以分为数对 (3,3) 和 (5,2) 。
 * 最大数对和为 max(3+3, 5+2) = max(6, 7) = 7 。
 * 示例 2：
 * 
 * 输入：nums = [3,5,4,2,4,6]
 * 输出：8
 * 解释：数组中的元素可以分为数对 (3,5)，(4,4) 和 (6,2) 。
 * 最大数对和为 max(3+5, 4+4, 6+2) = max(8, 8, 8) = 8 。
 *  
 * 
 * 提示：
 * 
 * n == nums.length
 * 2 <= n <= 105
 * n 是 偶数 。
 * 1 <= nums[i] <= 105
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
 var minPairSum = function(nums) {
  let n = nums.length
  let sortNums = nums.sort((a, b) => {
    return a - b
  })
  let left = 0, right = n - 1, ans = Number.MIN_SAFE_INTEGER
  while (left < right) {
    ans = Math.max(ans, sortNums[left] + sortNums[right])
    left++
    right--
  }
  return ans
};

/**
 * 5757. 矩阵中最大的三个菱形和
 * https://leetcode-cn.com/contest/biweekly-contest-53/problems/get-biggest-three-rhombus-sums-in-a-grid/
 */
/**
 * @param {number[][]} grid
 * @return {number[]}
 */
 var getBiggestThree = function(grid) {

};

/**
 * 5756. 两个数组最小的异或值之和
 * 给你两个整数数组 nums1 和 nums2 ，它们长度都为 n 。
 * 
 * 两个数组的 异或值之和 为 (nums1[0] XOR nums2[0]) + (nums1[1] XOR nums2[1]) + ... + (nums1[n - 1] XOR nums2[n - 1]) （下标从 0 开始）。
 * 
 * 比方说，[1,2,3] 和 [3,2,1] 的 异或值之和 等于 (1 XOR 3) + (2 XOR 2) + (3 XOR 1) = 2 + 0 + 2 = 4 。
 * 请你将 nums2 中的元素重新排列，使得 异或值之和 最小 。
 * 
 * 请你返回重新排列之后的 异或值之和 。
 * 示例 1：
 * 
 * 输入：nums1 = [1,2], nums2 = [2,3]
 * 输出：2
 * 解释：将 nums2 重新排列得到 [3,2] 。
 * 异或值之和为 (1 XOR 3) + (2 XOR 2) = 2 + 0 = 2 。
 * 示例 2：
 * 
 * 输入：nums1 = [1,0,3], nums2 = [5,3,4]
 * 输出：8
 * 解释：将 nums2 重新排列得到 [5,4,3] 。
 * 异或值之和为 (1 XOR 5) + (0 XOR 4) + (3 XOR 3) = 4 + 4 + 0 = 8 。
 */
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
 var minimumXORSum = function(nums1, nums2) {

};