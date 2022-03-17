/**
 * 2022/03/17 奇安信算法题
 * 抽检货物问题
 * 数组的每一项表示抽检所需花费，只能挑选上一次抽检货物后面的第一件或者第二件货物进行挑选
 * 写一个函数求出最小花费时间
 */
function spendLess(arr) {
  let n = arr.length
  if (n == 1) return arr[0] // 剪枝
  if (n == 2) return Math.min(arr[0], arr[1])
  let dp = new Array(n).fill(0)
  dp[0] = arr[0]
  dp[1] = arr[1]
  for (let i = 2; i < n; ++i) {
    dp[i] = Math.min(dp[i - 2], dp[i - 1]) + arr[i]
  }
  return Math.min(dp[n - 1], dp[n - 2])
}

console.log(spendLess([4, 9, 24])) // 9
console.log(spendLess([2, 100, 2, 3, 3, 90, 3, 2, 80, 2])) // 2+2+3+3+2+2 = 14