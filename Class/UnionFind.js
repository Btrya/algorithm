/**
 * 并查集
 */
// 并查集模板
class UnionFind {
  constructor(n) {
    this.parent = new Array(n).fill(0).map((element, index) => index);
    this.size = new Array(n).fill(1);
    // 当前连通分量数目
    this.setCount = n;
  }

  findset(x) {
    if (this.parent[x] === x) {
      return x;
    }
    this.parent[x] = this.findset(this.parent[x]);
    return this.parent[x];
  }

  unite(a, b) {
    let x = this.findset(a),
      y = this.findset(b);
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

  connected(a, b) {
    const x = this.findset(a),
      y = this.findset(b);
    return x === y;
  }
}
