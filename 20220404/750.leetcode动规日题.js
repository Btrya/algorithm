/**
 * 2022/04/05 动规日题 
 * 1314. 矩阵区域和
 * 给你一个 m x n 的矩阵 mat 和一个整数 k ，请你返回一个矩阵 answer ，其中每个 answer[i][j] 是所有满足下述条件的元素 mat[r][c] 的和： 
 * 
 * i - k <= r <= i + k,
 * j - k <= c <= j + k 且
 * (r, c) 在矩阵内。
 *  
 * 
 * 示例 1：
 * 
 * 输入：mat = [[1,2,3],[4,5,6],[7,8,9]], k = 1
 * 输出：[[12,21,16],[27,45,33],[24,39,28]]
 * 示例 2：
 * 
 * 输入：mat = [[1,2,3],[4,5,6],[7,8,9]], k = 2
 * 输出：[[45,45,45],[45,45,45],[45,45,45]]
 *  
 * 
 * 提示：
 * 
 * m == mat.length
 * n == mat[i].length
 * 1 <= m, n, k <= 100
 * 1 <= mat[i][j] <= 100
 */
/**
 * @param {number[][]} mat
 * @param {number} k
 * @return {number[][]}
 */
var matrixBlockSum = function (mat, k) {
  let m = mat[0].length
  let n = mat.length
  // 初始化dp
  let dp = Array.from(Array(n + 1), () => Array(m + 1).fill(0))
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1] - dp[i - 1][j - 1] + mat[i - 1][j - 1]
    }
  }
  // 组成ans
  let ans = Array.from(Array(n), () => Array(m).fill(0))
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      // 边界处理
      let sl = i - k >= 0 ? i - k : 0
      let sr = j - k >= 0 ? j - k : 0
      let bl = i + k + 1 < n ? i + k + 1 : n
      let br = j + k + 1 < m ? j + k + 1 : m
      ans[i][j] = dp[bl][br] - dp[sl][br] - dp[bl][sr] + dp[sl][sr]
    }
  }
  return ans
};

/**
 * 304. 二维区域和检索 - 矩阵不可变
 * https://leetcode-cn.com/problems/range-sum-query-2d-immutable/
 */
/**
 * @param {number[][]} matrix
 */
 var NumMatrix = function (matrix) {
  let m = matrix[0].length
  let n = matrix.length
  // 初始化dp
  this.dp = Array.from(Array(n + 1), () => Array(m + 1).fill(0))
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      this.dp[i][j] = this.dp[i - 1][j] + this.dp[i][j - 1] - this.dp[i - 1][j - 1] + matrix[i - 1][j - 1]
    }
  }
};

/** 
 * @param {number} row1 
 * @param {number} col1 
 * @param {number} row2 
 * @param {number} col2
 * @return {number}
 */
NumMatrix.prototype.sumRegion = function (row1, col1, row2, col2) {
  return this.dp[row2 + 1][col2 + 1] - this.dp[row1][col2 + 1] - this.dp[row2 + 1][col1] + this.dp[row1][col1]
};


/**
 * Your NumMatrix object will be instantiated and called as such:
 * var obj = new NumMatrix(matrix)
 * var param_1 = obj.sumRegion(row1,col1,row2,col2)
 */