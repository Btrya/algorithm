/**
 * 2022/08/07 每日一题 636. 函数的独占时间
 * https://leetcode.cn/problems/exclusive-time-of-functions/
 */
function exclusiveTime(n: number, logs: string[]): number[] {
  const ans = new Array<number>(n).fill(0),
    stack = new Array<number[]>()
  let total = 0
  for (const log of logs) {
    const [idxStr, start, timeStr] = log.split(":")
    const [idx, time] = [Number.parseInt(idxStr), Number.parseInt(timeStr)]
    if (start === "start") {
      stack.push([time, total])
    } else {
      const [t, s] = stack.pop()
      const diff = time + 1 - t - (total - s)
      ans[idx] += diff
      total += diff
    }
  }
  return ans
}
