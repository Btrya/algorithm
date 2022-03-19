/**
 * 2022/03/20 每日一题 2039. 网络空闲的时刻
 * https://leetcode-cn.com/problems/the-time-when-the-network-becomes-idle/
 */
/**
 * @param {number[][]} edges
 * @param {number[]} patience
 * @return {number}
 */
var networkBecomesIdle = function (edges, patience) {
  const n = patience.length
  const g = new Map()
  for (const [x, y] of edges) {
    if (!g.has(x)) g.set(x, [])
    if (!g.has(y)) g.set(y, [])
    g.get(x).push(y)
    g.get(y).push(x)
  }
  const used = new Array(n).fill(false)
  const dfs = (i, s, e, cnt) => {
    if (s === e) {
      time[i] = Math.min(cnt * 2, time[i])
      return
    }
    if (time[s] !== Infinity) {
      time[i] = Math.min(cnt * 2 + time[s], time[i])
      return
    }
    for (const next of g.get(s)) {
      if (used[next]) continue
      used[next] = true
      dfs(i, next, e, cnt + 1)
      used[next] = false
    }
  }
  let time = new Array(n).fill(Infinity)
  for (let i = 1; i < n; i++) {
    dfs(i, i, 0, 0)
  }
  let cost = [...time]
  let ans = 0
  for (let i = 1; i < n; i++) {
    if (time[i] > patience[i]) {
      cost[i] += Math.floor((time[i] - 1) / patience[i]) * patience[i]
    }
    ans = Math.max(ans, cost[i])
  }
  // 完成最后一个响应的下一秒即全部空闲
  return ans + 1
};