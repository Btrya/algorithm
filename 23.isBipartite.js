/**
 * leetcode 785.判断二分图
 * 
 * 给定一个无向图graph，当这个图为二分图时返回true。
 * 如果我们能将一个图的节点集合分割成两个独立的子集A和B，并使图中的每一条边的两个节点一个来自A集合
 * 一个来自B集合，我们就将这个图称为二分图。
 * graph将会以邻接表方式给出，graph[i]表示图中与节点i相连的所有节点。每个节点都是一个在0到graph.length-1之间的整数。
 * 这图中没有自环和平行边：graph[i] 中不存在i，并且graph[i]中没有重复的值。
 */
/**
 * @param {number[][]} graph
 * @return {boolean}
 */
// 解题思路：把一个点染成红色，所连接的点染成绿色，遍历每一个点，当发现某个点染色冲突，返回false
// bfs深度遍历
var isBipartite = function(graph) {
  let uncolor = 0
      red = 1
      green = 2
  let valid = true
  let n = graph.length
  let color = new Array(n).fill(uncolor)
  const dfs = function(node, c) {
      color[node] = c
      let cNei = c == red ? green : red
      for(let item of graph[node]) {
          if (color[item] == uncolor) {
              dfs(item, cNei, graph)
              if (!valid) {
                  return
              }
          } else if (color[item] != cNei) {
              valid = false
              return
          }
      }
  }
  for (let i = 0; i < n && valid; i++) {
      if (color[i] == uncolor) {
          dfs(i, red)
      }
  }
  return valid
};


/**
 * @param {number[][]} graph
 * @return {boolean}
 */
// bfs， 广度优先遍历
var isBipartite = function(graph) {
  let uncolor = 0
      red = 1
      green = 2
  let n = graph.length
  let color = new Array(n).fill(uncolor)
  for(let i = 0; i < n; i++) {
      if (color[i] == uncolor) {
          let queue = [i]
          color[i] = red
          while(queue.length) {
              let node = queue.shift()
              let newC = color[node] == red ? green : red
              for (let item of graph[node]) {
                  if(color[item] == uncolor) {
                      queue.push(item)
                      color[item] = newC
                  } else if (color[item] !== newC) {
                      return false 
                  }
              }
          }
      }
  }
  return true
};