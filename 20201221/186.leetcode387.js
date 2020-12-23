/**
 * 2020/12/23 每日一题 387.字符串中得第一个唯一字符
 * 给定一个字符串，找到它的第一个不重复的字符，并返回它的索引。如果不存在，则返回 -1。
 * 示例：
 * 
 * s = "leetcode"
 * 返回 0
 * 
 * s = "loveleetcode"
 * 返回 2
 */
/**
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function(s) {
  const counts = new Array(26).fill(0) // 长度为26的数组，存放字符的出现字数
  for (const c of s) {  // 遍历s的每个字符，统计出现次数
    counts[c.charCodeAt(0) - 97]++ // 97是a字符的unicode
  }
  for (let i = 0; i < s.length; i++) {
    if (counts[s[i].charCodeAt(0) - 97] == 1) { // 找到第一个频次为1的字符的索引
      return i
    }
  }
  return -1
};