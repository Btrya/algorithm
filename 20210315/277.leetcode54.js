/**
 * 2021/03/15 每日一题 54.螺旋矩阵
 * 给你一个 m 行 n 列的矩阵 matrix ，请按照 顺时针螺旋顺序 ，返回矩阵中的所有元素。 
 * 示例 1：
 * 
 * 
 * 输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
 * 输出：[1,2,3,6,9,8,7,4,5]
 * 示例 2：
 * 
 * 
 * 输入：matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
 * 输出：[1,2,3,4,8,12,11,10,9,5,6,7]
 *  
 * 
 * 提示：
 * 
 * m == matrix.length
 * n == matrix[i].length
 * 1 <= m, n <= 10
 * -100 <= matrix[i][j] <= 100
 */
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
 var spiralOrder = function(matrix) {
  if(!matrix.length || !matrix[0].length) return []
  const rows = matrix.length, columns = matrix[0].length
  const order = []
  let left = 0, right = columns - 1, top = 0, bottom = rows - 1
  while(left <= right && top <= bottom) {
    for (let column = left; column <= right; column++) {
      order.push(matrix[top][column])
    }
    for (let row = top + 1; row <= bottom; row++) {
      order.push(matrix[row][right])
    }
    if (left < right && top < bottom) {
      for (let column = right - 1; column > left; column--) {
        order.push(matrix[bottom][column])
      }
      for (let row = bottom; row > top; row--) {
        order.push(matrix[row][left])
      }
    }
    [left, right, top, bottom] = [left + 1, right - 1, top + 1, bottom - 1]
  }
  return order
};