/**
 * 2021/01/11 每日一题 1036. 逃离大迷宫
 * 在一个 106 x 106 的网格中，每个网格上方格的坐标为 (x, y) 。
 * 
 * 现在从源方格 source = [sx, sy] 开始出发，意图赶往目标方格 target = [tx, ty] 。数组 blocked 是封锁的方格列表，其中每个 blocked[i] = [xi, yi] 表示坐标为 (xi, yi) 的方格是禁止通行的。
 * 
 * 每次移动，都可以走到网格中在四个方向上相邻的方格，只要该方格 不 在给出的封锁列表 blocked 上。同时，不允许走出网格。
 * 
 * 只有在可以通过一系列的移动从源方格 source 到达目标方格 target 时才返回 true。否则，返回 false。
 * 示例 1：
 * 
 * 输入：blocked = [[0,1],[1,0]], source = [0,0], target = [0,2]
 * 输出：false
 * 解释：
 * 从源方格无法到达目标方格，因为我们无法在网格中移动。
 * 无法向北或者向东移动是因为方格禁止通行。
 * 无法向南或者向西移动是因为不能走出网格。
 * 示例 2：
 * 
 * 输入：blocked = [], source = [0,0], target = [999999,999999]
 * 输出：true
 * 解释：
 * 因为没有方格被封锁，所以一定可以到达目标方格。
 *  
 * 
 * 提示：
 * 
 * 0 <= blocked.length <= 200
 * blocked[i].length == 2
 * 0 <= xi, yi < 106
 * source.length == target.length == 2
 * 0 <= sx, sy, tx, ty < 106
 * source != target
 * 题目数据保证 source 和 target 不在封锁列表内
 */
/**
 * @param {number[][]} blocked
 * @param {number[]} source
 * @param {number[]} target
 * @return {boolean}
 */
const BOUND = 1000000
const DIR = [
  [0, 1],
  [1, 0],
  [-1, 0],
  [0, -1]
]
var isEscapePossible = function (blocked, source, target) {
  const max = Math.floor(blocked.length * (blocked.length - 1) / 2);
  block = new Set()
  for (const b of blocked)
    block.add(b[0] * BOUND + b[1])
  bfs = function (start, end) {
    const list = [start],
      explored = new Set()
    explored.add(start[0] * BOUND + start[1])
    for (let i = 0; i < list.length && list.length <= max; i++)
      for (const dir of DIR) {
        const point = [list[i][0] + dir[0], list[i][1] + dir[1]]
        const hash = point[0] * BOUND + point[1]
        if (point[0] >= 0 && point[0] < BOUND && point[1] >= 0 && point[1] < BOUND && !block.has(hash) && !explored.has(hash)) {
          if (point[0] == end[0] && point[1] == end[1])
            return true
          explored.add(hash)
          list.push(point)
        }
      }
    return list.length > max
  }
  return bfs(source, target) && bfs(target, source)
};