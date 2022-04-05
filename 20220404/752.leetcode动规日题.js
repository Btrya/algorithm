/**
 * 2022/04/06 动规日题
 * 62. 不同路径
 * https://leetcode-cn.com/problems/unique-paths/
 */
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
 var uniquePaths = function(m, n) {
  // 得到一个对应棋盘大小的二维数组
  let dp = Array.from(Array(m), () => Array(n).fill(0))
  // 注意我们这里其实是把棋盘沿着左下到右上斜线翻转了的 也就是起点当成了终点 初始化行(顶行)和列(左列)
  for (let i = 0; i < m; ++i) {
    dp[i][0] = 1
  }
  for (let i = 0; i < n; ++i) {
    dp[0][i] = 1
  }
  // 补充dp
  for (let i = 1; i < m; ++i) {
    for (let j = 1; j < n; ++j) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
    }
  }
  return dp[m - 1][n - 1]
};

/**
 * 63. 不同路径 II
 * https://leetcode-cn.com/problems/unique-paths-ii/
 */
/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
 var uniquePathsWithObstacles = function(obstacleGrid) {
  // 得先知道是 几 x 几 的格子
  let m = obstacleGrid.length, n = obstacleGrid[0].length
  if (obstacleGrid[m - 1][n - 1] === 1) return 0
  // 得到一个对应棋盘大小的二维数组
  let dp = Array.from(Array(m), () => Array(n).fill(0))
  // 注意我们这里其实是把棋盘沿着左下到右上斜线翻转了的 也就是起点当成了终点 初始化行(顶行)和列(左列)
  for (let i = 0; i < m && obstacleGrid[i][0] === 0; ++i) {
    dp[i][0] = 1
  }
  for (let i = 0; i < n && obstacleGrid[0][i] === 0; ++i) {
    dp[0][i] = 1
  }
  for (let row = 1; row < m; ++row) {
    for (let col = 1; col < n; ++col) {
      // 遇到障碍直接返回 0
      dp[row][col] = obstacleGrid[row][col] === 1 ? 0 : dp[row - 1][col] + dp[row][col - 1]
    }
  }
  return dp[m - 1][n - 1]
};