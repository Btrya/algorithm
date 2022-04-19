/**
 * 2022/04/19 编程入门计划
 * 1822. 数组元素积的符号
 * 已知函数 signFunc(x) 将会根据 x 的正负返回特定值：
 * 
 * 如果 x 是正数，返回 1 。
 * 如果 x 是负数，返回 -1 。
 * 如果 x 是等于 0 ，返回 0 。
 * 给你一个整数数组 nums 。令 product 为数组 nums 中所有元素值的乘积。
 * 
 * 返回 signFunc(product) 。
 * 
 * 示例 1：
 * 
 * 输入：nums = [-1,-2,-3,-4,3,2,1]
 * 输出：1
 * 解释：数组中所有值的乘积是 144 ，且 signFunc(144) = 1
 * 示例 2：
 * 
 * 输入：nums = [1,5,0,2,-3]
 * 输出：0
 * 解释：数组中所有值的乘积是 0 ，且 signFunc(0) = 0
 * 示例 3：
 * 
 * 输入：nums = [-1,1,-1,1,-1]
 * 输出：-1
 * 解释：数组中所有值的乘积是 -1 ，且 signFunc(-1) = -1
 *  
 * 
 * 提示：
 * 
 * 1 <= nums.length <= 1000
 * -100 <= nums[i] <= 100
 */
 function arraySign(nums: number[]): number {
  const signFunc = (x) => {
    if (x === 0) return 0
    return x > 0 ? 1 : -1
  }
  return signFunc(nums.reduce((total, item) => {
    return total *= signFunc(item)
  }, 1))
};

/**
 * 1502. 判断能否形成等差数列 
 * 给你一个数字数组 arr 。
 * 
 * 如果一个数列中，任意相邻两项的差总等于同一个常数，那么这个数列就称为 等差数列 。
 * 
 * 如果可以重新排列数组形成等差数列，请返回 true ；否则，返回 false 。
 * 
 * 示例 1：
 * 
 * 输入：arr = [3,5,1]
 * 输出：true
 * 解释：对数组重新排序得到 [1,3,5] 或者 [5,3,1] ，任意相邻两项的差分别为 2 或 -2 ，可以形成等差数列。
 * 示例 2：
 * 
 * 输入：arr = [1,2,4]
 * 输出：false
 * 解释：无法通过重新排序得到等差数列。
 *  
 * 
 * 提示：
 * 
 * 2 <= arr.length <= 1000
 * -10^6 <= arr[i] <= 10^6
 */
 function canMakeArithmeticProgression(arr: number[]): boolean {
  arr.sort((a, b) => b - a)
  const diff = (arr[0] - arr[1])
  for (let i = 1; i < arr.length; ++i) {
    if (arr[i] + diff !== arr[i - 1]) return false
  }
  return true
};

/**
 * 202. 快乐数
 * 编写一个算法来判断一个数 n 是不是快乐数。
 * 
 * 「快乐数」 定义为：
 * 
 * 对于一个正整数，每一次将该数替换为它每个位置上的数字的平方和。
 * 然后重复这个过程直到这个数变为 1，也可能是 无限循环 但始终变不到 1。
 * 如果这个过程 结果为 1，那么这个数就是快乐数。
 * 如果 n 是 快乐数 就返回 true ；不是，则返回 false 。
 *  
 * 示例 1：
 * 
 * 输入：n = 19
 * 输出：true
 * 解释：
 * 12 + 92 = 82
 * 82 + 22 = 68
 * 62 + 82 = 100
 * 12 + 02 + 02 = 1
 * 示例 2：
 * 
 * 输入：n = 2
 * 输出：false
 *  
 * 
 * 提示：
 * 
 * 1 <= n <= 231 - 1
 * 通过
 */
 function isHappy(n: number): boolean {
  const getNext = (x) => {
    let res = 0
    while (x > 0) {
      const d = x % 10
      x = Math.floor(x / 10)
      res += d * d
    }
    return res
  }
  let slow = n, fast = getNext(n)
  while (fast !== 1 && slow !== fast) {
    slow = getNext(slow)
    fast = getNext(getNext(fast))
  }
  return fast === 1
};

/**
 * 1790. 仅执行一次字符串交换能否使两个字符串相等
 * 给你长度相等的两个字符串 s1 和 s2 。一次 字符串交换 操作的步骤如下：选出某个字符串中的两个下标（不必不同），并交换这两个下标所对应的字符。
 * 
 * 如果对 其中一个字符串 执行 最多一次字符串交换 就可以使两个字符串相等，返回 true ；否则，返回 false 。
 * 
 * 示例 1：
 * 
 * 输入：s1 = "bank", s2 = "kanb"
 * 输出：true
 * 解释：例如，交换 s2 中的第一个和最后一个字符可以得到 "bank"
 * 示例 2：
 * 
 * 输入：s1 = "attack", s2 = "defend"
 * 输出：false
 * 解释：一次字符串交换无法使两个字符串相等
 * 示例 3：
 * 
 * 输入：s1 = "kelb", s2 = "kelb"
 * 输出：true
 * 解释：两个字符串已经相等，所以不需要进行字符串交换
 * 示例 4：
 * 
 * 输入：s1 = "abcd", s2 = "dcba"
 * 输出：false
 *  
 * 
 * 提示：
 * 
 * 1 <= s1.length, s2.length <= 100
 * s1.length == s2.length
 * s1 和 s2 仅由小写英文字母组成
 */
 function areAlmostEqual(s1: string, s2: string): boolean {
  if (s1 === s2) return true
  let s1Arr = [], s2Arr = []
  for (let i = 0; i < s1.length; ++i) {
    if (s1[i] !== s2[i]) {
      s1Arr.push(s1[i])
      s2Arr.unshift(s2[i])
    }
  }
  if (s1Arr.length > 2) return false
  return s1Arr.join('') === s2Arr.join('')
};