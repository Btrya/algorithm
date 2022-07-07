/**
 * 2022/07/08 每日一题 1217. 玩筹码
 * https://leetcode.cn/problems/minimum-cost-to-move-chips-to-the-same-position/
 */
 function minCostToMoveChips(position: number[]): number {
  let oddCount = 0
  let evenCount = 0
  for (let i = 0; i < position.length; ++i) {
    if (position[i] % 2 === 0) oddCount++
    else evenCount++
  }
  return Math.min(oddCount, evenCount)
};