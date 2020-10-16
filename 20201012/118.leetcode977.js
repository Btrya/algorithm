/**
 * 2020/10/16 每日一题  977. 有序数组的平方
 * 给定一个按非递减顺序排序的整数数组 A，返回每个数字的平方组成的新数组，要求也按非递减顺序排序。
 * 示例 1：
 * 输入：[-4,-1,0,3,10]
 * 输出：[0,1,9,16,100]
 * 示例 2：
 * 输入：[-7,-3,2,3,11]
 * 输出：[4,9,9,49,121]
 */
/**
 * @param {number[]} A
 * @return {number[]}
 */
var sortedSquares = function(A) {
  return A.sort((a, b) => Math.abs(a) - Math.abs(b)).map(item => item ** 2)
};

var sortedSquares = function(A) {
  let n = A.length, ans = []
  for (let i = 0, j = n - 1, pos = n - 1; i <= j;) {
    if (A[i] ** 2 > A[j] ** 2) {
      ans[pos] = A[i] ** 2
      i ++
    } else {
      ans[pos] = A[j] ** 2
      j --
    }
    pos --
  }
  return ans
};