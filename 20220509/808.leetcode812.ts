/**
 * 2022/05/15 每日一题 812. 最大三角形面积
 * https://leetcode.cn/problems/largest-triangle-area/
 */
type Point = [number, number]

const getLine = (p1: Point, p2: Point) =>
  Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2))

function largestTriangleArea(points: Point[]): number {
  let res = 0
  for (let i = 0; i < points.length; i++) {
    for (let j = i; j < points.length; j++) {
      for (let k = j; k < points.length; k++) {
        const a = getLine(points[i], points[j])
        const b = getLine(points[i], points[k])
        const c = getLine(points[j], points[k])
        const p = (a + b + c) / 2
        const area = Math.sqrt(p * (p - a) * (p - b) * (p - c))
        area > res && (res = area)
      }
    }
  }
  return res
}
