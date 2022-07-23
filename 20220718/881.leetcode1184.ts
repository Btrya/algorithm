/**
 * 2022/07/24 每日一题 1184. 公交站间的距离
 * https://leetcode.cn/problems/distance-between-bus-stops/
 */
 function distanceBetweenBusStops(distance: number[], start: number, destination: number): number {
  let sum = distance.reduce((total, item) => total += item, 0)
  let a = distance.slice(Math.min(start, destination), Math.max(start, destination)).reduce((total, item) => total += item, 0)
  return Math.min(a, sum - a)
};