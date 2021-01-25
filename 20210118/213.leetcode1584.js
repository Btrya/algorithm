/**
 * 2021/01/19 每日一题 1584. 连接所有点的最小费用
 * 给你一个points 数组，表示 2D 平面上的一些点，其中 points[i] = [xi, yi] 。
 * 连接点 [xi, yi] 和点 [xj, yj] 的费用为它们之间的 曼哈顿距离 ：|xi - xj| + |yi - yj| ，其中 |val| 表示 val 的绝对值。
 * 请你返回将所有点连接的最小总费用。只有任意两点之间 有且仅有 一条简单路径时，才认为所有点都已连接。
 * 示例 1：
 * 输入：points = [[0,0],[2,2],[3,10],[5,2],[7,0]]
 * 输出：20
 * 解释：
 * 
 * 我们可以按照上图所示连接所有点得到最小总费用，总费用为 20 。
 * 注意到任意两个点之间只有唯一一条路径互相到达。
 * 示例 2：
 * 
 * 输入：points = [[3,12],[-2,5],[-4,1]]
 * 输出：18
 * 示例 3：
 * 
 * 输入：points = [[0,0],[1,1],[1,0],[-1,1]]
 * 输出：4
 * 示例 4：
 * 
 * 输入：points = [[-1000000,-1000000],[1000000,1000000]]
 * 输出：4000000
 * 示例 5：
 * 
 * 输入：points = [[0,0]]
 * 输出：0
 */
/**
 * @param {number[][]} points
 * @return {number}
 */
// 并查集
var minCostConnectPoints = function(points) {
  const dist = (x, y) => {
    return Math.abs(points[x][0] - points[y][0]) + Math.abs(points[x][1] - points[y][1]);
  }
  const n = points.length;
  const dsu = new DisjointSetUnion(n);
  const edges = [];
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      edges.push([dist(i, j), i, j]);
    }
  }
  edges.sort((a, b) => a[0] - b[0]);
  let ret = 0, num = 1;
  for (const [length, x, y] of edges) {
    if (dsu.unionSet(x, y)) {
      ret += length;
      num += 1;
      if (num === n) {
          break;
      }
    }
  }
  return ret;
};
class DisjointSetUnion {
  constructor (n) {
    this.n = n;
    this.rank = new Array(n).fill(1);
    this.f = new Array(n).fill(0).map((element, index) => index);
  }

  find (x) {
    if (this.f[x] === x) {
        return x;
    }
    this.f[x] = this.find(this.f[x]);
    return this.f[x];
  }

  unionSet (x, y) {
    let fx = this.find(x), fy = this.find(y);
    if (fx === fy) {
        return false;
    }

    if (this.rank[fx] < this.rank[fy]) {
        [fx, fy] = [fy, fx];
    }
    this.rank[fx] += this.rank[fy];
    this.f[fy] = fx;
    return true;
  }
}


// 
var minCostConnectPoints = function(points) {
  let len = points.length
  let sum = 0
  if (len < 2) {
      return 0
  }
  let vis = new Array(len).fill(false)
  let min_dist = new Array(len).fill(Infinity)
  min_dist[0] = 0
  for (let i = 0; i < len; i++) {
      let index = -1
      let min = Infinity
      for (let j = 0; j < len; j++) {
          if (!vis[j] && min_dist[j] <= min) {
              min = min_dist[j]
              index = j
          }
      }
      sum += min
      vis[index] = true
      for (let j = 0; j < len; j++) {
          if (!vis[j]) {
              let val = Math.abs(points[j][0] - points[index][0]) + Math.abs(points[j][1] - points[index][1])
              min_dist[j] = min_dist[j] > val ? val : min_dist[j]
          }
      }
  }
  return sum
};