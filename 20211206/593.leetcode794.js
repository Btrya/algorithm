/**
 * 2021/12/09 每日一题 794. 有效的井字游戏
 * 给你一个字符串数组 board 表示井字游戏的棋盘。当且仅当在井字游戏过程中，棋盘有可能达到 board 所显示的状态时，才返回 true 。
 * 
 * 井字游戏的棋盘是一个 3 x 3 数组，由字符 ' '，'X' 和 'O' 组成。字符 ' ' 代表一个空位。
 * 
 * 以下是井字游戏的规则：
 * 
 * 玩家轮流将字符放入空位（' '）中。
 * 玩家 1 总是放字符 'X' ，而玩家 2 总是放字符 'O' 。
 * 'X' 和 'O' 只允许放置在空位中，不允许对已放有字符的位置进行填充。
 * 当有 3 个相同（且非空）的字符填充任何行、列或对角线时，游戏结束。
 * 当所有位置非空时，也算为游戏结束。
 * 如果游戏结束，玩家不允许再放置字符。
 */
/**
 * @param {string[]} board
 * @return {boolean}
 */
var validTicTacToe = function (board) {
  let xCount = 0,
    oCount = 0;
  for (const row of board) {
    for (const c of row) {
      xCount = (c === 'X') ? (xCount + 1) : xCount;
      oCount = (c === 'O') ? (oCount + 1) : oCount;
    }
  }
  if (oCount != xCount && oCount !== xCount - 1) {
    return false;
  }
  if (win(board, 'X') && oCount !== xCount - 1) {
    return false;
  }
  if (win(board, 'O') && oCount !== xCount) {
    return false;
  }
  return true;
};

const win = (board, p) => {
  for (let i = 0; i < 3; ++i) {
    if (p === board[0][i] && p === board[1][i] && p === board[2][i]) {
      return true;
    }
    if (p === board[i][0] && p === board[i][1] && p === board[i][2]) {
      return true;
    }
  }
  if (p === board[0][0] && p === board[1][1] && p === board[2][2]) {
    return true;
  }
  if (p === board[0][2] && p === board[1][1] && p === board[2][0]) {
    return true;
  }
  return false;
}