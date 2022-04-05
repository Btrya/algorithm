/**
 * 2022/04/06 每日一题 310. 最小高度树
 * https://leetcode-cn.com/problems/minimum-height-trees/
 */
/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[]}
 */
 var findMinHeightTrees = function(n, edges) {
  if (n === 1) return [0]
  const G = Array.from(Array(n), () => [])
  const Deg = new Array(n).fill(0)
  for (const [u, v] of edges) {
    G[u].push(v), Deg[u]++
    G[v].push(u), Deg[v]++
  }

  // 维护叶子结点队列
  const queue = []
  for (let i = 0; i < n; ++i) {
    if (Deg[i] === 1) queue.push(i)
  }

  // 剪去叶子
  let res = []
  while (queue.length > 0) {
    res = []
    const size = queue.length
    for (let i = 0; i < size; ++i) {
      const u = queue.shift()
      res.push(u)
      // 更新相邻节点的度
      for (const v of G[u]) {
        Deg[v]--
        if (Deg[v] === 1) queue.push(v)
      }
    }
  }
  return res
};