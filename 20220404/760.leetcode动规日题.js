/**
 * 2022/04/10 动规日题 
 * 392. 判断子序列
 * 给定字符串 s 和 t ，判断 s 是否为 t 的子序列。
 * 
 * 字符串的一个子序列是原始字符串删除一些（也可以不删除）字符而不改变剩余字符相对位置形成的新字符串。（例如，"ace"是"abcde"的一个子序列，而"aec"不是）。
 * 
 * 进阶：
 * 
 * 如果有大量输入的 S，称作 S1, S2, ... , Sk 其中 k >= 10亿，你需要依次检查它们是否为 T 的子序列。在这种情况下，你会怎样改变代码？
 * 
 * 致谢：
 * 
 * 特别感谢 @pbrother 添加此问题并且创建所有测试用例。
 * 
 *  
 * 
 * 示例 1：
 * 
 * 输入：s = "abc", t = "ahbgdc"
 * 输出：true
 * 示例 2：
 * 
 * 输入：s = "axc", t = "ahbgdc"
 * 输出：false
 *  
 * 
 * 提示：
 * 
 * 0 <= s.length <= 100
 * 0 <= t.length <= 10^4
 * 两个字符串都只由小写字符组成。
 */
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isSubsequence = function (s, t) {
  if (s === '') return true
  else if (s.length === t.length) return s === t
  let sFlag = 0,
    tFlag = 0
  while (tFlag < t.length) {
    if (s[sFlag] === t[tFlag]) {
      sFlag++
    }
    tFlag++
  }
  return sFlag > s.length - 1
};

/**
 * 1143. 最长公共子序列
 * 给定两个字符串 text1 和 text2，返回这两个字符串的最长 公共子序列 的长度。如果不存在 公共子序列 ，返回 0 。
 * 
 * 一个字符串的 子序列 是指这样一个新的字符串：它是由原字符串在不改变字符的相对顺序的情况下删除某些字符（也可以不删除任何字符）后组成的新字符串。
 * 
 * 例如，"ace" 是 "abcde" 的子序列，但 "aec" 不是 "abcde" 的子序列。
 * 两个字符串的 公共子序列 是这两个字符串所共同拥有的子序列。
 * 
 *  
 * 
 * 示例 1：
 * 
 * 输入：text1 = "abcde", text2 = "ace" 
 * 输出：3  
 * 解释：最长公共子序列是 "ace" ，它的长度为 3 。
 * 示例 2：
 * 
 * 输入：text1 = "abc", text2 = "abc"
 * 输出：3
 * 解释：最长公共子序列是 "abc" ，它的长度为 3 。
 * 示例 3：
 * 
 * 输入：text1 = "abc", text2 = "def"
 * 输出：0
 * 解释：两个字符串没有公共子序列，返回 0 。
 *  
 * 
 * 提示：
 * 
 * 1 <= text1.length, text2.length <= 1000
 * text1 和 text2 仅由小写英文字符组成。
 */
/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function (text1, text2) {
  let n1 = text1.length,
    n2 = text2.length
  let dp = Array.from(Array(n1 + 1), () => Array(n2 + 1).fill(0))
  for (let i = 1; i <= n1; ++i) {
    for (let j = 1; j <= n2; ++j) {
      if (text1[i - 1] === text2[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1
      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
    }
  }
  return dp[n1][n2]
};

/**
 * 72. 编辑距离
 * 给你两个单词 word1 和 word2， 请返回将 word1 转换成 word2 所使用的最少操作数  。
 * 
 * 你可以对一个单词进行如下三种操作：
 * 
 * 插入一个字符
 * 删除一个字符
 * 替换一个字符
 *  
 * 
 * 示例 1：
 * 
 * 输入：word1 = "horse", word2 = "ros"
 * 输出：3
 * 解释：
 * horse -> rorse (将 'h' 替换为 'r')
 * rorse -> rose (删除 'r')
 * rose -> ros (删除 'e')
 * 示例 2：
 * 
 * 输入：word1 = "intention", word2 = "execution"
 * 输出：5
 * 解释：
 * intention -> inention (删除 't')
 * inention -> enention (将 'i' 替换为 'e')
 * enention -> exention (将 'n' 替换为 'x')
 * exention -> exection (将 'n' 替换为 'c')
 * exection -> execution (插入 'u')
 *  
 * 
 * 提示：
 * 
 * 0 <= word1.length, word2.length <= 500
 * word1 和 word2 由小写英文字母组成
 */
/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
 var minDistance = function(word1, word2) {
  const n1 = word1.length, n2 = word2.length
  // 其中一个是空字符串
  if (n1 * n2 === 0) return n1 + n2
  const dp = Array.from(Array(n1 + 1), () => Array(n2 + 1).fill(0))
  // 边界状态初始化
  for (let i = 0; i <= n1; ++i) {
    dp[i][0] = i
  }
  for (let i = 0; i <= n2; ++i) {
    dp[0][i] = i
  }
  // 计算
  for (let i = 1; i <= n1; ++i) {
    for (let j = 1; j <= n2; ++j) {
      const left = dp[i - 1][j] + 1
      const down = dp[i][j - 1] + 1
      let left_down = dp[i - 1][j - 1]
      if (word1.charAt(i - 1) !== word2.charAt(j - 1)) left_down += 1
      dp[i][j] = Math.min(left, down, left_down)
    }
  }
  return dp[n1][n2]
};