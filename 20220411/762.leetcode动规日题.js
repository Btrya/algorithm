/**
 * 2022/04/11 动规日题
 * 322. 零钱兑换
 * 给你一个整数数组 coins ，表示不同面额的硬币；以及一个整数 amount ，表示总金额。
 * 
 * 计算并返回可以凑成总金额所需的 最少的硬币个数 。如果没有任何一种硬币组合能组成总金额，返回 -1 。
 * 
 * 你可以认为每种硬币的数量是无限的。
 * 
 *  
 * 
 * 示例 1：
 * 
 * 输入：coins = [1, 2, 5], amount = 11
 * 输出：3 
 * 解释：11 = 5 + 5 + 1
 * 示例 2：
 * 
 * 输入：coins = [2], amount = 3
 * 输出：-1
 * 示例 3：
 * 
 * 输入：coins = [1], amount = 0
 * 输出：0
 *  
 * 
 * 提示：
 * 
 * 1 <= coins.length <= 12
 * 1 <= coins[i] <= 231 - 1
 * 0 <= amount <= 104
 */
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
 var coinChange = function(coins, amount) {
  const dp = new Array(amount + 1).fill(amount + 1)
  dp[0] = 0
  coins.sort((a, b) => a - b)
  for (let i = 1; i <= amount; ++i) {
    for (let j = 0; j < coins.length; ++j) {
      if (coins[j] > i) break
      dp[i] = Math.min(dp[i], dp[i - coins[j]] + 1)
    }
  }
  return dp[amount] > amount ? -1 : dp[amount]
};

/**
 * 518. 零钱兑换 II
 * 给你一个整数数组 coins 表示不同面额的硬币，另给一个整数 amount 表示总金额。
 * 
 * 请你计算并返回可以凑成总金额的硬币组合数。如果任何硬币组合都无法凑出总金额，返回 0 。
 * 
 * 假设每一种面额的硬币有无限个。 
 * 
 * 题目数据保证结果符合 32 位带符号整数。
 * 
 * 示例 1：
 * 
 * 输入：amount = 5, coins = [1, 2, 5]
 * 输出：4
 * 解释：有四种方式可以凑成总金额：
 * 5=5
 * 5=2+2+1
 * 5=2+1+1+1
 * 5=1+1+1+1+1
 * 示例 2：
 * 
 * 输入：amount = 3, coins = [2]
 * 输出：0
 * 解释：只用面额 2 的硬币不能凑成总金额 3 。
 * 示例 3：
 * 
 * 输入：amount = 10, coins = [10] 
 * 输出：1
 *  
 * 
 * 提示：
 * 
 * 1 <= coins.length <= 300
 * 1 <= coins[i] <= 5000
 * coins 中的所有值 互不相同
 * 0 <= amount <= 5000
 */
/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
 var change = function(amount, coins) {
  const dp = new Array(amount + 1).fill(0)
  dp[0] = 1
  for (let i = 0; i < coins.length; ++i) {
    const coin = coins[i]
    for (let j = coin; j <= amount; ++j) {
      dp[j] += dp[j - coin]
    }
  }
  return dp[amount]
};