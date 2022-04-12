/**
 * 2022/04/12 动规日题
 * 377. 组合总和 Ⅳ
 * 给你一个由 不同 整数组成的数组 nums ，和一个目标整数 target 。请你从 nums 中找出并返回总和为 target 的元素组合的个数。
 * 
 * 题目数据保证答案符合 32 位整数范围。
 * 
 * 示例 1：
 * 
 * 输入：nums = [1,2,3], target = 4
 * 输出：7
 * 解释：
 * 所有可能的组合为：
 * (1, 1, 1, 1)
 * (1, 1, 2)
 * (1, 2, 1)
 * (1, 3)
 * (2, 1, 1)
 * (2, 2)
 * (3, 1)
 * 请注意，顺序不同的序列被视作不同的组合。
 * 示例 2：
 * 
 * 输入：nums = [9], target = 3
 * 输出：0
 *  
 * 
 * 提示：
 * 
 * 1 <= nums.length <= 200
 * 1 <= nums[i] <= 1000
 * nums 中的所有元素 互不相同
 * 1 <= target <= 1000
 *  
 * 
 * 进阶：如果给定的数组中含有负数会发生什么？问题会产生何种变化？如果允许负数出现，需要向题目中添加哪些限制条件？
 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
 var combinationSum4 = function(nums, target) {
  const dp = new Array(target + 1).fill(0)
  dp[0] = 1
  for (let i = 0; i <= target; ++i) {
    for (const num of nums) {
      if (i >= num) dp[i] += dp[i - num]
    }
  }
  return dp[target]
};

/**
 * 343. 整数拆分
 * 给定一个正整数 n ，将其拆分为 k 个 正整数 的和（ k >= 2 ），并使这些整数的乘积最大化。
 * 
 * 返回 你可以获得的最大乘积 。
 * 
 * 示例 1:
 * 
 * 输入: n = 2
 * 输出: 1
 * 解释: 2 = 1 + 1, 1 × 1 = 1。
 * 示例 2:
 * 
 * 输入: n = 10
 * 输出: 36
 * 解释: 10 = 3 + 3 + 4, 3 × 3 × 4 = 36。
 *  
 * 
 * 提示:
 * 
 * 2 <= n <= 58
 */
/**
 * @param {number} n
 * @return {number}
 */
 var integerBreak = function(n) {
  if (n < 4) return n - 1
  const dp = new Array(n + 1).fill(0)
  dp[2] = 1
  for(let i = 3; i <= n; ++i) {
    dp[i] = Math.max(Math.max(2 * (i - 2), 2 * dp[i - 2]), Math.max(3 * (i - 3), 3 * dp[i - 3]))
  }
  return dp[n]
};

/**
 * 279. 完全平方数
 * 给你一个整数 n ，返回 和为 n 的完全平方数的最少数量 。
 * 
 * 完全平方数 是一个整数，其值等于另一个整数的平方；换句话说，其值等于一个整数自乘的积。例如，1、4、9 和 16 都是完全平方数，而 3 和 11 不是。
 * 
 * 示例 1：
 * 
 * 输入：n = 12
 * 输出：3 
 * 解释：12 = 4 + 4 + 4
 * 示例 2：
 * 
 * 输入：n = 13
 * 输出：2
 * 解释：13 = 4 + 9
 *  
 * 提示：
 * 
 * 1 <= n <= 104
 */
/**
 * @param {number} n
 * @return {number}
 */
 var numSquares = function(n) {
  const dp = new Array(n + 1).fill(0)
  for (let i = 1; i <= n; ++i) {
    let min = Number.MAX_SAFE_INTEGER
    for (let j = 1; j * j <= i; ++j) {
      min = Math.min(min, dp[i - j * j])
    }
    dp[i] = min + 1
  }
  return dp[n]
};