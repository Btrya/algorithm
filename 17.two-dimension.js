/**
 * 二维数组相关
 */

/**
 * 1.来自leetcode 面试题01.07. 旋转矩阵
 * 给你一幅由 N × N 矩阵表示的图像，其中每个像素的大小为 4 字节。请你设计一种算法，将图像旋转 90 度。
 *
 * 不占用额外内存空间能否做到？
 *
 * 示例 1:
 *
 * 给定 matrix =
 *
 *  [1,2,3],
 *  [4,5,6],
 *  [7,8,9]
 * ,
 *
 * 原地旋转输入矩阵，使其变为:
 *
 *  [7,4,1],
 *  [8,5,2],
 *  [9,6,3]
 *
 * 示例 2:
 *
 * 给定 matrix =
 *
 *  [ 5, 1, 9,11],
 *  [ 2, 4, 8,10],
 *  [13, 3, 6, 7],
 *  [15,14,12,16]
 * ,
 *
 * 原地旋转输入矩阵，使其变为:
 *
 *  [15,13, 2, 5],
 *  [14, 3, 4, 1],
 *  [12, 6, 8, 9],
 *  [16, 7,10,11]
 *
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
//  先水平翻转，再对角线反转
var rotate = function (matrix) {
  let n = matrix.length;
  // 水平翻转
  for (let i = 0; i < n / 2; i++) {
    for (let j = 0; j < n; j++) {
      [matrix[i][j], matrix[n - i - 1][j]] = [
        matrix[n - i - 1][j],
        matrix[i][j],
      ];
    }
  }
  // 主对角线翻转
  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    }
  }
};

/**
 * leetcode 零矩阵
 * 编写一种算法，若M × N矩阵中某个元素为0，则将其所在的行与列清零。
 *
 *示例 1：
 *输入：
 *[
 *  [1,1,1],
 *  [1,0,1],
 *  [1,1,1]
 *]
 *输出：
 *[
 *  [1,0,1],
 *  [0,0,0],
 *  [1,0,1]
 *]
 *示例 2：
 *输入：
 *[
 *  [0,1,2,0],
 *  [3,4,5,2],
 *  [1,3,1,5]
 *]
 *输出：
 *[
 *  [0,0,0,0],
 *  [0,4,5,0],
 *  [0,3,1,0]
 *]
 */

/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
// 暴力法 时间复杂度O(n^2) 空间复杂度O(1)
var setZeroes = function (matrix) {
  let rows = {},
  cols = {};
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j] == 0) {
        rows[i] = 1;
        cols[j] = 1;
      }
    }
  }
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (rows[i] == 1 || cols[j] == 1) {
        matrix[i][j] = 0;
      }
    }
  }
};


// 暴力法改进：使用set
var setZeroes = function (matrix) {
  let rows = new Set(),
      cols = new Set();
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] == 0) {
        rows.add(i)
        cols.add(j)
      }
    }
  }
  // 行清零
  for (let i of rows) {
    for (let j = 0; j < matrix[i].length; j++) {
      matrix[i][j] = 0
    }
  }

  // 列清零
  for (let j of cols) {
    for (let i = 0; i < matrix.length; i++) {
      matrix[i][j] = 0
    }
  }
};


/**
 * leetcode 498. 对角线遍历
 * 给定一个含有 M x N 个元素的矩阵（M 行，N 列），请以对角线遍历的顺序返回这个矩阵中的所有元素，对角线遍历如下图所示。
 * 示例:
 * 
 * 输入:
 * [
 *  [ 1, 2, 3 ],
 *  [ 4, 5, 6 ],
 *  [ 7, 8, 9 ]
 * ]
 * 
 * 输出:  [1,2,4,7,5,3,6,8,9]
 */
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */

// var findDiagonalOrder = function(matrix) {
//   if(!matrix) return []
//   let xlength = matrix[0].length
//   let ylength = matrix.length
//   let res = []
//   for (let i = 1; i < xlength + ylength; i++) {
//     let xMax = i % 2 == 0 ? ylength : xlength
//     let yMax = i % 2 == 0 ? xlength : ylength
//     for (let x = 0 ; x < i; x++) {
//        let y = i - x -1
//        if (x >= xMax || y>= yMax) continue
//        res.push(i % 2 == 0 ? matrix[x][y] : matrix[y][x])
//     }
//   }
//   return res
// };

var findDiagonalOrder = function(matrix) {
  if(!matrix.length) return []
  let xlength = matrix.length -1
  let ylength = matrix[0].length - 1
  let row = 0,
      col = 0
  let is_up = true
  let fun = res => {
    res.push(matrix[row][col])
    if (row == xlength && col == ylength) {
      return res
    }
    if (is_up) {
      if (col < ylength && row > 0) {
        row--
        col++
      } else {
        is_up = !is_up
        col < ylength ? col++ : row++
      }
    } else {
      if (row < xlength && col > 0) {
        row++
        col--
      } else {
        is_up = !is_up
        row < xlength ? row++ : col++
      }
    }
    return fun(res)
  }
  return fun([])
};


console.log(findDiagonalOrder([[1,2,3],[4,5,6],[7,8,9]]))