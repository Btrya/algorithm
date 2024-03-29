/**
 * 2021/09/14 每日一题 524. 通过删除字母匹配到字典里最长单词
 * 给你一个字符串 s 和一个字符串数组 dictionary 作为字典，找出并返回字典中最长的字符串，该字符串可以通过删除 s 中的某些字符得到。
 * 
 * 如果答案不止一个，返回长度最长且字典序最小的字符串。如果答案不存在，则返回空字符串。
 * 示例 1：
 * 
 * 输入：s = "abpcplea", dictionary = ["ale","apple","monkey","plea"]
 * 输出："apple"
 * 示例 2：
 * 
 * 输入：s = "abpcplea", dictionary = ["a","b","c"]
 * 输出："a"
 *  
 * 
 * 提示：
 * 
 * 1 <= s.length <= 1000
 * 1 <= dictionary.length <= 1000
 * 1 <= dictionary[i].length <= 1000
 * s 和 dictionary[i] 仅由小写英文字母组成
 */
/**
 * @param {string} s
 * @param {string[]} dictionary
 * @return {string}
 */
// 双指针
var findLongestWord = function (s, dictionary) {
  let res = ''
  for (const t of dictionary) {
    let i = 0, j = 0
    while (i < t.length && j < s.length) {
      if (t[i] === s[j]) ++i
      ++j
    }
    if (i === t.length) {
      if (t.length > res.length || (t.length === res.length && t < res)) {
        res = t
      }
    }
  }
  return res
}
// 动态规划
var findLongestWord = function (s, dictionary) {
  const m = s.length;
  const f = new Array(m + 1).fill(0).map(() => new Array(26).fill(m));

  for (let i = m - 1; i >= 0; --i) {
    for (let j = 0; j < 26; ++j) {
      if (s[i] === String.fromCharCode('a'.charCodeAt() + j)) {
        f[i][j] = i;
      } else {
        f[i][j] = f[i + 1][j];
      }
    }
  }
  let res = "";
  for (const t of dictionary) {
    let match = true;
    let j = 0;
    for (let i = 0; i < t.length; ++i) {
      if (f[j][t[i].charCodeAt() - 'a'.charCodeAt()] === m) {
        match = false;
        break;
      }
      j = f[j][t[i].charCodeAt() - 'a'.charCodeAt()] + 1;
    }
    if (match) {
      if (t.length > res.length || (t.length === res.length && t.localeCompare(res) < 0)) {
        res = t;
      }
    }
  }
  return res;
};