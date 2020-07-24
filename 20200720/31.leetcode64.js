/**
 * 2020/7/23 leetcode 每日一题 64.最小路径和
 * 给定一个包含非负整数的 m x n 网格，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。
 * 说明：每次只能向下或者向右移动一步。
 * 输入:
 * [
 *   [1,3,1],
 *   [1,5,1],
 *   [4,2,1]
 * ]
 * 输出: 7
 */

 /**
 * @param {number[][]} grid
 * @return {number}
 */
// 动态规划  时间复杂度O(mn) 空间复杂度 O(mn)
var minPathSum = function(grid) {
  if (!grid) return 0
  let rows = grid.length, columns = grid[0].length
  let dp = Array.from(Array(rows), () => Array(columns).fill(0))
  dp[0][0] = grid[0][0]
  for (let i = 1; i < rows; i++) {
    dp[i][0] = dp[i - 1][0] + grid[i][0]
  }
  for (let i = 1; i < columns; i++) {
    dp[0][i] = dp[0][i - 1] + grid[0][i]
  }
  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < columns; j++) {
      dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j]
    }
  }
  return dp[rows - 1][columns - 1]
};

// 动态规划， 优化为一维数组保存
var minPathSum = function(grid) {
  if (!grid) return 0
  let rows = grid.length, columns = grid[0].length
  let dp = new Array(columns).fill(0)
  dp[0] = grid[0][0]
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      if (i == 0 && j == 0) continue
      else if (i == 0) dp[j] = dp[j - 1] + grid[i][j]
      else if (j == 0) dp[j] += grid[i][j]
      else dp[j] = Math.min(dp[j], dp[j - 1]) + grid[i][j]
    }
  }
  return dp[columns -1]
};