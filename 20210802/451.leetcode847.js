/**
 * 2021/08/06 每日一题 847. 访问所有节点的最短路径
 * 存在一个由 n 个节点组成的无向连通图，图中的节点按从 0 到 n - 1 编号。
 * 
 * 给你一个数组 graph 表示这个图。其中，graph[i] 是一个列表，由所有与节点 i 直接相连的节点组成。
 * 
 * 返回能够访问所有节点的最短路径的长度。你可以在任一节点开始和停止，也可以多次重访节点，并且可以重用边。
 * 
 *  
 * 
 * 示例 1：
 * 
 * 
 * 输入：graph = [[1,2,3],[0],[0],[0]]
 * 输出：4
 * 解释：一种可能的路径为 [1,0,2,0,3]
 * 示例 2：
 * 
 * 
 * 
 * 输入：graph = [[1],[0,2,4],[1,3,4],[2],[1,2]]
 * 输出：4
 * 解释：一种可能的路径为 [0,1,4,2,3]
 *  
 * 
 * 提示：
 * 
 * n == graph.length
 * 1 <= n <= 12
 * 0 <= graph[i].length < n
 * graph[i] 不包含 i
 * 如果 graph[a] 包含 b ，那么 graph[b] 也包含 a
 * 输入的图总是连通图
 */
/**
 * @param {number[][]} graph
 * @return {number}
 */
var shortestPathLength = function (graph) {
  const n = graph.length;
  const d = new Array(n).fill(0).map(() => new Array(n).fill(n + 1));
  for (let i = 0; i < n; ++i) {
    for (const j of graph[i]) {
      d[i][j] = 1;
    }
  }
  // 使用 floyd 算法预处理出所有点对之间的最短路径长度
  for (let k = 0; k < n; ++k) {
    for (let i = 0; i < n; ++i) {
      for (let j = 0; j < n; ++j) {
        d[i][j] = Math.min(d[i][j], d[i][k] + d[k][j]);
      }
    }
  }

  const f = new Array(n).fill(0).map(() => new Array(1 << n).fill(Number.MAX_SAFE_INTEGER));
  for (let mask = 1; mask < (1 << n); ++mask) {
    // 如果 mask 只包含一个 1，即 mask 是 2 的幂
    if ((mask & (mask - 1)) === 0) {
      const tmp = (mask & (-mask)) - 1;
      const u = tmp.toString(2).split('0').join('').length;
      f[u][mask] = 0;
    } else {
      for (let u = 0; u < n; ++u) {
        if ((mask & (1 << u)) !== 0) {
          for (let v = 0; v < n; ++v) {
            if ((mask & (1 << v)) !== 0 && u !== v) {
              f[u][mask] = Math.min(f[u][mask], f[v][mask ^ (1 << u)] + d[v][u]);
            }
          }
        }
      }
    }
  }

  let ans = Number.MAX_SAFE_INTEGER;
  for (let u = 0; u < n; ++u) {
    ans = Math.min(ans, f[u][(1 << n) - 1]);
  }
  return ans;
};

// 审题：
// * 无向连通图
// * 编号 0, ..., N-1
// * graph[i] 表示与节点 i 连通的节点列表，其中无重复，不包含 i
// * 起点、终点任意
// * 可重复访问节点，可重复使用边
// * 求：访问所有节点的最短路径长度
//   * 边长相同，能用 BFS 求图中最短路径长度
/**
 * @param {number[][]} graph
 * @return {number}
 */

/*
BFS + 状态压缩
「可以多次重访节点，并且可以重用边」=>「可能以不同的状态访问同一节点，从而路径长度不同」
BFS入队的是二元组 (state, i)
state 的 bit 表示目前已访问的节点（包括 i 号节点）
i 表示以状态 state 到达的节点
BFS层数就是路径长度
当 state 首次达到 MAX_STATE 时，BFS层数就是最短路径长度
*/
var shortestPathLength = function(graph) {
  if (!graph || !graph.length
    || (graph.length === 1 && !graph[0].length)
  ) return 0
  // NOTICE: 1 <= N <= 12 -> 2^3 < N < 2^4 ，即 N - 1 至少需要 4 个 bit 来存储
  const N = graph.length, OFFSET = 4
  const MAX_STATE = (1 << N) - 1
  let queue = []
  // NOTICE: 用于避免相同的二元组 (state, node) 重复入队
  let enqueued = new Set()

  // 可以在任一节点开始
  for (let start = 0; start < N; ++start) {
    const state = 1 << start
    queue.push([1 << start, start])
    const nodeWithState = (state << OFFSET) + start
    enqueued.add(nodeWithState)
  }

  let distance = 0 // 达到当前队列中的节点的路径长度
  while (queue.length) {
    const nextQueue = []
    // BFS节点操作
    for (const [state, cur] of queue) { // 软出队
      // 顺推：cur => next, state => nextState
      for (const next of graph[cur]) {
        const nextState = state | (1 << next)
        const nextNodeWithState = (nextState << OFFSET) + next
        // 最优性剪枝: 相同的二元组 (state, cur) 会计算出相同的 (nextState, next) ，如果重复计算的话，得到的是更长的 distance ，所以不用重复计算
        if (enqueued.has(nextNodeWithState)) continue
        // BUGFIX: 是 next 节点达到 MAX_STATE 状态，所以要加1
        if (nextState === MAX_STATE) return distance + 1
        nextQueue.push([nextState, next])
        enqueued.add(nextNodeWithState)
      }
    }
    queue = nextQueue // 真实出队
    // BFS层操作
    distance++
  }

  return distance
}

