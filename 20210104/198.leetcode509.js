/**
 * 2021/01/04 每日一题 509.斐波那契数
 * 斐波那契数，通常用 F(n) 表示，形成的序列称为 斐波那契数列 。该数列由 0 和 1 开始，后面的每一项数字都是前面两项数字的和。也就是：
 * F(0) = 0，F(1) = 1
 * F(n) = F(n - 1) + F(n - 2)，其中 n > 1
 * 给你 n ，请计算 F(n) 。
 * 
 * 示例 1：
 * 
 * 输入：2
 * 输出：1
 * 解释：F(2) = F(1) + F(0) = 1 + 0 = 1
 * 示例 2：
 * 
 * 输入：3
 * 输出：2
 * 解释：F(3) = F(2) + F(1) = 1 + 1 = 2
 * 示例 3：
 * 
 * 输入：4
 * 输出：3
 * 解释：F(4) = F(3) + F(2) = 2 + 1 = 3
 */
/**
 * @param {number} n
 * @return {number}
 */
// 迭代
var fib = function(n) {
  if (n == 0 || n == 1) return n
  return fib(n - 1) + fib(n - 2)
};

// 迭代 + 哈希剪枝
var fib = function(n) {
  let map = new Map()
  const generate = function(N) {
    if (N < 2) return N
    if (map.has(N)) return map.get(N)
    let res = generate(N - 1) + generate(N - 2)
    map.set(N, res)
    return res
  }
  return generate(n)
};

var fib = function(n) {
  if (n < 1) return 0
  const mp = [1, 1]
  for (let i = 2; i < n; i++) {
    mp[i] = mp[i - 1] + mp[i - 2]
  }
  return mp[n - 1]
};