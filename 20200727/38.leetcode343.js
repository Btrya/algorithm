/**
 * 2020/07/30 每日一题 343.整数拆分
 * 给定一个正整数 n，将其拆分为至少两个正整数的和，并使这些整数的乘积最大化。 返回你可以获得的最大乘积。
 * 示例 1:
 * 
 * 输入: 2
 * 输出: 1
 * 解释: 2 = 1 + 1, 1 × 1 = 1。
 * 示例 2:
 * 
 * 输入: 10
 * 输出: 36
 * 解释: 10 = 3 + 3 + 4, 3 × 3 × 4 = 36。
 */

/**
 * @param {number} n
 * @return {number}
 */
// 动态规划 时间复杂度O(n^2) 空间复杂度O(n)
var integerBreak = function(n) {
    let dp = new Array(n + 1).fill(0)
    for (let i = 2; i <= n; i++) {
        let curMax = 0
        for (let j = 1; j < i; j++) {
            curMax = Math.max(curMax, Math.max(j * (i - j), j * dp[i - j]))
        }
        dp[i] = curMax
    }
    return dp[n]
};

// 动态规划优化 时间复杂度O(n) 空间复杂度O(n)
var integerBreak = function(n) {
    if (n < 4) return n - 1
    let dp = new Array(n + 1).fill(0)
    dp[2] = 1
    for (let i = 3; i <= n; i++) {
        dp[i] = Math.max(Math.max(2 * (i - 2), 2 * dp[i - 2]), Math.max(3 * (i - 3), 3 * dp[i - 3]))
    }
    return dp[n]
};

// 数学 时间复杂度O(1) 空间复杂度O(1)
var integerBreak = function(n) {
    if (n <= 3) return n - 1
    let quotient = Math.floor(n / 3),
        remainder = n % 3
    if (remainder == 0) return 3 ** quotient
    else if (remainder == 1) return 3 ** (quotient - 1) * 4
    else return 3 ** quotient * 2
};