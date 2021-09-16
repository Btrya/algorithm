/**
 * 2021/09/16 每日一题 212. 单词搜索 II
 * 给定一个 m x n 二维字符网格 board 和一个单词（字符串）列表 words，找出所有同时在二维网格和字典中出现的单词。
 * 
 * 单词必须按照字母顺序，通过 相邻的单元格 内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母在一个单词中不允许被重复使用。
 * 
 *  
 * 
 * 示例 1：
 * 
 * 
 * 输入：board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]
 * 输出：["eat","oath"]
 * 示例 2：
 * 
 * 
 * 输入：board = [["a","b"],["c","d"]], words = ["abcb"]
 * 输出：[]
 *  
 * 
 * 提示：
 * 
 * m == board.length
 * n == board[i].length
 * 1 <= m, n <= 12
 * board[i][j] 是一个小写英文字母
 * 1 <= words.length <= 3 * 104
 * 1 <= words[i].length <= 10
 * words[i] 由小写英文字母组成
 * words 中的所有字符串互不相同
 */
/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
var findWords = function (board, words) {
  const n = board.length,
    m = board[0].length;
  // 算出字典树最大深度
  const maxLen = words.reduce((max, w) => Math.max(max, w.length), 0);
  const trie = new Trie(board, n, m);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      // OPT 可以判断下开头字符是否在words里，在才调用insert
      trie.insert(i, j, maxLen);
    }
  }
  return words.filter(w => trie.find(w));
};

class Trie {
  constructor(board, n, m) {
    this.root = {};
    this.n = n;
    this.m = m;
    this.board = board;
    this.set = new Array(n * m).fill(false);
  }
  insert(i, j, dep, node = this.root) {
    // 剩余深度为0
    if (dep === 0) return;
    // 不在board范围内
    if (i < 0 || j < 0 || i >= this.n || j >= this.m) return;
    const idx = i * this.m + j,
      c = this.board[i][j];
    // 插入过
    if (this.set[idx]) return;
    this.set[idx] = true;
    node = node[c] = (node[c] || {});
    this.insert(i + 1, j, dep - 1, node);
    this.insert(i - 1, j, dep - 1, node);
    this.insert(i, j + 1, dep - 1, node);
    this.insert(i, j - 1, dep - 1, node);
    this.set[idx] = false;
  }
  find(w) {
    let node = this.root;
    for (const c of w) {
      if (!node[c]) return false;
      node = node[c];
    }
    return true;
  }
}