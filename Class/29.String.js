/**
 * 字符串
 */

 /**
  * leetcode 14.最长公共前缀
  * 编写一个函数来查找字符串数组中的最长公共前缀。
  * 如果不存在公共前缀，返回空字符串 ""。
  * 示例 1:
  * 
  * 输入: ["flower","flow","flight"]
  * 输出: "fl"
  * 示例 2:
  * 
  * 输入: ["dog","racecar","car"]
  * 输出: ""
  * 解释: 输入不存在公共前缀。
  */
 /**
 * @param {string[]} strs
 * @return {string}
 */
// 我的想法： 取出字符串列表中最短字符串，每次取其最前面的一个字符，检查其他字符是否前缀为这个字符
// 确认存在则继续添加一个字符，否则直接减少当前的字符并返回  时间复杂度O(n^2)  空间复杂度O(1)
var longestCommonPrefix = function(strs) {
  let ans = ''
  if (strs.length < 1) return ans
  let minStr = strs[0]
  for(let s of strs) {
      minStr = s.length < minStr.length ? s : minStr
  }
  for(let i = 1; i <= minStr.length; i++) {
      ans = minStr.substr(0, i)
      for (let j = 0; j < strs.length; j++) {
          if (strs[j].indexOf(ans) != 0) return ans.substr(0, i - 1)
      }
  }
  return ans
};

// 横向扫描法: 拿出第一个来做比较，求出其字符串交集，后面的字符串匹配这个交集并更新，最后返回 时间复杂度O(mn) 空间复杂度O(1)
var longestCommonPrefix = function(strs) {
  if (strs.length < 1) return ""
  let prefix = strs[0], count = strs.length
  const lcp = function(str1, str2) {
    let index = 0, len = Math.min(str1.length, str2.length)
    while(index < len && str1[index] == str2[index]) {
      index++
    }
    return str1.substr(0, index)
  }
  for(let i = 1; i < count; i ++) {
    prefix = lcp(prefix, strs[i])
    if (!prefix) break
  }
  return prefix
};

// 纵向扫描法 时间复杂度：O(mn) 空间复杂度：O(1)
var longestCommonPrefix = function(strs) {
  if (strs == null || strs.length < 1) return ""
  let len = strs[0].length, count = strs.length
  for (let i = 0; i < len; i++) {
    let char = strs[0].charAt(i)
    for (let j = 1; j < count; j++) {
      if (i == strs[j].length || strs[j].charAt(i) != char) {
        return strs[0].substr(0, i)
      }
    }
  }
  return strs[0]
};

// 分治法 时间复杂度：O(mn) 空间复杂度：O(mlogn)
var longestCommonPrefix = function(strs) {
  if (strs == null || strs.length < 1) return ""
  const _commonPrefix = function(lcpLeft, lcpRight) {
    let minLen = Math.min(lcpLeft.length, lcpRight.length)
    for (let i = 0; i < minLen; i++) {
      if (lcpLeft.charAt(i) != lcpRight.charAt(i)) {
        return lcpLeft.substr(0, i)
      }
    }
    return lcpLeft.substr(0, minLen)
  }
  const _generate = function(start, end) {
    if (start == end) return strs[start]
    else {
      let mid = Math.floor((end - start) / 2) + start
      let lcpLeft = _generate(start, mid)
      let lcpRight = _generate(mid + 1, end)
      return _commonPrefix(lcpLeft, lcpRight)
    }
  }
  return _generate(0, strs.length - 1)
};

// 二分查找 时间复杂度O(mnlogm)  空间复杂度O(1)
var longestCommonPrefix = function(strs) {
  if (strs == null || strs.length < 1) return ""
  const _isCommnPrefix = function (length) {
    let str0 = strs[0].substr(0, length)
    let count = strs.length
    for (let i = 0; i < count; i++) {
      let str = strs[i]
      for (let j = 0; j < length; j++) {
        if (str0.charAt(j) != str.charAt(j)) {
          return false
        }
      }
    }
    return true
  }
  let minLen = Number.MAX_VALUE
  for (let str of strs) {
    minLen = Math.min(minLen, str.length)
  }
  let low = 0, high = minLen
  while (low < high) {
    let mid = Math.floor((high - low + 1) / 2) + low
    if (_isCommnPrefix(mid)) {
      low = mid
    } else {
      high = mid - 1
    }
  }
  return strs[0].substr(0, low)
};

/**
 * 最长回文子串
 * 给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000。
 * 示例 1：
 * 
 * 输入: "babad"
 * 输出: "bab"
 * 注意: "aba" 也是一个有效答案。
 * 示例 2：
 * 
 * 输入: "cbbd"
 * 输出: "bb"
 */
/**
 * @param {string} s
 * @return {string}
 */
// Manacher算法 时间复杂度O(n)
var longestPalindrome = function(s) {
  if (!s || s.length < 2) return s  // 1. 极端条件直接return
  let s_f = '#' + s.split('').join('#') + '#' // 处理过的字符串
  let c = 0, R = 0, len = s.length, t_len = s_f.length, maxLen = 0, maxIndex = 0, originIndex = 0, p = new Array(t_len)
  p[0] = 0
  for (let i = 1; i < t_len - 1; i++) {
    let j = 2 * c - i
    if (i < R) {
      p[i] = Math.min(p[j], R - i)
    } else {
      p[i] = 0
    }
    let left = i - p[i] - 1, right = i + p[i] + 1
    while (left >= 0 && right < t_len && s_f[left] == s_f[right]) {
      left--
      right++
      p[i]++
    }
    if (i + p[i] > R) {
      c = i
      R = i + p[i]
    }
    if (p[i] > maxLen) {
      maxLen = p[i]
      maxIndex = i
      originIndex = parseInt((i - p[i]) / 2)
    }
  }
  return s.substring(originIndex, originIndex + maxLen)
};

// 中心扩展法
var longestPalindrome = function(s) {
  if (!s || s.length < 2) return s
  let start = 0, end = 0, n = s.length
  const centerExpand = (left, right) => {
    while(left >= 0 && right < n && s[left] == s[right]) {
      left--
      right++
    }
    return right - left - 1
  }
  for (let i = 0; i < n; i++) {
    let len1 = centerExpand(i, i), len2 = centerExpand(i, i + 1)
    // 两种组合取最大回文串的长度
    let maxLen = Math.max(len1, len2)
    if (maxLen > end - start) {
      // 更新最大回文串的首尾字符索引
      start = i - ((maxLen - 1) >> 1)
      end = i + (maxLen >> 1)
    }
  }
  return s.substring(start, end + 1)
};