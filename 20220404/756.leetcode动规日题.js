/**
 * 2022/04/08 动规日题 
 * 5. 最长回文子串
 * 给你一个字符串 s，找到 s 中最长的回文子串。
 * 
 * 示例 1：
 * 
 * 输入：s = "babad"
 * 输出："bab"
 * 解释："aba" 同样是符合题意的答案。
 * 示例 2：
 * 
 * 输入：s = "cbbd"
 * 输出："bb"
 *  
 * 
 * 提示：
 * 
 * 1 <= s.length <= 1000
 * s 仅由数字和英文字母组成
 */
/**
 * @param {string} s
 * @return {string}
 */
// 双指针版本
var longestPalindrome = function (s) {
  let max = 0 // 当前最大回文串的长度
  let maxStr = '' // 当前最大的回文串
  for (let i = 0; i < s.length; i++) {
    let str = s[i] // 当前遍历的这个字符为中心的回文串
    let l = i - 1 // 左侧遍历开始索引
    while (s[i + 1] === s[i]) { // 找到当前字符后连接的所有一样的字符,更新 i 的指针和 str,获取连续的字符
      str += s[i]
      i++
    }
    let r = i + 1 // 右侧遍历开始索引
    while (s[l] === s[r] && s[l] !== undefined) { // 从连续字符两端开始像两侧扩展,直到越界或者不一致,一致的直接拼到 str 中
      str = s[l] + str + s[l]
      l--
      r++
    }
    if (str.length > max) { // 判断与之前最大的对比
      max = str.length
      maxStr = str
    }
  }
  return maxStr
};

/**
 * 516. 最长回文子序列
 * 给你一个字符串 s ，找出其中最长的回文子序列，并返回该序列的长度。
 * 
 * 子序列定义为：不改变剩余字符顺序的情况下，删除某些字符或者不删除任何字符形成的一个序列。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 输入：s = "bbbab"
 * 输出：4
 * 解释：一个可能的最长回文子序列为 "bbbb" 。
 * 示例 2：
 * 
 * 输入：s = "cbbd"
 * 输出：2
 * 解释：一个可能的最长回文子序列为 "bb" 。
 * 
 * 
 * 提示：
 * 
 *  <= s.length <= 1000
 *  仅由小写英文字母组成
 */
/**
 * @param {string} s
 * @return {number}
 */
 var longestPalindromeSubseq = function(s) {
  const n = s.length
  const dp = new Array(n).fill(0).map(() => new Array(n).fill(0))
  for (let i = n - 1; i >= 0; --i) {
    dp[i][i] = 1
    const c1 = s[i]
    for (let j = i + 1; j < n; j++) {
      const c2 = s[j]
      if (c1 === c2) {
        dp[i][j] = dp[i + 1][j - 1] + 2
      } else {
        dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1])
      }
    }
  }
  return dp[0][n - 1]
};