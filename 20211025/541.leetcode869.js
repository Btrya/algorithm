/**
 * 2021/10/28 每日一题 869. 重新排序得到 2 的幂
 * 给定正整数 N ，我们按任何顺序（包括原始顺序）将数字重新排序，注意其前导数字不能为零。
 * 
 * 如果我们可以通过上述方式得到 2 的幂，返回 true；否则，返回 false。
 * 
 * 示例 1：
 * 
 * 输入：1
 * 输出：true
 * 示例 2：
 * 
 * 输入：10
 * 输出：false
 * 示例 3：
 * 
 * 输入：16
 * 输出：true
 * 示例 4：
 * 
 * 输入：24
 * 输出：false
 * 示例 5：
 * 
 * 输入：46
 * 输出：true
 *  
 * 
 * 提示：
 * 
 1 <= N <= 10^9
 */
/**
 * 回溯 + 位运算
 * @param {number} n
 * @return {boolean}
 */
var reorderedPowerOf2 = function(n) {
  const backtrack = (nums, idx, num) => {
    if (idx === nums.length) return isPowerOfTwo(num)
    for (let i = 0; i < nums.length; ++i) {
      // 不能有前导零
      if ((num === 0 && nums[i] === '0') || vis[i] || (i > 0 && !vis[i - 1] && nums[i] === nums[i - 1])) {
        continue
      }
      vis[i] = true
      if (backtrack(nums, idx + 1, num * 10 + nums[i].charCodeAt() - '0'.charCodeAt())) return true
      vis[i] = false
    }
    return false
  }
  const nums = Array.from('' + n)
  nums.sort()
  const vis = new Array(nums.length).fill(false)
  return backtrack(nums, 0, 0)
};

const isPowerOfTwo = (n) => {
  return n > 0 && (n & (n - 1)) == 0
}

/**
 * 哈希 + 预处理
 * @param {number} n
 * @return {boolean}
 */
var reorderedPowerOf2 = function(n) {
  const set = new Set()
  const countDigits = (n) => {
    const cnt = new Array(10).fill(0)
    while (n) {
      cnt[n % 10]++
      n = Math.floor(n / 10)
    }
    return cnt.join('')
  }
  for (let i = 1; i <= 1e9; i <<= 1) {
    set.add(countDigits(i))
  }
  return set.has(countDigits(n))
}