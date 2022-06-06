/**
 * 2022/06/07 每日一题 875. 爱吃香蕉的珂珂
 * 珂珂喜欢吃香蕉。这里有 n 堆香蕉，第 i 堆中有 piles[i] 根香蕉。警卫已经离开了，将在 h 小时后回来。
 *
 * 珂珂可以决定她吃香蕉的速度 k （单位：根/小时）。每个小时，她将会选择一堆香蕉，从中吃掉 k 根。如果这堆香蕉少于 k 根，她将吃掉这堆的所有香蕉，然后这一小时内不会再吃更多的香蕉。
 *
 * 珂珂喜欢慢慢吃，但仍然想在警卫回来前吃掉所有的香蕉。
 *
 * 返回她可以在 h 小时内吃掉所有香蕉的最小速度 k（k 为整数）。
 *
 * 示例 1：
 *
 * 输入：piles = [3,6,7,11], h = 8
 * 输出：4
 * 示例 2：
 *
 * 输入：piles = [30,11,23,4,20], h = 5
 * 输出：30
 * 示例 3：
 *
 * 输入：piles = [30,11,23,4,20], h = 6
 * 输出：23
 *
 *
 * 提示：
 *
 * 1 <= piles.length <= 104
 * piles.length <= h <= 109
 * 1 <= piles[i] <= 109
 */
function minEatingSpeed(piles: number[], h: number): number {
  let l = 1
  let r = Math.max(...piles)
  while (l < r) {
    const mid = Math.floor(l + (r - l) / 2)
    if (canFinish(mid, h, piles)) {
      r = mid
    } else {
      l = mid + 1
    }
  }
  return l
}
function canFinish(k, h, piles) {
  // 循环每堆
  // 假设总时间为 total, 当 total 大于 h 的时候，说明吃不完
  let totalTime = 0
  for (let i = 0; i < piles.length; i++) {
    // 当香蕉少于 k 的时候，当成 1 小时算
    if (piles[i] <= k) {
      totalTime += 1
    } else {
      totalTime += Math.ceil(piles[i] / k)
    }
    if (totalTime > h) {
      return false
    }
  }
  return true
}
