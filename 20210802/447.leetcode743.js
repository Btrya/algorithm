/**
 * 2021/08/02 每日一题 743. 网络延迟时间
 * 有 n 个网络节点，标记为 1 到 n。
 * 
 * 给你一个列表 times，表示信号经过 有向 边的传递时间。 times[i] = (ui, vi, wi)，其中 ui 是源节点，vi 是目标节点， wi 是一个信号从源节点传递到目标节点的时间。
 * 
 * 现在，从某个节点 K 发出一个信号。需要多久才能使所有节点都收到信号？如果不能使所有节点收到信号，返回 -1 。
 * 
 *  
 * 
 * 示例 1：
 * 
 * 
 * 
 * 输入：times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2
 * 输出：2
 * 示例 2：
 * 
 * 输入：times = [[1,2,1]], n = 2, k = 1
 * 输出：1
 * 示例 3：
 * 
 * 输入：times = [[1,2,1]], n = 2, k = 2
 * 输出：-1
 */
/**
 * @param {number[][]} times
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var networkDelayTime = function (times, n, k) {
  const INF = Number.MAX_SAFE_INTEGER;
  const g = new Array(n).fill(INF).map(() => new Array(n).fill(INF));
  for (const t of times) {
    const x = t[0] - 1,
      y = t[1] - 1;
    g[x][y] = t[2];
  }

  const dist = new Array(n).fill(INF);
  dist[k - 1] = 0;
  const used = new Array(n).fill(false);
  for (let i = 0; i < n; ++i) {
    let x = -1;
    for (let y = 0; y < n; ++y) {
      if (!used[y] && (x === -1 || dist[y] < dist[x])) {
        x = y;
      }
    }
    used[x] = true;
    for (let y = 0; y < n; ++y) {
      dist[y] = Math.min(dist[y], dist[x] + g[x][y]);
    }
  }

  let ans = Math.max(...dist);
  return ans === INF ? -1 : ans;
}