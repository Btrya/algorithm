/**
 * 2020/12/28 每日一题 188. 买卖股票的最佳时机 IV
 * 给定一个整数数组 prices ，它的第 i 个元素 prices[i] 是一支给定的股票在第 i 天的价格。
 * 设计一个算法来计算你所能获取的最大利润。你最多可以完成 k 笔交易。
 * 注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。
 * 
 * 示例 1：
 * 
 * 输入：k = 2, prices = [2,4,1]
 * 输出：2
 * 解释：在第 1 天 (股票价格 = 2) 的时候买入，在第 2 天 (股票价格 = 4) 的时候卖出，这笔交易所能获得利润 = 4-2 = 2 。
 * 示例 2：
 * 
 * 输入：k = 2, prices = [3,2,6,5,0,3]
 * 输出：7
 * 解释：在第 2 天 (股票价格 = 2) 的时候买入，在第 3 天 (股票价格 = 6) 的时候卖出, 这笔交易所能获得利润 = 6-2 = 4 。
 *      随后，在第 5 天 (股票价格 = 0) 的时候买入，在第 6 天 (股票价格 = 3) 的时候卖出, 这笔交易所能获得利润 = 3-0 = 3 。
 */
/**
 * @param {number} k
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(k, prices) {
  if (!prices.length) return 0
  const n = prices.length
  k = Math.min(k, Math.floor(n / 2)) // 当k > n / 2，即等于没有限制交易次数
  const buy = new Array(k + 1).fill(0);
  const sell = new Array(k + 1).fill(0);
  [buy[0], sell[0]] = [-prices[0], 0] // 赋值,第一天假设买入股票
  for (let i = 1; i < k + 1; i++) buy[i] = sell[i] = -Number.MAX_VALUE
  for (let i = 1; i < n; i++) {
    buy[0] = Math.max(buy[0], sell[0] - prices[i])
    for (let j = 1; j < k + 1; j++) {
      buy[j] = Math.max(buy[j], sell[j] - prices[i])
      sell[j] = Math.max(sell[j], buy[j - 1] + prices[i])
    }
  }
  return Math.max(...sell)
};