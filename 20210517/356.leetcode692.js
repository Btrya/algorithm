/**
 * 2021/05/20 每日一题 692.前K个高频单词
 * 给一非空的单词列表，返回前 k 个出现次数最多的单词。
 * 
 * 返回的答案应该按单词出现频率由高到低排序。如果不同的单词有相同出现频率，按字母顺序排序。
 * 
 * 示例 1：
 * 
 * 输入: ["i", "love", "leetcode", "i", "love", "coding"], k = 2
 * 输出: ["i", "love"]
 * 解析: "i" 和 "love" 为出现次数最多的两个单词，均为2次。
 *     注意，按字母顺序 "i" 在 "love" 之前。
 *  
 * 
 * 示例 2：
 * 
 * 输入: ["the", "day", "is", "sunny", "the", "the", "the", "sunny", "is", "is"], k = 4
 * 输出: ["the", "is", "sunny", "day"]
 * 解析: "the", "is", "sunny" 和 "day" 是出现次数最多的四个单词，
 *     出现次数依次为 4, 3, 2 和 1 次。
 */
/**
 * @param {string[]} words
 * @param {number} k
 * @return {string[]}
 */
 var topKFrequent = function(words, k) {
  const cnt = new Map()
  for (const word of words) {
    cnt.set(word, (cnt.get(word) || 0) + 1)
  }
  const rec = []
  for (const entry of cnt.keys()) {
    rec.push(entry)
  }
  rec.sort((a, b) => cnt.get(a) === cnt.get(b) ? a.localeCompare(b) : cnt.get(b) - cnt.get(a))
  return rec.slice(0, k)
};