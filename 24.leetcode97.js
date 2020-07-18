/**
 * leetcode 97.交错字符串 (Hard)
 * 给定三个字符串 s1, s2, s3, 验证 s3 是否是由 s1 和 s2 交错组成的。
 * 示例 1:
 * 输入: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"
 * 输出: true
 * 示例 2:
 * 输入: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbbaccc"
 * 输出: false
 */
/**
 * @param {string} s1
 * @param {string} s2
 * @param {string} s3
 * @return {boolean}
 */
// 动态规划： 定义 f(i, j)f(i,j) 表示 s1的前i个元素和s 的前j个元素是否能交错组成s3的前 i+j 个元素
// 加入s1的第i个元素和s3的第i + j个元素相等，那么s1的前i个元素和s2的前j个元素是否能交错组成s3的前i+j个元素取决于s1的钱i-1个元素和s2的前j个元素能否交错组成s3的前i+j-1个元素
// 公式： f(i, j) = [f(i - 1, j) and s1(i - 1) == s3(p)]  or  [f(i, j - 1) and s2(j - 1) == s3(p)]    (p = i + j -1)
var isInterleave = function(s1, s2, s3) {
  let n = s1.length, m = s2.length, t = s3.length
  if (n + m !== t) return false 
  let dp = Array.from(Array(n + 1), () => Array(m + 1).fill(false))
  dp[0][0] = true
  for(let i = 0; i <= n; i++) {
      for (let j = 0; j <= m; j++) {
          let p = i + j - 1
          if (i > 0) {
              dp[i][j] = dp[i][j] || (dp[i - 1][j] && s1.charAt(i - 1) === s3.charAt(p))
          }
          if (j > 0) {
              dp[i][j] = dp[i][j] || (dp[i][j - 1] && s2.charAt(j - 1) === s3.charAt(p))
          }
      }
  }
  return dp[n][m]
};
// 空间优化为一维数组存储
var isInterleave = function(s1, s2, s3) {
  let n = s1.length, m = s2.length, t = s3.length
  if (n + m !== t) return false 
  let dp = new Array(m + 1).fill(false)
  dp[0] = true // 边界条件
  for(let i = 0; i <= n; i++) {
      for(let j = 0; j <= m; j++) {
          let p = i + j - 1
          if (i > 0) {
              dp[j] = dp[j] && s1.charAt(i - 1) == s3.charAt(p)
          }
          if (j > 0) {
              dp[j] = dp[j] || (dp[j - 1] && s2.charAt(j- 1) == s3.charAt(p))
          }
      }
  }
  return dp[m]
};