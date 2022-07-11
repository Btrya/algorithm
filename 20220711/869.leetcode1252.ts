/**
 * 2022/07/12 每日一题 1252. 奇数值单元格的数目
 * https://leetcode.cn/problems/cells-with-odd-values-in-a-matrix/
 */
function oddCells(m: number, n: number, indices: number[][]): number {
  const rows = new Array(m).fill(0)
  const cols = new Array(n).fill(0)
  for (const index of indices) {
    rows[index[0]]++
    cols[index[1]]++
  }
  let res = 0
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (((rows[i] + cols[j]) & 1) !== 0) {
        res++
      }
    }
  }
  return res
}
