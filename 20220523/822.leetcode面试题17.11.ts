/**
 * 2022/05/27 每日一题 面试题 17.11. 单词距离
 * 有个内含单词的超大文本文件，给定任意两个不同的单词，找出在这个文件中这两个单词的最短距离(相隔单词数)。如果寻找过程在这个文件中会重复多次，而每次寻找的单词不同，你能对此优化吗?
 * 
 * 示例：
 * 
 * 输入：words = ["I","am","a","student","from","a","university","in","a","city"], word1 = "a", word2 = "student"
 * 输出：1
 * 提示：
 * 
 * words.length <= 100000
 */
 function findClosest(words: string[], word1: string, word2: string): number {
  const word1Arr = [], word2Arr = []
  for (let i = 0; i < words.length; ++i) {
    if (words[i] === word1) word1Arr.push(i)
    else if (words[i] === word2) word2Arr.push(i)
  }
  let res = Number.MAX_SAFE_INTEGER
  for (let i = 0; i < word1Arr.length; ++i) {
    for (let j = 0; j < word2Arr.length; ++j) {
      const diff = Math.abs(word1Arr[i] - word2Arr[j])
      res = Math.min(res, diff)
    }
  }
  return res
};

function findClosest(words: string[], word1: string, word2: string): number {
  let left = 0, right = 0
  let res = Number.MAX_SAFE_INTEGER
  for (let i = 0; i < words.length; ++i) {
    if (words[i] === word1) left = i
    else if (words[i] === word2) right = i
    if (left > 0 && right > 0) {
      res = Math.min(res, Math.abs(left - right))
    }
  }
  return res
};