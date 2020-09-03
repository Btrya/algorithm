/**
 * 2020/09/03 每日一题 51.N皇后
 * https://leetcode-cn.com/problems/n-queens/
 * n 皇后问题研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。
 * 给定一个整数 n，返回所有不同的 n 皇后问题的解决方案。
 * 每一种解法包含一个明确的 n 皇后问题的棋子放置方案，该方案中 'Q' 和 '.' 分别代表了皇后和空位。
 *
 * 示例：
 *
 * 输入：4
 * 输出：[
 *  [".Q..",  // 解法 1
 *   "...Q",
 *   "Q...",
 *   "..Q."],
 *
 *  ["..Q.",  // 解法 2
 *   "Q...",
 *   "...Q",
 *   ".Q.."]
 * ]
 * 解释: 4 皇后问题存在两个不同的解法。
 */
/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function (n) {
  const board = new Array(n);
  for (let i = 0; i < n; i++) {
    // 创建一个 充满'.'的棋盘
    board[i] = new Array(n).fill(".");
  }
  const res = [];
  const isValid = (row, col) => {
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < n; j++) {
        if (
          board[i][j] == "Q" &&
          (j == col || i + j === row + col || i - j === row - col)
        )
          return false;
      }
    }
    return true;
  };
  const helper = (row) => {
    if (row == n) {
      // 递归出口
      const stringsBoard = board.slice(); // 拷贝
      for (let i = 0; i < n; i++) {
        stringsBoard[i] = stringsBoard[i].join(""); // 每一行拼成字符串
      }
      res.push(stringsBoard); // 推入res数组
      return;
    }
    for (let col = 0; col < n; col++) {
      // 枚举选择
      if (isValid(row, col)) {
        // 提前去掉无效选择
        board[row][col] = "Q"; // 做出选择，放置皇后
        helper(row + 1); // 继续选择，往下递归
        board[row][col] = "."; // 撤销当前选择
      }
    }
  };
  helper(0);
  return res;
};
