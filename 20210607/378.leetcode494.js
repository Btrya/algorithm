/**
 * 2021/06/07 每日一题 494. 目标和
 * 给你一个整数数组 nums 和一个整数 target 。
 * 
 * 向数组中的每个整数前添加 '+' 或 '-' ，然后串联起所有整数，可以构造一个 表达式 ：
 * 
 * 例如，nums = [2, 1] ，可以在 2 之前添加 '+' ，在 1 之前添加 '-' ，然后串联起来得到表达式 "+2-1" 。
 * 返回可以通过上述方法构造的、运算结果等于 target 的不同 表达式 的数目。
 * 示例 1：
 * 
 * 输入：nums = [1,1,1,1,1], target = 3
 * 输出：5
 * 解释：一共有 5 种方法让最终目标和为 3 。
 * -1 + 1 + 1 + 1 + 1 = 3
 * +1 - 1 + 1 + 1 + 1 = 3
 * +1 + 1 - 1 + 1 + 1 = 3
 * +1 + 1 + 1 - 1 + 1 = 3
 * +1 + 1 + 1 + 1 - 1 = 3
 * 示例 2：
 * 
 * 输入：nums = [1], target = 1
 * 输出：1
 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
 var findTargetSumWays = function(nums, target) {
  let sum = 0
  for (const num of nums) {
    sum += num
  }
  const diff = sum - target
  if (diff < 0 || diff % 2 !== 0) return 0 // 当和减去目标值小于0或者不是非负偶数时是没有办法完成的，只能为0
  const neg = Math.floor(diff / 2)
  const dp = new Array(neg + 1).fill(0)
  dp[0] = 1
  for (const num of nums) {
    for (let j = neg; j >= num; j--) {
      dp[j] += dp[j - num]
    }
  }
  return dp[neg]
};