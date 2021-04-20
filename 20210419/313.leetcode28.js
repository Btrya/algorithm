/**
 * 2021/04/20 每日一题 28. 实现 strStr()
 * 实现 strStr() 函数。
 * 
 * 给你两个字符串 haystack 和 needle ，
 * 请你在 haystack 字符串中找出 needle 字符串出现的第一个位置（下标从 0 开始）。如果不存在，则返回  -1 。
 * 说明：
 * 
 * 当 needle 是空字符串时，我们应当返回什么值呢？这是一个在面试中很好的问题。
 * 
 * 对于本题而言，当 needle 是空字符串时我们应当返回 0 。这与 C 语言的 strstr() 以及 Java 的 indexOf() 定义相符。
 * 示例 1：
 * 
 * 输入：haystack = "hello", needle = "ll"
 * 输出：2
 * 示例 2：
 * 
 * 输入：haystack = "aaaaa", needle = "bba"
 * 输出：-1
 * 示例 3：
 * 
 * 输入：haystack = "", needle = ""
 * 输出：0
 */
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function(haystack, needle) {
  if (needle == "") return 0
  return haystack.indexOf(needle)
};

var strStr = function(haystack, needle) {
  const n = haystack.length, m = needle.length
  if (m == 0) return 0
  const pi = new Array(m).fill(0)
  for (let i = 1, j = 0; i < m; i++) {
    while (j > 0 && needle[i] !== needle[j]) {
      j = pi[j - 1]
    }
    if (needle[i] == needle[j]) j++
    pi[i] = j
  }
  for (let i = 0, j = 0; i < n; i++) {
    while (j > 0 && haystack[i] !== needle[j]) j = pi[j - 1]
    if (haystack[i] == needle[j]) j++
    if (j === m) return i - m + 1
  }
  return -1
};