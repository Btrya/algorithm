/**
 * 2022/01/18 每日一题 539. 最小时间差
 * 给定一个 24 小时制（小时:分钟 "HH:MM"）的时间列表，找出列表中任意两个时间的最小时间差并以分钟数表示。
 * 示例 1：
 * 
 * 输入：timePoints = ["23:59","00:00"]
 * 输出：1
 * 示例 2：
 * 
 * 输入：timePoints = ["00:00","23:59","00:00"]
 * 输出：0
 */
/**
 * @param {string[]} timePoints
 * @return {number}
 */
 var findMinDifference = function(timePoints) {
  const n = timePoints.length
  if (n > 1440) return 0 
  timePoints.sort()
  let prevTime = getMin(timePoints[0])
  let t0Time = prevTime + 1440
  let ans = Number.MAX_VALUE
  for (let i = 1; i < n; ++i) {
    const minutes = getMin(timePoints[i])
    ans = Math.min(ans, minutes - prevTime)
    prevTime = minutes
  }
  ans = Math.min(ans, t0Time - prevTime)
  return ans
};

const getMin = (t) => {
  return (t[0] * 10 + ~~t[1]) * 60 + (~~t[3] * 10 + ~~t[4])
}