/**
 * 2020/12/03 每日一题  204. 计数质数
 * 统计所有小于非负整数 n 的质数的数量。
 * 示例 1：
 * 
 * 输入：n = 10
 * 输出：4
 * 解释：小于 10 的质数一共有 4 个, 它们是 2, 3, 5, 7 。
 * 示例 2：
 * 
 * 输入：n = 0
 * 输出：0
 * 示例 3：
 * 
 * 输入：n = 1
 * 输出：0
 */
/**
 * @param {number} n
 * @return {number}
 */
// 埃氏筛 时间复杂度：O(nloglogn)
var countPrimes = function(n) {
  const isPrime = new Array(n).fill(1)
  let ans = 0
  for (let i = 2; i < n; i++ ) {
    if (isPrime[i]) {
      ans += 1
      for (let j = i * i; j < n; j += i) {  // 质数倍数置为0
        isPrime[j] = 0
      }
    }
  }
  return ans
};

// 线性筛
var countPrimes = function(n) {
  const isPrime = new Array(n).fill(1)
  const primes = [] // 多维护一个数组
  for (let i = 2; i < n; i++ ) {
    if (isPrime[i]) {
      primes.push(i)
    }
    for (let j = 0; j < primes.length && i * primes[j] < n; j++) {  // 质数倍数置为0
      isPrime[i * primes[j]] = 0
      if (i * primes[j] == 0) break
    }
  }
  return primes.length
};