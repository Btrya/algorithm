/**
 * 2020/11/25 每日一题 1370. 上升下降字符串
 * 给你一个字符串 s ，请你根据下面的算法重新构造字符串：
 * 从 s 中选出 最小 的字符，将它 接在 结果字符串的后面。
 * 从 s 剩余字符中选出 最小 的字符，且该字符比上一个添加的字符大，将它 接在 结果字符串后面。
 * 重复步骤 2 ，直到你没法从 s 中选择字符。
 * 从 s 中选出 最大 的字符，将它 接在 结果字符串的后面。
 * 从 s 剩余字符中选出 最大 的字符，且该字符比上一个添加的字符小，将它 接在 结果字符串后面。
 * 重复步骤 5 ，直到你没法从 s 中选择字符。
 * 重复步骤 1 到 6 ，直到 s 中所有字符都已经被选过。
 * 在任何一步中，如果最小或者最大字符不止一个 ，你可以选择其中任意一个，并将其添加到结果字符串。
 * 请你返回将 s 中字符重新排序后的 结果字符串 。
 * 示例 1：
 * 
 * 输入：s = "aaaabbbbcccc"
 * 输出："abccbaabccba"
 * 解释：第一轮的步骤 1，2，3 后，结果字符串为 result = "abc"
 * 第一轮的步骤 4，5，6 后，结果字符串为 result = "abccba"
 * 第一轮结束，现在 s = "aabbcc" ，我们再次回到步骤 1
 * 第二轮的步骤 1，2，3 后，结果字符串为 result = "abccbaabc"
 * 第二轮的步骤 4，5，6 后，结果字符串为 result = "abccbaabccba"
 * 示例 2：
 * 
 * 输入：s = "rat"
 * 输出："art"
 * 解释：单词 "rat" 在上述算法重排序以后变成 "art"
 * 示例 3：
 * 
 * 输入：s = "leetcode"
 * 输出："cdelotee"
 * 示例 4：
 * 
 * 输入：s = "ggggggg"
 * 输出："ggggggg"
 * 示例 5：
 * 
 * 输入：s = "spo"
 * 输出："ops"
 */
/**
 * @param {string} s
 * @return {string}
 */
var sortString = function(s) {
  const num = new Array(26).fill(0)
  for (let ch of s) { // 字符计数
    num[ch.charCodeAt() - 'a'.charCodeAt()] ++
  }
  let ret = ''
  while (ret.length < s.length) {
    for (let i = 0; i < 26; i++) {
      if (num[i]) {
        ret += String.fromCharCode(i + 'a'.charCodeAt())
        num[i]--
      }
    }
    for (let i = 25; i >= 0; i--) {
      if (num[i]) {
        ret += String.fromCharCode(i + 'a'.charCodeAt())
        num[i]--
      }
    }
  }
  return ret
};

/**
 * 加餐 3. 无重复字符的最长子串
 * 给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。
 * 示例 1:
 * 
 * 输入: s = "abcabcbb"
 * 输出: 3 
 * 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
 * 示例 2:
 * 
 * 输入: s = "bbbbb"
 * 输出: 1
 * 解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
 * 示例 3:
 * 
 * 输入: s = "pwwkew"
 * 输出: 3
 * 解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
 *      请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
 * 示例 4:
 * 
 * 输入: s = ""
 * 输出: 0
 */
/**
 * @param {string} s
 * @return {number}
 */
// 滑动窗口
var lengthOfLongestSubstring = function(s) {
  const occ = new Set()
  const n = s.length
  let rk = -1, ans = 0
  for (let i = 0; i < n; i++) {
    if (i != 0) occ.delete(s.charAt(i - 1))
    while (rk + 1 < n && !occ.has(s.charAt(rk + 1))) {
      occ.add(s.charAt(rk + 1))
      rk++
    }
    ans = Math.max(ans, rk - i + 1)
  }
  return ans
};