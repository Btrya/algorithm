/**
 * 2021/01/28 每日一题 959. 由斜杠划分区域 https://leetcode-cn.com/problems/regions-cut-by-slashes/
 * 在由 1 x 1 方格组成的 N x N 网格 grid 中，每个 1 x 1 方块由 /、\ 或空格构成。这些字符会将方块划分为一些共边的区域。
 * （请注意，反斜杠字符是转义的，因此 \ 用 "\\" 表示。）。
 * 
 * 返回区域的数目。
 * 示例 1：
 * 
 * 输入：
 * [
 *   " /",
 *   "/ "
 * ]
 * 输出：2
 * 解释：2x2 网格如下：
 * 
 * 示例 2：
 * 
 * 输入：
 * [
 *   " /",
 *   "  "
 * ]
 * 输出：1
 * 解释：2x2 网格如下：
 * 
 * 示例 3：
 * 
 * 输入：
 * [
 *   "\\/",
 *   "/\\"
 * ]
 * 输出：4
 * 解释：（回想一下，因为 \ 字符是转义的，所以 "\\/" 表示 \/，而 "/\\" 表示 /\。）
 * 2x2 网格如下：
 * 
 * 示例 4：
 * 
 * 输入：
 * [
 *   "/\\",
 *   "\\/"
 * ]
 * 输出：5
 * 解释：（回想一下，因为 \ 字符是转义的，所以 "/\\" 表示 /\，而 "\\/" 表示 \/。）
 * 2x2 网格如下：
 * 
 * 示例 5：
 * 
 * 输入：
 * [
 *   "//",
 *   "/ "
 * ]
 * 输出：3
 * 解释：2x2 网格如下：
 */
/**
 * @param {string[]} grid
 * @return {number}
 */
find = (f, x) => {
  if (f[x] == x) return x
  const fa = find(f, f[x])
  f[x] = fa
  return fa
}
merge = (f, x, y) => {
  const fx = find(f, x)
  const fy = find(f, y)
  f[fx] = fy
}
var regionsBySlashes = function(grid) {
  const n = grid.length
  const f = new Array(n * n * 4).fill(0).map((item, index) => index)
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const idx = i * n + j
      if (i < n - 1) {
        const bottom = idx + n
        merge(f, idx * 4 + 2, bottom * 4)
      }
      if (j < n - 1) {
        const right = idx + 1
        merge(f, idx * 4 + 1, right * 4 + 3)
      }
      if (grid[i][j] == '/') {
        merge(f, idx * 4, idx * 4 + 3)
        merge(f, idx * 4 + 1, idx * 4 + 2)
      } else if (grid[i].charAt(j) == '\\') {
        merge(f, idx * 4, idx * 4 + 1)
        merge(f, idx * 4 + 2, idx * 4 + 3)
      } else {
        merge(f, idx * 4, idx * 4 + 1)
        merge(f, idx * 4 + 1, idx * 4 + 2)
        merge(f, idx * 4 + 2, idx * 4 + 3)
      }
    }
  }
  const fathers = new Set()
  for (let i = 0; i < n * n * 4; i++) {
    const fa = find(f, i)
    fathers.add(fa)
  }
  return [...fathers].length
};


// 并查集
/**
 * @param {string[]} grid
 * @return {number}
 */
class UnionFind {
  constructor(n) {
    this.parent = [];
    this.size = [];
    this.count = n;
    this.init(n);
  }
  init(n) {
    let parent = this.parent;
    let size = this.size;
    for (let i = 0; i < n; i++) {
      parent[i] = i;
      size[i] = 1;
    }
  }
  find(x) {
    let parent = this.parent;
    while (x != parent[x]) {
      parent[x] = parent[ parent[x] ];
      x = parent[x];
    }
    return x;
  }
  union(p, q) {
    let rootP = this.find(p);
    let rootQ = this.find(q);
    if (rootP == rootQ) {
      return ;
    }
    let parent = this.parent;
    let size = this.size;
    if (size[rootP] > size[rootQ]) {
      parent[rootQ] = rootP;
      size[rootP] += size[rootQ];
    } else {
      parent[rootP] = rootQ;
      size[rootQ] += size[rootP];
    }
    this.count--;
  }
}

var regionsBySlashes = function(grid) {
  let total = grid.length * grid[0].length;
  let union = new UnionFind(total * 4);
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      let current = grid[i][j];
      let top = i - 1 >= 0 ? grid[i-1][j] : null;
      let left = j - 1 >= 0 ? grid[i][j-1] : null;
      let index = i * grid[0].length + j; // 索引转换为 0 1 2 3 4 5...
      switch (current) {
        case ' ':
          union.union(index * 4 + 0, index * 4 + 1);
          union.union(index * 4 + 1, index * 4 + 2);
          union.union(index * 4 + 2, index * 4 + 3);
          union.union(index * 4 + 3, index * 4 + 0);
          break;
        case '/':
          union.union(index * 4 + 1, index * 4 + 2);
          union.union(index * 4 + 0, index * 4 + 3);
          break;
        case '\\':
          union.union(index * 4 + 0, index * 4 + 1);
          union.union(index * 4 + 2, index * 4 + 3);
          break;
      }
      if (top) { // 连接当前方块和上边的方块
        let topIndex = index - grid[0].length;
        union.union(index * 4 + 0, topIndex * 4 + 2);
      }
      if (left) { // 连接当前方块和左边的方块
        let leftIndex = index - 1;
        union.union(index * 4 + 3, leftIndex * 4 + 1);
      }
    }
  }
  return union.count;
};
