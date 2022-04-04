/**
 * 2022/04/04 动规日题
 * 931. 下降路径最小和
 * https://leetcode-cn.com/problems/minimum-falling-path-sum/
 */
/**
 * @param {number[][]} matrix
 * @return {number}
 */
 var minFallingPathSum = function(matrix) {
  const n = matrix.length
  // 添加哨兵元素
  for (let i = 0; i < n; ++i) {
    matrix[i].push(Number.MAX_SAFE_INTEGER)
    matrix[i].unshift(Number.MAX_SAFE_INTEGER)
  }
  for (let i = 1; i < n; ++i) {
    const prevDp = matrix[i - 1]
    for (let j = 1; j < n + 1; ++j) {
      matrix[i][j] += Math.min(prevDp[j], prevDp[j + 1], prevDp[j - 1])
    }
  }
  return Math.min(...matrix[n - 1])
};

/**
 * 120. 三角形最小路径和
 * 给定一个三角形 triangle ，找出自顶向下的最小路径和。
 * 
 * 每一步只能移动到下一行中相邻的结点上。相邻的结点 在这里指的是 下标 与 上一层结点下标 相同或者等于 上一层结点下标 + 1 的两个结点。也就是说，如果正位于当前行的下标 i ，那么下一步可以移动到下一行的下标 i 或 i + 1 。
 * 
 * 示例 1：
 * 
 * 输入：triangle = [[2],[3,4],[6,5,7],[4,1,8,3]]
 * 输出：11
 * 解释：如下面简图所示：
 *    2
 *   3 4
 *  6 5 7
 * 4 1 8 3
 * 自顶向下的最小路径和为 11（即，2 + 3 + 5 + 1 = 11）。
 * 示例 2：
 * 
 * 输入：triangle = [[-10]]
 * 输出：-10
 *  
 * 
 * 提示：
 * 
 * 1 <= triangle.length <= 200
 * triangle[0].length == 1
 * triangle[i].length == triangle[i - 1].length + 1
 * -104 <= triangle[i][j] <= 104
 *  
 * 
 * 进阶：
 * 
 * 你可以只使用 O(n) 的额外空间（n 为三角形的总行数）来解决这个问题吗？
 */
/**
 * @param {number[][]} triangle
 * @return {number}
 */
 var minimumTotal = function(triangle) {
  const n = triangle.length
  // 添加哨兵元素
  for (let i = 0; i < n; ++i) {
    triangle[i].push(Number.MAX_SAFE_INTEGER)
  }
  for (let i = n - 2; i >= 0; --i) {
    const nextDp = triangle[i + 1]
    for (let j = 0; j < triangle[i].length - 1; ++j) {
      triangle[i][j] += Math.min(nextDp[j], nextDp[j + 1])
    }
  }
  return triangle[0][0]
};