/**
 * 2021/12/28 每日一题 472. 连接词
 * 给你一个 不含重复 单词的字符串数组 words ，请你找出并返回 words 中的所有 连接词 。
 * 
 * 连接词 定义为：一个完全由给定数组中的至少两个较短单词组成的字符串。
 * 
 * 示例 1：
 * 
 * 输入：words = ["cat","cats","catsdogcats","dog","dogcatsdog","hippopotamuses","rat","ratcatdogcat"]
 * 输出：["catsdogcats","dogcatsdog","ratcatdogcat"]
 * 解释："catsdogcats" 由 "cats", "dog" 和 "cats" 组成; 
 *      "dogcatsdog" 由 "dog", "cats" 和 "dog" 组成; 
 *      "ratcatdogcat" 由 "rat", "cat", "dog" 和 "cat" 组成。
 * 示例 2：
 * 
 * 输入：words = ["cat","dog","catdog"]
 * 输出：["catdog"]
 *  
 * 
 * 提示：
 * 
 * 1 <= words.length <= 104
 * 0 <= words[i].length <= 1000
 * words[i] 仅由小写字母组成
 * 0 <= sum(words[i].length) <= 105
 */
/**
 * @param {string[]} words
 * @return {string[]}
 */
var findAllConcatenatedWordsInADict = function (words) {
  let set = new Set();
  let res = [];
  let getWord = function (word, start) {
    for (let str = '', len = word.length - 1; start <= len; ++start) {
      str += word[start]
      if (set.has(str) && (start === len || getWord(word, start + 1))) {
        return true;
      }
    }
    return false;
  }
  words.sort((a, b) => a.length - b.length);
  set.add(words[0]);
  for (let i = 1, len = words.length; i < len; ++i) {
    if (getWord(words[i], 0)) {
      res.push(words[i])
    } else {
      set.add(words[i])
    }
  }
  return res;
};