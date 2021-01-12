/**
 * 2021/01/12 每日一题 1203. 项目管理
 * 公司共有 n 个项目和  m 个小组，每个项目要不无人接手，要不就由 m 个小组之一负责。
 * group[i] 表示第 i 个项目所属的小组，如果这个项目目前无人接手，那么 group[i] 就等于 -1。（项目和小组都是从零开始编号的）小组可能存在没有接手任何项目的情况。
 * 请你帮忙按要求安排这些项目的进度，并返回排序后的项目列表：
 * 同一小组的项目，排序后在列表中彼此相邻。
 * 项目之间存在一定的依赖关系，我们用一个列表 beforeItems 来表示，其中 beforeItems[i] 表示在进行第 i 个项目前（位于第 i 个项目左侧）应该完成的所有项目。
 * 如果存在多个解决方案，只需要返回其中任意一个即可。如果没有合适的解决方案，就请返回一个 空列表 。
 * 示例 1：
 *
 * 输入：n = 8, m = 2, group = [-1,-1,1,0,0,1,0,-1], beforeItems = [[],[6],[5],[6],[3,6],[],[],[]]
 * 输出：[6,3,4,1,5,2,0,7]
 * 示例 2：
 *
 * 输入：n = 8, m = 2, group = [-1,-1,1,0,0,1,0,-1], beforeItems = [[],[6],[5],[6],[3],[],[4],[]]
 * 输出：[]
 * 解释：与示例 1 大致相同，但是在排序后的列表中，4 必须放在 6 的前面。
 */
/**
 * @param {number} n
 * @param {number} m
 * @param {number[]} group
 * @param {number[][]} beforeItems
 * @return {number[]}
 */
const topSort = (deg, graph, items) => {
  const Q = [];
  for (const item of items) {
    if (deg[item] === 0) Q.push(item);
  }
  const res = [];
  while (Q.length) {
    const u = Q.shift();
    res.push(u);
    for (let i = 0; i < graph[u].length; i++) {
      const v = graph[u][i];
      if (--deg[v] === 0) Q.push(v);
    }
  }
  return res.length == items.length ? res : [];
};

var sortItems = function (n, m, group, beforeItems) {
  const groupItem = new Array(n + m).fill(0).map(() => []);
  // 组间和组内依赖图
  const groupGraph = new Array(n + m).fill(0).map(() => []);
  const itemGraph = new Array(n).fill(0).map(() => []);
  // 组间和组内入度数组
  const groupDegree = new Array(n + m).fill(0);
  const itemDegree = new Array(n).fill(0);
  const id = new Array(n + m).fill(0).map((v, index) => index);
  let leftId = m;
  // 给未分配的 item 分配一个groupId
  for (let i = 0; i < n; ++i) {
    if (group[i] === -1) {
      group[i] = leftId;
      leftId += 1;
    }
    groupItem[group[i]].push(i);
  }
  // 依赖关系建图
  for (let i = 0; i < n; ++i) {
    const curGroupId = group[i];
    for (const item of beforeItems[i]) {
      const beforeGroupId = group[item];
      if (beforeGroupId === curGroupId) {
        itemDegree[i] += 1;
        itemGraph[item].push(i);
      } else {
        groupDegree[curGroupId] += 1;
        groupGraph[beforeGroupId].push(curGroupId);
      }
    }
  }

  // 组间拓扑关系排序
  const groupTopSort = topSort(groupDegree, groupGraph, id);
  if (groupTopSort.length == 0) {
    return [];
  }
  const ans = [];
  // 组内拓扑关系排序
  for (const curGroupId of groupTopSort) {
    const size = groupItem[curGroupId].length;
    if (size == 0) {
      continue;
    }
    const res = topSort(itemDegree, itemGraph, groupItem[curGroupId]);
    if (res.length === 0) {
      return [];
    }
    for (const item of res) {
      ans.push(item);
    }
  }
  return ans;
};
