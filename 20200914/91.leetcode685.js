/**
 * 2020/09/17 每日一题 685. 冗余连接 II
 * 在本问题中，有根树指满足以下条件的有向图。该树只有一个根节点，所有其他节点都是该根节点的后继。每一个节点只有一个父节点，除了根节点没有父节点。
 * 输入一个有向图，该图由一个有着N个节点 (节点值不重复1, 2, ..., N) 的树及一条附加的边构成。附加的边的两个顶点包含在1到N中间，这条附加的边不属于树中已存在的边。
 * 结果图是一个以边组成的二维数组。 每一个边 的元素是一对 [u, v]，用以表示有向图中连接顶点 u 和顶点 v 的边，其中 u 是 v 的一个父节点。
 * 返回一条能删除的边，使得剩下的图是有N个节点的有根树。若有多个答案，返回最后出现在给定二维数组的答案。
 * 示例 1:
 *
 * 输入: [[1,2], [1,3], [2,3]]
 * 输出: [2,3]
 * 解释: 给定的有向图如下:
 *   1
 *  / \
 * v   v
 * 2-->3
 * 示例 2:
 *
 * 输入: [[1,2], [2,3], [3,4], [4,1], [1,5]]
 * 输出: [4,1]
 * 解释: 给定的有向图如下:
 * 5 <- 1 -> 2
 *      ^    |
 *      |    v
 *      4 <- 3
 */
/**
 * @param {number[][]} edges
 * @return {number[]}
 */
/**
 * 并查集
 * 有环，有2入度
 * => 找一条边同时满足这两个条件，删掉2入度的且在环中的边
 * => 用并查集，因为希望找的是入度2的边，所以这两条边最后union，union失败的边就是要找的
 * 有环，无2入度
 * => 找一条在环中的边，看成无向图找形成环的边
 * => 并查集的经典应用
 * 无环，有2入度 (1、2两种情况处理完后还没有结果输出，说明是情况3)
 * => 找去掉后仍然连通的边
 * => 因为多余的边是在原本就是树的基础上找两个现有的点连的边，所以删哪一条都行，按照题意可删最后一条
 */
var findRedundantDirectedConnection = function (edges) {
  const N = edges.length + 10;
  const indegrees = []; // 入度
  for (let [start, end] of edges) {
    indegrees[end] = (indegrees[end] || 0) + 1; // 统计边的入度情况
  }
  let endNode = null,
    cand1 = null,
    cand2 = null;
  for (let i = 0; i < indegrees.length; i++) {
    // 找到2入度的边
    if (indegrees[i] === 2) {
      endNode = i;
      break;
    }
  }
  if (endNode) {
    for (let edge of edges) {
      const [start, end] = edge;
      if (end !== endNode) continue;
      if (cand1 === null) cand1 = [start, end];
      else cand2 = [start, end];
      edge[1] = null; // 为了让这两条边最后union
    }
  }

  class UF {
    constructor(size) {
      this.parent = new Array(size).fill(-1);
      this.size = new Array(size).fill(1);
    }
    findRoot(i) {
      while (this.parent[i] !== -1) i = this.parent[i];
      return i;
    }
    union(i, j) {
      const iRoot = this.findRoot(i);
      const jRoot = this.findRoot(j);
      if (iRoot === jRoot) return [i, j];
      if (this.size[iRoot] > this.size[jRoot]) {
        // 比较权重
        this.parent[jRoot] = iRoot;
        this.size[iRoot] += this.size[jRoot]; // 更新权重
      } else {
        this.parent[iRoot] = jRoot;
        this.size[jRoot] += this.size[iRoot];
      }
    }
  }
  const uf = new UF(N);
  for (let [start, end] of edges) {
    if (end == null) continue;
    const t = uf.union(start, end);
    if (t) return t; // 情况2  在这里输出
  }
  if (endNode) {
    // 情况1  在这里输出
    const t1 = uf.union(cand1[0], cand1[1]);
    if (t1) return t1;
    const t2 = uf.union(cand2[0], cand2[1]);
    if (t2) return t2;
  }
  return cand2; // 情况3  在这里输出
};

var findRedundantDirectedConnection = function (edges) {
  const parents = [];
  const sideIndexes = [];
  let multiParents, multiParentsIndex;

  for (let i = 0; i < edges.length; i++) {
    const [u, v] = edges[i];
    if (!parents[v]) {
      parents[v] = u;
      sideIndexes[v] = i;
    } else {
      if (!multiParents) {
        multiParents = [parents[v]];
        multiParentsIndex = v;
      }
      multiParents.push(u);
    }
  }

  if (multiParents) {
    for (const parent of multiParents) {
      let node = parent;
      do {
        node = parents[node];
      } while (node != undefined && node != multiParentsIndex);
      if (node == multiParentsIndex) return [parent, multiParentsIndex];
    }
    return [multiParents.pop(), multiParentsIndex];
  } else {
    const accessed = new Set();
    for (let i = 1; i < parents.length; i++) {
      if (!accessed.has(i)) {
        let sideIndex = sideIndexes[i];
        let node = i;
        do {
          accessed.add(node);
          node = parents[node];
          sideIndex = Math.max(sideIndex, sideIndexes[node]);
        } while (node != undefined && node != i);
        if (node == i) return edges[sideIndex];
      }
    }
  }
};
