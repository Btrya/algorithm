/**
 * 2021/01/27 每日一题 1579. 保证图可完全遍历
 * Alice 和 Bob 共有一个无向图，其中包含 n 个节点和 3  种类型的边：
 *
 * 类型 1：只能由 Alice 遍历。
 * 类型 2：只能由 Bob 遍历。
 * 类型 3：Alice 和 Bob 都可以遍历。
 * 给你一个数组 edges ，其中 edges[i] = [typei, ui, vi] 表示节点 ui 和 vi 之间存在类型为 typei 的双向边。
 * 请你在保证图仍能够被 Alice和 Bob 完全遍历的前提下，找出可以删除的最大边数。如果从任何节点开始，Alice 和 Bob 都可以到达所有其他节点，则认为图是可以完全遍历的。
 *
 * 返回可以删除的最大边数，如果 Alice 和 Bob 无法完全遍历图，则返回 -1 。
 * 示例 1：
 * 输入：n = 4, edges = [[3,1,2],[3,2,3],[1,1,3],[1,2,4],[1,1,2],[2,3,4]]
 * 输出：2
 * 解释：如果删除 [1,1,2] 和 [1,1,3] 这两条边，Alice 和 Bob 仍然可以完全遍历这个图。再删除任何其他的边都无法保证图可以完全遍历。所以可以删除的最大边数是 2 。
 * 示例 2：
 * 输入：n = 4, edges = [[3,1,2],[3,2,3],[1,1,4],[2,1,4]]
 * 输出：0
 * 解释：注意，删除任何一条边都会使 Alice 和 Bob 无法完全遍历这个图。
 * 示例 3：
 * 输入：n = 4, edges = [[3,2,3],[1,1,2],[2,3,4]]
 * 输出：-1
 * 解释：在当前图中，Alice 无法从其他节点到达节点 4 。类似地，Bob 也不能达到节点 1 。因此，图无法完全遍历。
 */
/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
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

var maxNumEdgesToRemove = function (n, edges) {
  const ufa = new UnionFind(n),
    ufb = new UnionFind(n);
  let ans = 0;

  // 节点编号改为从 0 开始
  for (const edge of edges) {
    edge[1] -= 1;
    edge[2] -= 1;
  }
  // 公共边
  for (const [t, u, v] of edges) {
    if (t === 3) {
      if (!ufa.unite(u, v)) {
        ans += 1;
      } else {
        ufb.unite(u, v);
      }
    }
  }
  // 独占边
  for (const [t, u, v] of edges) {
    if (t === 1) {
      // Alice 独占边
      if (!ufa.unite(u, v)) {
        ans += 1;
      }
    } else if (t === 2) {
      // Bob 独占边
      if (!ufb.unite(u, v)) {
        ans += 1;
      }
    }
  }
  if (ufa.setCount !== 1 || ufb.setCount !== 1) {
    return -1;
  }
  return ans;
};
