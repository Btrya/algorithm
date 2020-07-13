/**
 * leetcode: 56.合并区间
 * 给出一个区间的集合，请合并所有重叠的区间。
 * 示例 1:
 * 
 * 输入: [[1,3],[2,6],[8,10],[15,18]]
 * 输出: [[1,6],[8,10],[15,18]]
 * 解释: 区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
 * 示例 2:
 * 
 * 输入: [[1,4],[4,5]]
 * 输出: [[1,5]]
 * 解释: 区间 [1,4] 和 [4,5] 可被视为重叠区间。
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
  // 根据区间的左端点进行一个排序
  intervals.sort((a, b) => a[0] - b[0])
  let res = []
  let idx = -1
  for (let i = 0; i < intervals.length; i++) {
    // res为空的时候或者新的区间的左端点大于当前比较的区间的右端点 这时候说明新的区间不重叠，可以push
    if(idx == -1 || intervals[i][0] > res[idx][1]) {
      res.push(intervals[i])
      idx ++
    } else {
      // 否则选择右端点更大的一项赋值到当前比较区间的右端点
      res[idx][1] = Math.max(res[idx][1], intervals[i][1])
    }
  }
  return res
};

console.log(merge([[1,3],[2,6],[8,10],[15,18]])) // [[1,6],[8,10],[15,18]]
console.log(merge([[1,4],[4,5]]))  // [[1, 5]]