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

  find(x) {
    if (this.parent[x] === x) {
      return x;
    }
    this.parent[x] = this.find(this.parent[x]);
    return this.parent[x];
  }

  union(a, b) {
    let x = this.find(a),
      y = this.find(b);
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

  connect(a, b) {
    const x = this.find(a),
      y = this.find(b);
    return x === y;
  }

  getCount() {
    return this.setCount
  }
}