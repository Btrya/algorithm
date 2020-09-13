/**
 * 2020/09/13 每日一题 79. 单词搜索
 * 给定一个二维网格和一个单词，找出该单词是否存在于网格中。
 * 单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母不允许被重复使用。
 * 示例:
 * board =
 * [
 *   ['A','B','C','E'],
 *   ['S','F','C','S'],
 *   ['A','D','E','E']
 * ]
 * 
 * 给定 word = "ABCCED", 返回 true
 * 给定 word = "SEE", 返回 true
 * 给定 word = "ABCB", 返回 false
 */
/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {
  const h = board.length, w = board[0].length;
  const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];
  const visited = new Array(h);
  for (let i = 0; i < visited.length; ++i) {
      visited[i] = new Array(w).fill(false);
  }
  const check = (i, j, s, k) => {
      if (board[i][j] != s.charAt(k)) {
          return false;
      } else if (k == s.length - 1) {
          return true;
      }
      visited[i][j] = true;
      let result = false;
      for (const [dx, dy] of directions) {
          let newi = i + dx, newj = j + dy;
          if (newi >= 0 && newi < h && newj >= 0 && newj < w) {
              if (!visited[newi][newj]) {
                  const flag = check(newi, newj, s, k + 1);
                  if (flag) {
                      result = true;
                      break;
                  }
              }
          }
      }
      visited[i][j] = false;
      return result;
  }

  for (let i = 0; i < h; i++) {
      for (let j = 0; j < w; j++) {
          const flag = check(i, j, word, 0);
          if (flag) {
              return true;
          }
      }
  }
  return false;
};