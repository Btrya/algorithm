/**
 * 2020/12/07 每日一题 861. 翻转矩阵后的得分
 * 有一个二维矩阵 A 其中每个元素的值为 0 或 1 。
 * 移动是指选择任一行或列，并转换该行或列中的每一个值：将所有 0 都更改为 1，将所有 1 都更改为 0。
 * 在做出任意次数的移动后，将该矩阵的每一行都按照二进制数来解释，矩阵的得分就是这些数字的总和。
 * 返回尽可能高的分数。
 * 示例：
 * 
 * 输入：[[0,0,1,1],[1,0,1,0],[1,1,0,0]]
 * 输出：39
 * 解释：
 * 转换为 [[1,1,1,1],[1,0,0,1],[1,1,1,1]]
 * 0b1111 + 0b1001 + 0b1111 = 15 + 9 + 15 = 39
 */
/**
 * @param {number[][]} A
 * @return {number}
 */
var matrixScore = function(A) {
  const rowLength = A.length;
  const colLength = A[0].length;
  // 第一列必须都为 1 直接计算出结果
  let result = rowLength * (1 << (colLength - 1));
  // 从第二列进行遍历统计当前列 1 的数量
  for (let colIndex = 1; colIndex < colLength; colIndex++) {
    let colCount = 0;
    for (let rowIndex = 0; rowIndex < rowLength; rowIndex++) {
      // 要保证第一列必须都为 1，就需要遍历行，通过异或运算实现:
      // 行首为 1 不翻转，为 0 就翻转
      colCount += A[rowIndex][colIndex] ^ A[rowIndex][0];
    }
    // 如果 1 的数量小于 0 的数量就翻转，尽可能的让当前列的 1 的数量最多
    const maxCount = Math.max(colCount, rowLength - colCount);
    // 计算当前列的结果
    result += maxCount * (1 << (colLength - 1 - colIndex));
  }
  return result; 
};