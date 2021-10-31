/**
 * 2021/10/31 每日一题 500. 键盘行
 * 给你一个字符串数组 words ，只返回可以使用在 美式键盘 同一行的字母打印出来的单词。键盘如下图所示。
 * 
 * 美式键盘 中：
 * 
 * 第一行由字符 "qwertyuiop" 组成。
 * 第二行由字符 "asdfghjkl" 组成。
 * 第三行由字符 "zxcvbnm" 组成。
 * 
 * 示例 1：
 * 
 * 输入：words = ["Hello","Alaska","Dad","Peace"]
 * 输出：["Alaska","Dad"]
 * 示例 2：
 * 
 * 输入：words = ["omk"]
 * 输出：[]
 * 示例 3：
 * 
 * 输入：words = ["adsdf","sfd"]
 * 输出：["adsdf","sfd"]
 *  
 * 
 * 提示：
 * 
 * 1 <= words.length <= 20
 * 1 <= words[i].length <= 100
 * words[i] 由英文字母（小写和大写字母）组成
 */
/**
 * @param {string[]} words
 * @return {string[]}
 */
 var findWords = function(words) {
  let firstLine = "qwertyuiop", secondLine = "asdfghjkl", thirdLine = "zxcvbnm", wordsMap = new Map
  let ans = []
  const setMap = (map, str, num) => {
    for (let code of str) {
      map.set(code, num)
    }
  }
  setMap(wordsMap, firstLine, 0)
  setMap(wordsMap, secondLine, 1)
  setMap(wordsMap, thirdLine, 2)
  for (let i = 0; i < words.length; ++i) {
    const line = wordsMap.get(words[i][0].toLowerCase())
    if (words[i].length == 1) {
      ans.push(words[i])
    }
    for (let j = 1; j < words[i].length; ++j) {
      if (wordsMap.get(words[i][j].toLowerCase()) !== line) break
      if (j == words[i].length - 1) ans.push(words[i])
    }
  }
  return ans
};