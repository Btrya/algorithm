/**
 * 2021/01/23 每日一题 1319.连通网络的操作
 * https://leetcode-cn.com/problems/number-of-operations-to-make-network-connected/
 * 并查集
 */
var makeConnected = function(n, connections) {
  if (connections.length < n - 1) {
      return -1;
  }

  const uf = new UnionFind(n);
  for (const conn of connections) {
      uf.unite(conn[0], conn[1]);
  }

  return uf.setCount - 1;
};

// 并查集模板
class UnionFind {
  constructor (n) {
      this.parent = new Array(n).fill(0).map((element, index) => index);
      this.size = new Array(n).fill(1);
      // 当前连通分量数目
      this.setCount = n;
  }

  findset (x) {
      if (this.parent[x] === x) {
          return x;
      }
      this.parent[x] = this.findset(this.parent[x]);
      return this.parent[x];
  }

  unite (a, b) {
      let x = this.findset(a), y = this.findset(b);
      if (x === y) {
          return false;
      }
      if (this.size[x] < this.size[y]) {
          [x, y] = [y, x];
      }
      this.parent[y] = x;
      this.size[x] += this.size[y];
      this.setCount -= 1;
      return true;
  }

  connected (a, b) {
      const x = this.findset(a), y = this.findset(b);
      return x === y;
  }
}