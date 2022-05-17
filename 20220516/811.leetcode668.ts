/**
 * 2022/05/18 每日一题 668. 乘法表中第k小的数
 */
 function findKthNumber(m: number, n: number, k: number): number {
  let left = 1, right = m * n
  while (left < right) {
    const mid = (left + right) >> 1
    let count = Math.floor(mid / n) * n
    for (let i = Math.floor(mid / n) + 1; i <= m; ++i) {
      count += Math.floor(mid / i)
    }
    if (count >= k) right = mid
    else left = mid + 1
  }
  return left
};