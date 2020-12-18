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