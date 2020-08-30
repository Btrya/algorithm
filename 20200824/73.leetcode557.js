/**
 * leetcode 每日一题 2020/08/30 557. 反转字符串中的单词 III
 * 给定一个字符串，你需要反转字符串中每个单词的字符顺序，同时仍保留空格和单词的初始顺序。
 * 示例：
 * 
 * 输入："Let's take LeetCode contest"
 * 输出："s'teL ekat edoCteeL tsetnoc"
 */
/**
 * @param {string} s
 * @return {string}
 */
// js一行
var reverseWords = function(s) {
  if (!s) return ""
  return s.split(" ").map(item => item.split("").reverse().join("")).join(" ")
};

// 使用额外空间
var reverseWords = function(s) {
  const ret = []
  const length = s.length
  let i = 0
  while (i < length) {
    let start = i
    while (i < length && s.charAt(i) != ' ') {
      i++
    }
    for (let p = start; p < i; p++) {
      ret.push(s.charAt(start + i -1 - p))
    }
    while (i < length && s.charAt(i) == ' ') {
      i++
      ret.push(' ')
    }
  }
  return ret.join('')
};
