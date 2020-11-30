/**
 * 2020/11/30 每日一题 767. 重构字符串
 * 给定一个字符串S，检查是否能重新排布其中的字母，使得两相邻的字符不同。
 * 若可行，输出任意可行的结果。若不可行，返回空字符串。
 * 
 * 示例 1:
 * 
 * 输入: S = "aab"
 * 输出: "aba"
 * 示例 2:
 * 
 * 输入: S = "aaab"
 * 输出: ""
 */
/**
 * @param {string} S
 * @return {string}
 */
// 获取字符code函数
const getIdx = (c) => c.charCodeAt() - 'a'.charCodeAt()
// code转字符函数
const getAlpha = (c) => String.fromCharCode(c)
var reorganizeString = function(S) {
  if (S.length < 2) return S
  const counts = new Array(26).fill(0) // 设置计数数组
  let maxCount = 0
  const length = S.length
  for (let i = 0; i < length; i++) { // 填充计数数组，得到字符最大数量
    const c = S.charAt(i)
    counts[getIdx(c)]++
    maxCount = Math.max(maxCount, counts[getIdx(c)])
  }
  if (maxCount > Math.floor((length + 1) / 2)) return ""  // 最大数量的字符超过总字符串长度的一半，无法实现，直接返回空字符串
  const reorganizeArray = new Array(length)
  let evenIndex  = 0, oddIndex = 1
  const halfLength = Math.floor(length / 2)
  for (let i = 0; i < 26; i++) {
    const c = getAlpha('a'.charCodeAt() + i)
    // 先把字符数量少于一半的字符填充到答案的偶数位
    while (counts[i] > 0 && counts[i] <= halfLength && oddIndex < length) {
      reorganizeArray[oddIndex] = c
      counts[i]--
      oddIndex += 2
    }
    // 填充剩下的奇数位
    while (counts[i] > 0) {
      reorganizeArray[evenIndex] = c
      counts[i]--
      evenIndex += 2
    }
  }
  return reorganizeArray.join("")
};