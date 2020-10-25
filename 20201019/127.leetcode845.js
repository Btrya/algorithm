/**
 * 2020/10/25 每日一题 845. 数组中的最长山脉
 * 我们把数组 
 * A 中符合下列属性的任意连续子数组 B 称为 “山脉”：
 * B.length >= 3
 * 存在 0 < i < B.length - 1 使得 B[0] < B[1] < ... B[i-1] < B[i] > B[i+1] > ... > B[B.length - 1]
 * （注意：B 可以是 A 的任意子数组，包括整个数组 A。）
 * 给出一个整数数组 A，返回最长 “山脉” 的长度。
 * 如果不含有 “山脉” 则返回 0。
 * 示例 1：
 * 
 * 输入：[2,1,4,7,3,2,5]
 * 输出：5
 * 解释：最长的 “山脉” 是 [1,4,7,3,2]，长度为 5。
 * 示例 2：
 * 
 * 输入：[2,2,2]
 * 输出：0
 * 解释：不含 “山脉”。
 */
/**
 * @param {number[]} A
 * @return {number}
 */
var longestMountain = function(A) {
  let n = A.length, ans = 0, left = 0
  while (left + 2 < n) {
    let right = left + 1
    if (A[left] < A[left + 1]) {
      while (right + 1 < n && A[right] < A[right + 1]) {
        right ++
      }
      if (right < n - 1 && A[right] > A[right + 1]) {
        while (right + 1 < n && A[right] > A[right + 1]) {
          right ++
        }
        ans = Math.max(ans, right - left + 1)
      } else right++
    }
    left = right
  }
  return ans
};