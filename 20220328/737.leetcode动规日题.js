/**
 * 2022/03/30 动规日题 
 * 309. 最佳买卖股票时机含冷冻期
 * 给定一个整数数组prices，其中第  prices[i] 表示第 i 天的股票价格 。​
 * 
 * 设计一个算法计算出最大利润。在满足以下约束条件下，你可以尽可能地完成更多的交易（多次买卖一支股票）:
 * 
 * 卖出股票后，你无法在第二天买入股票 (即冷冻期为 1 天)。
 * 注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。
 * 
 *  
 * 
 * 示例 1:
 * 
 * 输入: prices = [1,2,3,0,2]
 * 输出: 3 
 * 解释: 对应的交易状态为: [买入, 卖出, 冷冻期, 买入, 卖出]
 * 示例 2:
 * 
 * 输入: prices = [1]
 * 输出: 0
 *  
 * 
 * 提示：
 * 
 * 1 <= prices.length <= 5000
 * 0 <= prices[i] <= 1000
 */
/**
 * @param {number[]} prices
 * @return {number}
 */
 var maxProfit = function(prices) {
  let n = prices.length
  let buy = -prices[0]
  let sell = 0
  let freeze = 0
  for (let i = 0; i < n; ++i) {
    const tmp = sell
    sell = Math.max(sell, buy + prices[i])
    buy = Math.max(buy, freeze - prices[i])
    freeze = tmp
  }
  return sell
};

/**
 * 714. 买卖股票的最佳时机含手续费
 * 给定一个整数数组 prices，其中 prices[i]表示第 i 天的股票价格 ；整数 fee 代表了交易股票的手续费用。
 * 
 * 你可以无限次地完成交易，但是你每笔交易都需要付手续费。如果你已经购买了一个股票，在卖出它之前你就不能再继续购买股票了。
 * 
 * 返回获得利润的最大值。
 * 
 * 注意：这里的一笔交易指买入持有并卖出股票的整个过程，每笔交易你只需要为支付一次手续费。
 * 
 *  
 * 
 * 示例 1：
 * 
 * 输入：prices = [1, 3, 2, 8, 4, 9], fee = 2
 * 输出：8
 * 解释：能够达到的最大利润:  
 * 在此处买入 prices[0] = 1
 * 在此处卖出 prices[3] = 8
 * 在此处买入 prices[4] = 4
 * 在此处卖出 prices[5] = 9
 * 总利润: ((8 - 1) - 2) + ((9 - 4) - 2) = 8
 * 示例 2：
 * 
 * 输入：prices = [1,3,7,5,10,3], fee = 3
 * 输出：6
 *  
 * 
 * 提示：
 * 
 * 1 <= prices.length <= 5 * 104
 * 1 <= prices[i] < 5 * 104
 * 0 <= fee < 5 * 104
 */
/**
 * @param {number[]} prices
 * @param {number} fee
 * @return {number}
 */
 var maxProfit = function(prices, fee) {
  let n = prices.length
  let buy = -prices[0] - fee
  let sell = 0
  for (let i = 1; i < n; ++i) {
    sell = Math.max(sell, buy + prices[i])
    buy = Math.max(buy, sell - prices[i] - fee)
  }
  return sell
};