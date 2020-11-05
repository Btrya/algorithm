/**
 * 2020/11/5 每日一题 127. 单词接龙
 * 给定两个单词（beginWord 和 endWord）和一个字典，找到从 beginWord 到 endWord 的最短转换序列的长度。转换需遵循如下规则：
 * 每次转换只能改变一个字母。
 * 转换过程中的中间单词必须是字典中的单词。
 * 说明:
 * 如果不存在这样的转换序列，返回 0。
 * 所有单词具有相同的长度。
 * 所有单词只由小写字母组成。
 * 字典中不存在重复的单词。
 * 你可以假设 beginWord 和 endWord 是非空的，且二者不相同。
 * 示例 1:
 *
 * 输入:
 * beginWord = "hit",
 * endWord = "cog",
 * wordList = ["hot","dot","dog","lot","log","cog"]
 * 输出: 5
 * 解释: 一个最短转换序列是 "hit" -> "hot" -> "dot" -> "dog" -> "cog",
 *      返回它的长度 5。
 * 示例 2:
 *
 * 输入:
 * beginWord = "hit"
 * endWord = "cog"
 * wordList = ["hot","dot","dog","lot","log"]
 * 输出: 0
 * 解释: endWord "cog" 不在字典中，所以无法进行转换。
 */
/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */
var ladderLength = function (beginWord, endWord, wordList) {
  if (!wordList.includes(endWord)) return 0;
  let wordSet = new Set(wordList);
  let beginSet = new Set([beginWord]);
  let endSet = new Set([endWord]);
  wordSet.delete(beginWord);
  wordSet.delete(endWord);
  let level = 1;
  // BFS
  while (beginSet.size > 0) {
    let next_beginSet = new Set();
    level++;
    for (let key of beginSet) {
      for (let i = 0; i < key.length; i++) {
        for (let j = 0; j < 26; j++) {
          let s = String.fromCharCode(97 + j);
          if (s === key.charAt(i)) continue;
          if (s !== key[i]) {
            let new_word = key.slice(0, i) + s + key.slice(i + 1);
            if (endSet.has(new_word)) return level;
            if (wordSet.has(new_word)) {
              wordSet.delete(new_word);
              next_beginSet.add(new_word);
            }
          }
        }
      }
    }
    beginSet = next_beginSet;
    if (beginSet.size > endSet.size) [beginSet, endSet] = [endSet, beginSet];
  }
  return 0;
};
