/**
 * 2022/06/14 每日一题 498. 对角线遍历
 * https://leetcode.cn/problems/diagonal-traverse/
 */
 function findDiagonalOrder(mat: number[][]): number[] {
  const res = []
  const m = mat.length
  const n = mat[0].length
  if (m === 0 || n === 0) return res
  let flag = true
  for (let i = 0; i < m + n; ++i) {
    const pm = flag ? m : n
    const pn = flag ? n : m
    let x = (i < pm) ? i : pm - 1
    let y = i - x
    while (x >= 0 && y < pn) {
      res.push(flag ? mat[x][y] : mat[y][x])
      x--
      y++
    }
    flag = !flag
  }
  return res
};