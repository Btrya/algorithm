/**
 * 2020/11/1 每日一题 140. 单词拆分 II
 * 给定一个非空字符串 s 和一个包含非空单词列表的字典 wordDict，在字符串中增加空格来构建一个句子，使得句子中所有的单词都在词典中。返回所有这些可能的句子。
 
 说明：
 
 分隔时可以重复使用字典中的单词。
 你可以假设字典中没有重复的单词。
 示例 1：
 
 输入:
 s = "catsanddog"
 wordDict = ["cat", "cats", "and", "sand", "dog"]
 输出:
 [
   "cats and dog",
   "cat sand dog"
 ]
 示例 2：
 
 输入:
 s = "pineapplepenapple"
 wordDict = ["apple", "pen", "applepen", "pine", "pineapple"]
 输出:
 [
   "pine apple pen apple",
   "pineapple pen apple",
   "pine applepen apple"
 ]
 解释: 注意你可以重复使用字典中的单词。
 示例 3：
 
 输入:
 s = "catsandog"
 wordDict = ["cats", "dog", "sand", "and", "cat"]
 输出:
 []
 */
/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {string[]}
 */
var wordBreak = function(s, wordDict) {
  const backtrack = (wordSet, index, map) => {
    if (map.has(index)) return map.get(index)
    const wordBreaks = []
    if (index === s.length) wordBreaks.push([])
    for (let i = index + 1; i <= s.length; i++) {
      const word = s.substring(index, i)
      if (wordSet.has(word)) {
        const nextWordBreaks = backtrack(wordSet, i, map)
        for (const nextWordBreak of nextWordBreaks) {
          const wordBreak = [word, ...nextWordBreak]
          wordBreaks.push(wordBreak)
        }
      }
    }
    map.set(index, wordBreaks)
    return wordBreaks
  }
  const map = new Map()
  const wordBreaks = backtrack(new Set(wordDict), 0, map)
  const breakList = []
  for (const wordBreak of wordBreaks) {
    breakList.push(wordBreak.join(' '))
  }
  return breakList
};