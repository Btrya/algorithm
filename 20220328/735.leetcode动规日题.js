/**
 * 2022/03/29 动规日题
 * 1014. 最佳观光组合
 * 给你一个正整数数组 values，其中 values[i] 表示第 i 个观光景点的评分，并且两个景点 i 和 j 之间的 距离 为 j - i。
 * 
 * 一对景点（i < j）组成的观光组合的得分为 values[i] + values[j] + i - j ，也就是景点的评分之和 减去 它们两者之间的距离。
 * 
 * 返回一对观光景点能取得的最高分。
 * 
 * 示例 1：
 * 
 * 输入：values = [8,1,5,2,6]
 * 输出：11
 * 解释：i = 0, j = 2, values[i] + values[j] + i - j = 8 + 5 + 0 - 2 = 11
 * 示例 2：
 * 
 * 输入：values = [1,2]
 * 输出：2
 *  
 * 
 * 提示：
 * 
 * 2 <= values.length <= 5 * 104
 * 1 <= values[i] <= 1000
 */
/**
 * @param {number[]} values
 * @return {number}
 */
 var maxScoreSightseeingPair = function(values) {
  let ans = 0, mx = values[0] + 0
  for (let i = 1; i < values.length; ++i) {
    ans = Math.max(mx + values[i] - i, ans)
    mx = Math.max(values[i] + i, mx)
  }
  return ans
};

/**
 * 121. 买卖股票的最佳时机
 * 给定一个数组 prices ，它的第 i 个元素 prices[i] 表示一支给定股票第 i 天的价格。
 * 
 * 你只能选择 某一天 买入这只股票，并选择在 未来的某一个不同的日子 卖出该股票。设计一个算法来计算你所能获取的最大利润。
 * 
 * 返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回 0 。
 * 
 *  
 * 
 * 示例 1：
 * 
 * 输入：[7,1,5,3,6,4]
 * 输出：5
 * 解释：在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
 *      注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格；同时，你不能在买入前卖出股票。
 * 示例 2：
 * 
 * 输入：prices = [7,6,4,3,1]
 * 输出：0
 * 解释：在这种情况下, 没有交易完成, 所以最大利润为 0。
 *  
 * 
 * 提示：
 * 
 * 1 <= prices.length <= 105
 * 0 <= prices[i] <= 104
 */
/**
 * @param {number[]} prices
 * @return {number}
 */
 var maxProfit = function(prices) {
  const n = prices.length
  if (n < 2) return 0
  let min = prices[0], res = 0
  for (let i = 1; i < n; ++i) {
    min = Math.min(min, prices[i])
    res = Math.max(res, prices[i] - min)
  }
  return res
};

/**
 * 122. 买卖股票的最佳时机 II
 * 给定一个数组 prices ，其中 prices[i] 表示股票第 i 天的价格。
 * 
 * 在每一天，你可能会决定购买和/或出售股票。你在任何时候 最多 只能持有 一股 股票。你也可以购买它，然后在 同一天 出售。
 * 返回 你能获得的 最大 利润 。
 * 
 *  
 * 
 * 示例 1:
 * 
 * 输入: prices = [7,1,5,3,6,4]
 * 输出: 7
 * 解释: 在第 2 天（股票价格 = 1）的时候买入，在第 3 天（股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。
 *      随后，在第 4 天（股票价格 = 3）的时候买入，在第 5 天（股票价格 = 6）的时候卖出, 这笔交易所能获得利润 = 6-3 = 3 。
 * 示例 2:
 * 
 * 输入: prices = [1,2,3,4,5]
 * 输出: 4
 * 解释: 在第 1 天（股票价格 = 1）的时候买入，在第 5 天 （股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。
 *      注意你不能在第 1 天和第 2 天接连购买股票，之后再将它们卖出。因为这样属于同时参与了多笔交易，你必须在再次购买前出售掉之前的股票。
 * 示例 3:
 * 
 * 输入: prices = [7,6,4,3,1]
 * 输出: 0
 * 解释: 在这种情况下, 没有交易完成, 所以最大利润为 0。
 *  
 * 
 * 提示：
 * 
 * 1 <= prices.length <= 3 * 104
 * 0 <= prices[i] <= 104
 */
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  const n = prices.length
  if (n < 2) return 0
  let min = prices[0], sum = 0
  for (let i = 1; i < n; ++i) {
    // 不管股票升值还是降低价值 都直接收割
    sum += Math.max(0, prices[i] - min)
    min = prices[i]
  }
  return sum
};