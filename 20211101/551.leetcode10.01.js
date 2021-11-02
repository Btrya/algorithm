/**
 * 2021/11/02 每日第二题 面试题 10.01. 合并排序的数组
 * 给定两个排序后的数组 A 和 B，其中 A 的末端有足够的缓冲空间容纳 B。 编写一个方法，将 B 合并入 A 并排序。
 * 
 * 初始化 A 和 B 的元素数量分别为 m 和 n。
 * 
 * 示例:
 * 
 * 输入:
 * A = [1,2,3,0,0,0], m = 3
 * B = [2,5,6],       n = 3
 * 
 * 输出: [1,2,2,3,5,6]
 * 说明:
 * 
 * A.length == n + m
 */
/**
 * @param {number[]} A
 * @param {number} m
 * @param {number[]} B
 * @param {number} n
 * @return {void} Do not return anything, modify A in-place instead.
 */
 var merge = function(A, m, B, n) {
  let pa = m - 1, pb = n - 1
  let tail = m + n - 1
  let cur
  while (pa >= 0 || pb >= 0) {
    if (pa == -1) cur = B[pb--]
    else if (pb == -1) cur = A[pa--]
    else if (A[pa] > B[pb]) cur = A[pa--]
    else cur = B[pb--]
    A[tail--] = cur
  }
};