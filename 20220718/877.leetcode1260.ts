/**
 * 2022/07/20 每日一题 1260. 二维网格迁移
 * https://leetcode.cn/problems/shift-2d-grid/
 */
 function shiftGrid(grid: number[][], k: number): number[][] {
  const n = grid.length, m = grid[0].length
  const res = []
  let flatGrid = grid.flat(Infinity)
  const offset = k % (n * m)
  flatGrid = flatGrid.slice(-offset).concat(flatGrid.slice(0, -offset))
  for (let i = 0; i < n; ++i) {
    res.push(flatGrid.slice(i * m, (i + 1) * m))
  }
  return res
};