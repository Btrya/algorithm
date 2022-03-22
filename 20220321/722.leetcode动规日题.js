/**
 * 2022/03/23 动态规划日题
 * 509. 斐波那契数
 * 斐波那契数 （通常用 F(n) 表示）形成的序列称为 斐波那契数列 。该数列由 0 和 1 开始，后面的每一项数字都是前面两项数字的和。也就是：
 * 
 * F(0) = 0，F(1) = 1
 * F(n) = F(n - 1) + F(n - 2)，其中 n > 1
 * 给定 n ，请计算 F(n) 。
 * 
 *  
 * 
 * 示例 1：
 * 
 * 输入：n = 2
 * 输出：1
 * 解释：F(2) = F(1) + F(0) = 1 + 0 = 1
 * 示例 2：
 * 
 * 输入：n = 3
 * 输出：2
 * 解释：F(3) = F(2) + F(1) = 1 + 1 = 2
 * 示例 3：
 * 
 * 输入：n = 4
 * 输出：3
 * 解释：F(4) = F(3) + F(2) = 2 + 1 = 3
 *  
 * 
 * 提示：
 * 
 * 0 <= n <= 30
 */
/**
 * @param {number} n
 * @return {number}
 */
 var fib = function(n) {
  if (n < 2) return n
  let dp = new Array(n).fill(0)
  dp[0] = 0
  dp[1] = 1
  for (let i = 2; i <= n; ++i) {
    dp[i] = dp[i - 1] + dp[i - 2]
  }
  return dp[n]
};

/**
 * 1137. 第 N 个泰波那契数
 * 泰波那契序列 Tn 定义如下： 
 * 
 * T0 = 0, T1 = 1, T2 = 1, 且在 n >= 0 的条件下 Tn+3 = Tn + Tn+1 + Tn+2
 * 
 * 给你整数 n，请返回第 n 个泰波那契数 Tn 的值。
 * 
 * 示例 1：
 * 
 * 输入：n = 4
 * 输出：4
 * 解释：
 * T_3 = 0 + 1 + 1 = 2
 * T_4 = 1 + 1 + 2 = 4
 * 示例 2：
 * 
 * 输入：n = 25
 * 输出：1389537
 *  
 * 
 * 提示：
 * 
 * 0 <= n <= 37
 * 答案保证是一个 32 位整数，即 answer <= 2^31 - 1。
 */
/**
 * @param {number} n
 * @return {number}
 */
 var tribonacci = function(n) {
  let dp = new Array(n).fill(0)
  dp[0] = 0
  dp[1] = 1
  dp[2] = 1
  for (let i = 3; i <= n; ++i) {
    dp[i] = dp[i - 1] + dp[i - 2] + dp[i - 3]
  }
  return dp[n]
};