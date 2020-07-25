/**
 * 每日一题 410. 分割数组的最大值
 * 给定一个非负整数数组和一个整数 m，你需要将这个数组分成 m 个非空的连续子数组。设计一个算法使得这 m 个子数组各自和的最大值最小。
 * 注意:
 * 数组长度 n 满足以下条件:
 * 1 ≤ n ≤ 1000
 * 1 ≤ m ≤ min(50, n)
 * 示例:
 * 输入:
 * nums = [7,2,5,10,8]
 * m = 2
 * 输出:
 * 18
 * 解释:
 * 一共有四种方法将nums分割为2个子数组。
 * 其中最好的方式是将其分为[7,2,5] 和 [10,8]，
 * 因为此时这两个子数组各自的和的最大值为18，在所有情况中最小。
 */

 /**
 * @param {number[]} nums
 * @param {number} m
 * @return {number}
 */
// 动态规划 时间复杂度O(n^2 * m)  空间复杂度O(n * m)
var splitArray = function(nums, m) {
  let n = nums.length
  let f = Array.from(Array(n + 1), () => Array(m + 1).fill(Number.MAX_VALUE))
  let sub = new Array(n + 1).fill(0)
  for (let i = 0; i < n; i++) {
    sub[i + 1] = sub[i] + nums[i]
  }
  f[0][0] = 0
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= Math.min(i, m); j++) {
      for (let k = 0; k < i; k++) {
        f[i][j] = Math.min(f[i][j], Math.max(f[k][j - 1], sub[i] - sub[k]))
      }
    }
  }
  return f[n][m]
};

// 二分查找 + 贪心
var splitArray = function(nums, m) {
  let left = 0, right = 0
  for (let i = 0; i < nums.length; i++) {
    right += nums[i]
    if (left < nums[i]) {
      left = nums[i]
    }
  }
  const check = function(x, m) {
    let sum = 0, cnt = 1
    for (let i = 0; i < nums.length; i++) {
      if (sum + nums[i] > x) {
        cnt ++
        sum = nums[i]
      } else {
        sum += nums[i]
      }
    }
    return cnt <= m
  }
  while (left < right) {
    let mid = Math.floor((right - left) / 2) + left
    if (check(mid, m)) {
      right = mid
    } else {
      left = mid + 1
    }
  }
  return left
};