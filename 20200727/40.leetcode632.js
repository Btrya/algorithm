/**
 * 2020/08/01 每日一题 632.最小区间 hard
 * 你有 k 个升序排列的整数数组。找到一个最小区间，使得 k 个列表中的每个列表至少有一个数包含在其中。
 * 
 * 我们定义如果 b-a < d-c 或者在 b-a == d-c 时 a < c，则区间 [a,b] 比 [c,d] 小。
 * 
 * 示例 1:
 * 
 * 输入:[[4,10,15,24,26], [0,9,12,20], [5,18,22,30]]
 * 输出: [20,24]
 * 解释: 
 * 列表 1：[4, 10, 15, 24, 26]，24 在区间 [20,24] 中。
 * 列表 2：[0, 9, 12, 20]，20 在区间 [20,24] 中。
 * 列表 3：[5, 18, 22, 30]，22 在区间 [20,24] 中。
 */

 /**
 * @param {number[][]} nums
 * @return {number[]}
 */
// 滑动窗口
var smallestRange = function(nums) {
  let points = []
  for (let i = 0; i < nums.length; i++) {
      for (let j = 0; j < nums[i].length; j++) {
          points.push([nums[i][j], i])
      }
  }
  points.sort((a, b) => a[0] - b[0])
  console.log(points)
  let counts = new Array(nums.length).fill(0)
  let countUnique = 0, minStart = -1, minLen = Number.MAX_VALUE
  for (let i = 0, j = 0; j < points.length; j++) {
      if (counts[points[j][1]] ++ === 0) countUnique++
      while(countUnique === counts.length) {
        console.log(counts)
          if (points[j][0] - points[i][0] + 1 < minLen) {
              minStart = points[i][0]
              minLen = points[j][0] - points[i][0] + 1
          }
          let prev = points[i][0]
          while(i <= j && prev === points[i][0]) {
              if (--counts[points[i++][1]] === 0) countUnique--
          }
      }
  }
  return [minStart, minStart + minLen - 1]
};

console.log(smallestRange([[4,10,15,24,26], [0,9,12,20], [5,18,22,30]]))