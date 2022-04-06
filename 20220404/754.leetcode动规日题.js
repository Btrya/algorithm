/**
 * 2022/04/07 动规日题
 * 64. 最小路径和
 * https://leetcode-cn.com/problems/minimum-path-sum/
 */
/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function (grid) {
  const m = grid.length,
    n = grid[0].length
  const dp = Array.from(Array(m + 1), () => Array(n + 1).fill(0))
  for (let i = 1; i <= m; ++i) {
    for (let j = 1; j <= n; ++j) {
      let min
      if (i === 1) min = dp[i][j - 1]
      else if (j === 1) min = dp[i - 1][j]
      else min = Math.min(dp[i][j - 1], dp[i - 1][j])
      dp[i][j] = grid[i - 1][j - 1] + min
    }
  }
  return dp[m][n]
};

/**
 * 221. 最大正方形 
 * https://leetcode-cn.com/problems/maximal-square/
 */
/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalSquare = function (matrix) {
  const m = matrix.length
  const n = matrix[0].length
  const dp = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0))
  let maxLen = 0
  for (let i = 1; i <= m; ++i) {
    for (let j = 1; j <= n; ++j) {
      if (matrix[i - 1][j - 1] === "0") continue
      dp[i][j] =
        Math.min(
          dp[i - 1][j],
          dp[i][j - 1],
          dp[i - 1][j - 1]
        ) + 1
      maxLen = Math.max(maxLen, dp[i][j])
    }
  }
  return maxLen * maxLen
};