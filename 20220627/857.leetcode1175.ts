/**
 * 2022/06/30 每日一题 1175. 质数排列
 */
function numPrimeArrangements(n: number): number {
  const MOD = 10 ** 9 + 7
  let count = 0
  // 得到质数的数量
  for (let i = 2; i <= n; ++i) {
    if (isPrime(i)) {
      count++
    }
  }
  let res = 1
  // 得到合数的数量
  let m = n - count
  // 求阶乘
  while (count > 0) {
    res = res % MOD
    res *= count
    count--
  }
  while (m > 0) {
    res = res % MOD
    res *= m
    m--
  }
  return res
}
const isPrime = (n) => {
  if (n === 1) {
    return false
  }
  for (let i = 2; i * i <= n; ++i) {
    if (n % i === 0) {
      return false
    }
  }
  return true
}
