/**
 * 2021/05/28 每日一题 477. 汉明距离总和
 * 两个整数的 汉明距离 指的是这两个数字的二进制数对应位不同的数量。
 * 
 * 计算一个数组中，任意两个数之间汉明距离的总和。
 * 
 * 示例:
 * 
 * 输入: 4, 14, 2
 * 
 * 输出: 6
 * 
 * 解释: 在二进制表示中，4表示为0100，14表示为1110，2表示为0010。（这样表示是为了体现后四位之间关系）
 * 所以答案为：
 * ammingDistance(4, 14) + HammingDistance(4, 2) + HammingDistance(14, 2) = 2 + 2 + 2 = 6.
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
 var totalHammingDistance = function(nums) {
  let ans = 0, n = nums.length
  for (let i = 0; i < 30; i++) { // 求二进制的每一位上的不同
    let c = 0
    for (const val of nums) {
      c += (val >> i) & 1 // 取出当前数字的当前二进制位上的1
    }
    ans += c * (n - c) // c * （n - c） 求出当前二进制位上不同的数
  }
  return res
};