/**
 * 2021/01/07 每日一题 547. 省份数量
 * 有 n 个城市，其中一些彼此相连，另一些没有相连。如果城市 a 与城市 b 直接相连，且城市 b 与城市 c 直接相连，那么城市 a 与城市 c 间接相连。
 * 省份 是一组直接或间接相连的城市，组内不含其他没有相连的城市。
 * 给你一个 n x n 的矩阵 isConnected ，其中 isConnected[i][j] = 1 表示第 i 个城市和第 j 个城市直接相连，而 isConnected[i][j] = 0 表示二者不直接相连。
 * 返回矩阵中 省份 的数量。
 * 
 * 示例 1：
 * 
 * 
 * 输入：isConnected = [[1,1,0],[1,1,0],[0,0,1]]
 * 输出：2
 * 示例 2：
 * 
 * 
 * 输入：isConnected = [[1,0,0],[0,1,0],[0,0,1]]
 * 输出：3
 */
/**
 * @param {number[][]} isConnected
 * @return {number}
 */
var findCircleNum = function(isConnected) {
  const provinces = isConnected.length;
  const parent = new Array(provinces).fill(0);
  for (let i = 0; i < provinces; i++) {
      parent[i] = i;
  }
  for (let i = 0; i < provinces; i++) {
      for (let j = i + 1; j < provinces; j++) {
          if (isConnected[i][j] == 1) {
              union(parent, i, j);
          }
      }
  }
  let circles = 0;
  for (let i = 0; i < provinces; i++) {
      if (parent[i] === i) {
          circles++;
      }
  }
  return circles;
};

const union = (parent, index1, index2) => {
  parent[find(parent, index1)] = find(parent, index2);
}

const find = (parent, index) => {
  if (parent[index] !== index) {
      parent[index] = find(parent, parent[index]);
  }
  return parent[index];
}

// dfs
var findCircleNum = function(M) {
  let n = M.length;
  if (n == 0) return 0
  let vis = {};
  let count = 0;
  function dfs(i) {
    for (let j =0;j<n;j++) {
      if (M[i][j]==1 && !vis[j]) {
          vis[j] = true;
          dfs(j);
      }
    }
  }
  for (i = 0;i < n;i++) {
    if (!vis[i]) {
      dfs(i);
      count++;
    }
  }
  return count
};