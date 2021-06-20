/**
 * 单串-常数个小规模子问题
 */
/**
 * leetcode 70.爬楼梯
 * 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
 * 
 * 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
 * 
 * 注意：给定 n 是一个正整数。
 * 
 * 示例 1：
 * 
 * 输入： 2
 * 输出： 2
 * 解释： 有两种方法可以爬到楼顶。
 * 1.  1 阶 + 1 阶
 * 2.  2 阶
 * 示例 2：
 * 
 * 输入： 3
 * 输出： 3
 * 解释： 有三种方法可以爬到楼顶。
 * 1.  1 阶 + 1 阶 + 1 阶
 * 2.  1 阶 + 2 阶
 * 3.  2 阶 + 1 阶
 */
/**
 * 滚动数组，f(0) = 1, f(1) = 1
 * 转移方程 f(n) = f(n - 1) + f(n - 2)
 * @param {number} n
 * @return {number}
 */
 var climbStairs = function(n) {
  let p = 0, q = 0, r = 1
  for (let i = 0; i < n; i++) {
    p = q
    q = r
    r = p + q
  }
  return r 
};
// 普通动态规划
var climbStairs = function(n) {
  let dp = new Array(n).fill(0)
  dp[0] = 1
  dp[1] = 1
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]
  }
  return dp[n]
};

/**
 * leetcode 801.使序列递增的最小交换次数
 * 我们有两个长度相等且不为空的整型数组 A 和 B 。
 * 
 * 我们可以交换 A[i] 和 B[i] 的元素。注意这两个元素在各自的序列中应该处于相同的位置。
 * 
 * 在交换过一些元素之后，数组 A 和 B 都应该是严格递增的（数组严格递增的条件仅为A[0] < A[1] < A[2] < ... < A[A.length - 1]）。
 * 
 * 给定数组 A 和 B ，请返回使得两个数组均保持严格递增状态的最小交换次数。假设给定的输入总是有效的。
 * 
 * 示例:
 * 输入: A = [1,3,5,4], B = [1,2,3,7]
 * 输出: 1
 * 解释: 
 * 交换 A[3] 和 B[3] 后，两个数组如下:
 * A = [1, 3, 5, 7] ， B = [1, 2, 3, 4]
 * 两个数组均为严格递增的。
 * 注意:
 * 
 * A, B 两个数组的长度总是相等的，且长度的范围为 [1, 1000]。
 * A[i], B[i] 均为 [0, 2000]区间内的整数。
 */
/**
 * 状态转移方程：
 * n1 表示数组 A 和 B 满足前 i - 1 个元素分别严格递增，并且 A[i - 1] 和 B[i - 1] 未被交换的最小交换次数
 * s1 表示 A[i - 1] 和 B[i - 1] 被交换的最小交换次数
 * a1 = A[i - 1], b1 = B[i - 1] , a1 < a2 && b1 < b2
 * n2 = min(n2, n1)
 * s2 = min(s2, s1 + 1)
 * 表示 a1 和 b1 未被交换和被交换的情况
 * a1 < b2 && b1 < a2时必须交换
 * n2 = min(n2, s1)
 * s2 = min(s2, n1 + 1)
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
 var minSwap = function(nums1, nums2) {
  // n: natural, s: swapped
  let n1 = 0, s1 = 1
  for (let i = 1; i < nums1.length; i++) {
    let n2 = Number.MAX_SAFE_INTEGER, s2 = Number.MAX_SAFE_INTEGER
    if (nums1[i - 1] < nums1[i] && nums2[i - 1] < nums2[i]) {
      n2 = Math.min(n2, n1)
      s2 = Math.min(s2, s1 + 1)
    }
    if (nums1[i - 1] < nums2[i] && nums2[i - 1] < nums1[i]) {
      n2 = Math.min(n2, s1)
      s2 = Math.min(s2, n1 + 1)
    }
    n1 = n2
    s1 = s2
  }
  return Math.min(n1, s1)
};