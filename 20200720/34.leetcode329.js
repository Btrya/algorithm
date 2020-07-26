/**
 * 2020/7/26 每日一题 329.矩阵中的最长递增路径
 * 给定一个整数矩阵，找出最长递增路径的长度。
 * 对于每个单元格，你可以往上，下，左，右四个方向移动。 你不能在对角线方向上移动或移动到边界外（即不允许环绕）。
 * 示例 1:
 * 输入: nums = 
 * [
 *   [9,9,4],
 *   [6,6,8],
 *   [2,1,1]
 * ] 
 * 输出: 4 
 * 解释: 最长递增路径为 [1, 2, 6, 9]。
 * 示例 2:
 * 输入: nums = 
 * [
 *   [3,4,5],
 *   [3,2,6],
 *   [2,2,1]
 * ] 
 * 输出: 4 
 * 解释: 最长递增路径是 [3, 4, 5, 6]。注意不允许在对角线方向上移动matrix
 */
/**
 * @param {number[][]} matrix
 * @return {number}
 */
// 记忆化深度优先搜索
var longestIncreasingPath = function(matrix) {
  if (!matrix || matrix.length == 0 || matrix[0].length == 0) return 0
  let dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]]
  let rows = matrix.length, columns = matrix[0].length, ans = 0
  let memo = Array.from(Array(rows), () => Array(columns).fill(0))
  const dfs = function(row, column) {
    if (memo[row][column] != 0) {
      return memo[row][column]
    }
    ++memo[row][column]
    for (let dir of dirs) {
      let newRow = row + dir[0], newColumn = column + dir[1]
      if (newRow >= 0 && newRow < rows && newColumn >= 0 && newColumn < columns && matrix[newRow][newColumn] > matrix[row][column]) {
        memo[row][column] = Math.max(memo[row][column], dfs(newRow, newColumn) + 1)
      }
    }
    return memo[row][column]
  }
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      ans = Math.max(ans, dfs(i, j))
    }
  }
  return ans
};