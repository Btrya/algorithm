/**
 * 2020/12/26 每日一题 85. 最大矩形
 * https://leetcode-cn.com/problems/maximal-rectangle/
 * 给定一个仅包含 0 和 1 、大小为 rows x cols 的二维二进制矩阵，找出只包含 1 的最大矩形，并返回其面积。
 * 示例 1：
 * 输入：matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]
 * 输出：6
 * 解释：最大矩形如上图所示。
 * 示例 2：
 * 
 * 输入：matrix = []
 * 输出：0
 * 示例 3：
 * 
 * 输入：matrix = [["0"]]
 * 输出：0
 * 示例 4：
 * 
 * 输入：matrix = [["1"]]
 * 输出：1
 * 示例 5：
 * 
 * 输入：matrix = [["0","0"]]
 * 输出：0
 *  */
/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalRectangle = function(matrix) {
  let heights = [], res = 0
  for (let i = 0; i < matrix.length; i++) {
    if (heights.length == 0) {
      for (let j = 0; j < matrix[i].length + 2;j++) heights[j] = 0
    }
    let stack = []
    for (let k = 0; k <heights.length; k++) {
      heights[k] = k > 0 && k <= matrix[i].length && '1' == matrix[i][k - 1] ? heights[k] + 1 : 0
      while (stack.length > 0 && heights[k] < heights[stack[stack.length - 1]]) {
        res = Math.max(res, heights[stack.pop()] * (k - stack[stack.length - 1] - 1))
      }
      stack.push(k)
    }
  }
  return res
};