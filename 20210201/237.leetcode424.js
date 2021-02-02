/**
 * 2021/02/02 每日一题 424.替换后的最长重复字符串
 * 给你一个仅由大写英文字母组成的字符串，你可以将任意位置上的字符替换成另外的字符，总共可最多替换 k 次。在执行上述操作后，
 * 找到包含重复字母的最长子串的长度。
 * 注意：字符串长度 和 k 不会超过 104。
 * 示例 1：
 * 
 * 输入：s = "ABAB", k = 2
 * 输出：4
 * 解释：用两个'A'替换为两个'B',反之亦然。
 * 示例 2：
 * 
 * 输入：s = "AABABBA", k = 1
 * 输出：4
 * 解释：
 * 将中间的一个'A'替换为'B',字符串变为 "AABBBBA"。
 * 子串 "BBBB" 有最长重复字母, 答案为 4。
 */
/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var characterReplacement = function(s, k) {
  let ret = Number.MIN_SAFE_INTEGER, left = 0, right = 0
  let nums = new Array(26).fill(0)
  while (right < s.length) {
    nums[s[right].charCodeAt() - 'A'.charCodeAt()]++
    ret = Math.max(ret, nums[s[right].charCodeAt() - 'A'.charCodeAt()])
    if (right - left + 1 - ret > k) {
      nums[s[left].charCodeAt() - 'A'.charCodeAt()]--
      left++
    }
    right++
  }
  return right - left
};