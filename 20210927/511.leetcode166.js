/**
 * 2021/10/03 每日一题 166. 分数到小数
 * 给定两个整数，分别表示分数的分子 numerator 和分母 denominator，以 字符串形式返回小数 。
 * 
 * 如果小数部分为循环小数，则将循环的部分括在括号内。
 * 
 * 如果存在多个答案，只需返回 任意一个 。
 * 
 * 对于所有给定的输入，保证 答案字符串的长度小于 104 。
 * 示例 1：
 * 
 * 输入：numerator = 1, denominator = 2
 * 输出："0.5"
 * 示例 2：
 * 
 * 输入：numerator = 2, denominator = 1
 * 输出："2"
 * 示例 3：
 * 
 * 输入：numerator = 2, denominator = 3
 * 输出："0.(6)"
 * 示例 4：
 * 
 * 输入：numerator = 4, denominator = 333
 * 输出："0.(012)"
 * 示例 5：
 * 
 * 输入：numerator = 1, denominator = 5
 * 输出："0.2"
 *  
 * 
 * 提示：
 * 
 * -231 <= numerator, denominator <= 231 - 1
 * denominator != 0
 */
/**
 * @param {number} numerator
 * @param {number} denominator
 * @return {string}
 */
 var fractionToDecimal = function(numerator, denominator) {
  var r = n = Math.abs(numerator), d = Math.abs(denominator), i = 0, h = {}, qs = ''
  while (r %= d) {
      if (h[r] !== undefined) break
      h[r] = i++, qs += (r *= 10) / d | 0
  }
  return qs.length ? ((numerator ^ denominator) >> 31 && '-') + (n / d | 0) + '.' + qs.slice(0, h[r])
       + (h[r] !== undefined ? '(' + qs.slice(h[r], i) + ')' : '') : numerator / denominator + ''
};