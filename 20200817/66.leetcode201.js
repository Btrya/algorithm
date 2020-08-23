/**
 * 2020/08/23 每日一题 201.数字范围按位与
 * 给定范围 [m, n]，其中 0 <= m <= n <= 2147483647，返回此范围内所有数字的按位与（包含 m, n 两端点）。
 * 示例 1: 
 * 输入: [5,7]
 * 输出: 4
 * 示例 2:
 * 输入: [0,1]
 * 输出: 0
 */
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
// 位移 时间复杂度O(log n)  空间复杂度O(1)
var rangeBitwiseAnd = function(m, n) {
  let shift = 0
  while (m != n) {
    m >>= 1
    n >>= 1
    ++shift
  }
  return m << shift
};

// Brian Kernighan 算法 时间复杂度O(log n)  空间复杂度O(1)
var rangeBitwiseAnd = function(m, n) {
  while(m < n) {
    n = n & (n -1)
  }
  return n
};