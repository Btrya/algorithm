/**
 * 2022/04/22 编程入门计划
 * 1572. 矩阵对角线元素的和
 * https://leetcode-cn.com/problems/matrix-diagonal-sum/
 */
 function diagonalSum(mat: number[][]): number {
  const n = mat.length
  let left = 0, right = n - 1
  let diff = 0, res = 0
  for (let i = 0; i < n; ++i) {
    if (left === right) diff = mat[i][left]
    res += mat[i][left++] + mat[i][right--]
  }
  return res - diff
};

/**
 * 566. 重塑矩阵
 * https://leetcode-cn.com/problems/reshape-the-matrix/
 */
 function matrixReshape(mat: number[][], r: number, c: number): number[][] {
  const n = mat.length, m = mat[0].length
  if (n * m !== r * c) return mat
  const arr = mat.flat()
  const res = Array.from({ length: r }, () => Array(c).fill(0))
  let count = 0
  for (let i = 0; i < r; ++i) {
    for (let j = 0; j < c; ++j) {
      res[i][j] = arr[count++]
    }
  }
  return res
};