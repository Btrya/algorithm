/**
 * 2020/10/17 每日一题 52.N皇后II  https://leetcode-cn.com/problems/n-queens-ii/
 * n 皇后问题研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。
 * 上图为 8 皇后问题的一种解法。
 * 给定一个整数 n，返回 n 皇后不同的解决方案的数量。
 * 示例:
 * 输入: 4
 * 输出: 2
 * 解释: 4 皇后问题存在如下两个不同的解法。
 * [
 *  [".Q..",  // 解法 1
 *   "...Q",
 *   "Q...",
 *   "..Q."],
 *
 *  ["..Q.",  // 解法 2
 *   "Q...",
 *   "...Q",
 *   ".Q.."]
 * ]
 */
/**
 * @param {number} n
 * @return {number}
 */
var totalNQueens = function (n) {
  let result = 0;
  const dfs = (subResult = [], row = 0) => {
    if (row === n) {
      result++;
      return;
    }
    for (let col = 0; col < n; col++) {
      if (
        !subResult.some(
          (j, k) => j === col || j - col === row - k || j - col === k - row
        )
      ) {
        subResult.push(col);
        dfs(subResult, row + 1);
        subResult.pop();
      }
    }
  };
  dfs();
  return result;
};
