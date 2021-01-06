/**
 * 2021/01/06 每日一题 399.除法求值
 * 给你一个变量对数组 equations 和一个实数值数组 values 作为已知条件，其中 equations[i] = [Ai, Bi] 和 values[i] 共同表示等式 Ai / Bi = values[i] 。
 * 每个 Ai 或 Bi 是一个表示单个变量的字符串。
 * 另有一些以数组 queries 表示的问题，其中 queries[j] = [Cj, Dj] 表示第 j 个问题，请你根据已知条件找出 Cj / Dj = ? 的结果作为答案。
 * 返回 所有问题的答案 。如果存在某个无法确定的答案，则用 -1.0 替代这个答案。
 * 注意：输入总是有效的。你可以假设除法运算中不会出现除数为 0 的情况，且不存在任何矛盾的结果。
 *
 * 示例 1：
 *
 * 输入：equations = [["a","b"],["b","c"]], values = [2.0,3.0], queries = [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]]
 * 输出：[6.00000,0.50000,-1.00000,1.00000,-1.00000]
 * 解释：
 * 条件：a / b = 2.0, b / c = 3.0
 * 问题：a / c = ?, b / a = ?, a / e = ?, a / a = ?, x / x = ?
 * 结果：[6.0, 0.5, -1.0, 1.0, -1.0 ]
 * 示例 2：
 *
 * 输入：equations = [["a","b"],["b","c"],["bc","cd"]], values = [1.5,2.5,5.0], queries = [["a","c"],["c","b"],["bc","cd"],["cd","bc"]]
 * 输出：[3.75000,0.40000,5.00000,0.20000]
 * 示例 3：
 *
 * 输入：equations = [["a","b"]], values = [0.5], queries = [["a","b"],["b","a"],["a","c"],["x","y"]]
 * 输出：[0.50000,2.00000,-1.00000,-1.00000]
 */
/**
 * @param {string[][]} equations
 * @param {number[]} values
 * @param {string[][]} queries
 * @return {number[]}
 */
/**
 * @param {string[][]} equations
 * @param {number[]} values
 * @param {string[][]} queries
 * @return {number[]}
 */
// 先构造图再dfs
var calcEquation = function (equations, values, queries) {
  const graph = {},
    visited = new Set();

  // 构造图，equations的第一项除以第二项等于value里的对应值，第二项除以第一项等于其倒数
  for (let [index, value] of values.entries()) {
    const x = equations[index][0],
      y = equations[index][1];
    if (graph[x]) {
      graph[x][y] = value;
    } else {
      graph[x] = { [y]: value };
    }

    if (graph[y]) {
      graph[y][x] = 1 / value;
    } else {
      graph[y] = { [x]: 1 / value };
    }
  }

  // dfs找寻从s到t的路径并返回结果叠乘后的边权重即结果
  const dfs = (dividend, divisor) => {
    if (!graph[dividend]) {
      return -1;
    }
    if (dividend === divisor) {
      return 1;
    }
    for (let node of Object.keys(graph[dividend])) {
      if (node === divisor) {
        return graph[dividend][node];
      } else if (!visited.has(node)) {
        visited.add(node); // 添加到已访问避免重复遍历
        const value = dfs(node, divisor);
        visited.delete(node);
        if (value !== -1) {
          return graph[dividend][node] * value;
        }
      }
    }
    return -1;
  };
  return queries.map(([dividend, divisor]) => dfs(dividend, divisor));
};
