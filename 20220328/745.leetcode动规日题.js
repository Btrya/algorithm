/**
 * 2022/04/03 动规日题
 * 118. 杨辉三角
 * https://leetcode-cn.com/problems/pascals-triangle/
 */
/**
 * @param {number} numRows
 * @return {number[][]}
 */
 var generate = function(numRows) {
  let res = []
  for (let i = 0; i < numRows; ++i) {
    res.push(new Array(i + 1).fill(1))
    if (i >= 2) {
      const lastLevel = res[i - 1]
      for (let j = 1; j < i; ++j) {
        res[i][j] = lastLevel[j - 1] + lastLevel[j]
      }
    }
  }
  return res
};

/**
 * 119. 杨辉三角 II
 * https://leetcode-cn.com/problems/pascals-triangle-ii/
 */
/**
 * @param {number} rowIndex
 * @return {number[]}
 */
/**
 * @param {number} rowIndex
 * @return {number[]}
 */
 var getRow = function(rowIndex) {
  let res = []
  for (let i = 0; i < rowIndex + 1; ++i) {
    res.push(new Array(i + 1).fill(1))
    if (i >= 2) {
      const lastLevel = res[i - 1]
      for (let j = 1; j < i; ++j) {
        res[i][j] = lastLevel[j - 1] + lastLevel[j]
      }
    }
  }
  return res[rowIndex]
};