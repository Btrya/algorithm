/**
 * 2021/01/15 每日一题 947. 移除最多的同行或同列石头
 * n 块石头放置在二维平面中的一些整数坐标点上。每个坐标点上最多只能有一块石头。
 * 如果一块石头的 同行或者同列 上有其他石头存在，那么就可以移除这块石头。 
 * 给你一个长度为 n 的数组 stones ，其中 stones[i] = [xi, yi] 表示第 i 块石头的位置，返回 可以移除的石子 的最大数量。
 * 示例 1：
 * 
 * 输入：stones = [[0,0],[0,1],[1,0],[1,2],[2,1],[2,2]]
 * 输出：5
 * 解释：一种移除 5 块石头的方法如下所示：
 * 1. 移除石头 [2,2] ，因为它和 [2,1] 同行。
 * 2. 移除石头 [2,1] ，因为它和 [0,1] 同列。
 * 3. 移除石头 [1,2] ，因为它和 [1,0] 同行。
 * 4. 移除石头 [1,0] ，因为它和 [0,0] 同列。
 * 5. 移除石头 [0,1] ，因为它和 [0,0] 同行。
 * 石头 [0,0] 不能移除，因为它没有与另一块石头同行/列。
 * 示例 2：
 * 
 * 输入：stones = [[0,0],[0,2],[1,1],[2,0],[2,2]]
 * 输出：3
 * 解释：一种移除 3 块石头的方法如下所示：
 * 1. 移除石头 [2,2] ，因为它和 [2,0] 同行。
 * 2. 移除石头 [2,0] ，因为它和 [0,0] 同列。
 * 3. 移除石头 [0,2] ，因为它和 [0,0] 同行。
 * 石头 [0,0] 和 [1,1] 不能移除，因为它们没有与另一块石头同行/列。
 * 示例 3：
 * 
 * 输入：stones = [[0,0]]
 * 输出：0
 * 解释：[0,0] 是平面上唯一一块石头，所以不可以移除它。
 */
/**
 * @param {number[][]} stones
 * @return {number}
 */
// 题目求最多石头，不求过程，即考验并查集来求结果 最大石头 = 所有石头 - 连通分量的个数
class UnionFind {
  constructor(n) {
    this.parent = new Array(n)
    this.size = new Array(n)
    this.count = 0
  }
  find(x) {
    let parent = this.parent
    while (x != parent[x]) {
      parent[x] = parent[parent[x]]
      x = parent[x]
    }
    return x
  }
  ensure(x) {
    if (!this.parent[x]) {
      this.parent[x] = x
      this.size[x] = 1
      this.count++
    }
  }
  union(p, q) {
    this.ensure(p)
    this.ensure(q)
    let parent = this.parent
    let size = this.size
    let rootP = this.find(p)
    let rootQ = this.find(q)
    if (rootP == rootQ) return
    if (size[rootP] > size[rootQ]) {
      parent[rootQ] = rootP
      size[rootP] += size[rootQ]
    } else {
      parent[rootP] = rootQ
      size[rootQ] += size[rootP]
    }
    this.count--
  }
}
var removeStones = function(stones) {
  let union = new UnionFind(20000)
  for (let i = 0; i < stones.length; i++) {
    let [x, y] = stones[i]
    union.union(x, y + 10000)
  }
  return stones.length - union.count
};