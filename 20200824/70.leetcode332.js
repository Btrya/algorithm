/**
 * 2020/08/27 leetcode 每日一题 332.重新安排行程
 * 给定一个机票的字符串二维数组 [from, to]，子数组中的两个成员分别表示飞机出发和降落的机场地点，对该行程进行重新规划排序。
 * 所有这些机票都属于一个从 JFK（肯尼迪国际机场）出发的先生，所以该行程必须从 JFK 开始。
 * 说明:
 * 如果存在多种有效的行程，你可以按字符自然排序返回最小的行程组合。例如，行程 ["JFK", "LGA"] 与 ["JFK", "LGB"] 相比就更小，排序更靠前
 * 所有的机场都用三个大写字母表示（机场代码）。
 * 假定所有机票至少存在一种合理的行程。
 * 示例 1:
 * 输入: [["MUC", "LHR"], ["JFK", "MUC"], ["SFO", "SJC"], ["LHR", "SFO"]]
 * 输出: ["JFK", "MUC", "LHR", "SFO", "SJC"]
 * 示例 2:
 * 输入: [["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]]
 * 输出: ["JFK","ATL","JFK","SFO","ATL","SFO"]
 * 解释: 另一种有效的行程是 ["JFK","SFO","ATL","JFK","ATL","SFO"]。但是它自然排序更大更靠后。
 */
/**
 * @param {string[][]} tickets
 * @return {string[]}
 */
// 回溯
var findItinerary = function(tickets) {
    const res = ['JFK']; // 初始放入起点'JFK'
    const map = {};      // 邻接表
    for (const ticket of tickets) { // 建表
      const [from, to] = ticket;
      if (!map[from]) {
        map[from] = [];
      }
      map[from].push(to);
    }
    for (const city in map) { // 按照字母顺序，小的在前
      map[city].sort();
    }
    const dfs = (city, used) => { // 当前访问的城市、已用掉的机票数
      if (used == tickets.length) { 
        return true;
      };
      const nextCities = map[city];
      if (!nextCities || nextCities.length == 0) { // 没有邻接城市了
        return false; // 还没用光机票的情況下，没有下一站了，返回false
      }
      for (let i = 0; i < nextCities.length; i++) { // 设置出各种选择（递归分支）
        const next = nextCities[i]; // 当前选择的下一站
        nextCities.splice(i, 1);    // 飞出地的list中删掉这一站
        res.push(next);             // 该选择推入res
        if (dfs(next, used + 1)) {  // 在该递归分支中能找到一个用完所有机票的路径
          return true;
        } else {
          nextCities.splice(i, 0, next); // 删掉的这一站再插入回去
          res.pop();                     // 推入res的选择，也撤销
        }
      }
    };
    dfs('JFK', 0); // 从'JFK'城市开始遍历，当前用掉0张机票
    return res;
};