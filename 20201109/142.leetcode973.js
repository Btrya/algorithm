/**
 * 2020/11/09 每日一题 973. 最接近原点的 K 个点
 * 我们有一个由平面上的点组成的列表 points。需要从中找出 K 个距离原点 (0, 0) 最近的点。
 * （这里，平面上两点之间的距离是欧几里德距离。）
 * 你可以按任何顺序返回答案。除了点坐标的顺序之外，答案确保是唯一的。
 * 示例 1：
 * 
 * 输入：points = [[1,3],[-2,2]], K = 1
 * 输出：[[-2,2]]
 * 解释： 
 * (1, 3) 和原点之间的距离为 sqrt(10)，
 * (-2, 2) 和原点之间的距离为 sqrt(8)，
 * 由于 sqrt(8) < sqrt(10)，(-2, 2) 离原点更近。
 * 我们只需要距离原点最近的 K = 1 个点，所以答案就是 [[-2,2]]。
 * 示例 2：
 * 
 * 输入：points = [[3,3],[5,-1],[-2,4]], K = 2
 * 输出：[[3,3],[-2,4]]
 * （答案 [[-2,4],[3,3]] 也会被接受。）
 */
/**
 * @param {number[][]} points
 * @param {number} K
 * @return {number[][]}
 */
// 对原数组排序，根据K值切割数组
var kClosest = function(points, K) {
  if (!points) return []
  let arr = points.sort((a, b) => Math.sqrt(a[0] ** 2 + a[1] ** 2) - Math.sqrt(b[0] ** 2 + b[1] ** 2))
  return arr.slice(0, Math.min(K, points.length));
};

// 不使用指数运算符会更快，不知道为啥
var kClosest = function(points, K) {
  if (!points) return []
  let arr = points.sort((a, b) => Math.sqrt(a[0] *a[0] + a[1] *a[1]) - Math.sqrt(b[0] *b[0] + b[1] *b[1]))
  return arr.slice(0, Math.min(K, points.length));
};