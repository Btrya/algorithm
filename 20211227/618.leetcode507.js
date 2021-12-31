/**
 * 2021/12/31 每日一题 507. 完美数
 * 对于一个 正整数，如果它和除了它自身以外的所有 正因子 之和相等，我们称它为 「完美数」。
 * 
 * 给定一个 整数 n， 如果是完美数，返回 true，否则返回 false
 * 
 * 示例 1：
 * 
 * 输入：num = 28
 * 输出：true
 * 解释：28 = 1 + 2 + 4 + 7 + 14
 * 1, 2, 4, 7, 和 14 是 28 的所有正因子。
 * 示例 2：
 * 
 * 输入：num = 6
 * 输出：true
 * 示例 3：
 * 
 * 输入：num = 496
 * 输出：true
 * 示例 4：
 * 
 * 输入：num = 8128
 * 输出：true
 * 示例 5：
 * 
 * 输入：num = 2
 * 输出：false
 *  
 * 
 * 提示：
 * 
 * 1 <= num <= 108
 */
/**
 * @param {number} num
 * @return {boolean}
 */
 var checkPerfectNumber = function(num) {
  // 边界条件，num得是偶数
  if (num % 2 !== 0) return false
  // 求出当前数字的最大正因数
  let maxChild = num / 2
  let ans = maxChild + 3
  for (let i = 3; i < maxChild; i++) {
    if (num % i == 0) ans += i
  }
  return ans == num
};