/**
 * 2021/08/23 每日二题 加餐！！！ 67. 二进制求和
 * 给你两个二进制字符串，返回它们的和（用二进制表示）。
 * 
 * 输入为 非空 字符串且只包含数字 1 和 0。
 * 
 * 示例 1:
 * 
 * 输入: a = "11", b = "1"
 * 输出: "100"
 * 示例 2:
 * 
 * 输入: a = "1010", b = "1011"
 * 输出: "10101"
 *  
 * 
 * 提示：
 * 
 * 每个字符串仅由字符 '0' 或 '1' 组成。
 * 1 <= a.length, b.length <= 10^4
 * 字符串如果不是 "0" ，就都不含前导零
 */
/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
 var addBinary = function(a, b) {
  let x = parseInt(a, 2), y = parseInt(b, 2), answer = 0, carry = 0
  while (y) {
    answer = x ^ y
    carry = (x & y) << 1
    x = answer
    y = carry
  }
  return x.toString(2)
};