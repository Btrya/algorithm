/**
 * 2022/07/26 每日一题 2078. 两栋颜色不同且距离最远的房子
 * https://leetcode.cn/problems/two-furthest-houses-with-different-colors/
 */
 function maxDistance(colors: number[]): number {
  let ans = Number.MIN_SAFE_INTEGER
  for (let i = 0; i < colors.length - 1; ++i) {
    for (let j = i + 1; j < colors.length; ++j) {
      if (colors[i] !== colors[j]) ans = Math.max(ans, j - i)
    }
  }
  return ans
};