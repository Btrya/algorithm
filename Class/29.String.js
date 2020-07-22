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