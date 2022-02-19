/**
 * 2022/02/19 双周赛 第72场
 * 5996. 统计数组中相等且可以被整除的数对
 * 给你一个下标从 0 开始长度为 n 的整数数组 nums 和一个整数 k ，请你返回满足 0 <= i < j < n ，nums[i] == nums[j] 且 (i * j) 能被 k 整除的数对 (i, j) 的 数目 。
 * 
 * 示例 1：
 * 
 * 输入：nums = [3,1,2,2,2,1,3], k = 2
 * 输出：4
 * 解释：
 * 总共有 4 对数符合所有要求：
 * - nums[0] == nums[6] 且 0 * 6 == 0 ，能被 2 整除。
 * - nums[2] == nums[3] 且 2 * 3 == 6 ，能被 2 整除。
 * - nums[2] == nums[4] 且 2 * 4 == 8 ，能被 2 整除。
 * - nums[3] == nums[4] 且 3 * 4 == 12 ，能被 2 整除。
 * 示例 2：
 * 
 * 输入：nums = [1,2,3,4], k = 1
 * 输出：0
 * 解释：由于数组中没有重复数值，所以没有数对 (i,j) 符合所有要求。
 *  
 * 
 * 提示：
 * 
 * 1 <= nums.length <= 100
 * 1 <= nums[i], k <= 100
 *//**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var countPairs = function(nums, k) {
  let numObj = {}
  let count = 0
  for (let i = 0; i < nums.length; ++i) {
    if (!numObj[nums[i]]) numObj[nums[i]] = [i]
    else numObj[nums[i]].push(i)
  }
  for (let i in numObj) {
    if (numObj[i].length >= 2) {
      count += calcArr(numObj[i], k)
    }
  }
  return count
};
const calcArr = (arr, k) => {
  let count = 0
  for (let i = 0; i < arr.length; ++i) {
    for (let j = i + 1; j < arr.length; ++j) {
      if ((arr[i] * arr[j]) % k === 0) count++
    }
  }
  return count
}

/**
 * 5997. 找到和为给定整数的三个连续整数
 * 给你一个整数 num ，请你返回三个连续的整数，它们的 和 为 num 。如果 num 无法被表示成三个连续整数的和，请你返回一个 空 数组。
 * 
 * 示例 1：
 * 
 * 输入：num = 33
 * 输出：[10,11,12]
 * 解释：33 可以表示为 10 + 11 + 12 = 33 。
 * 10, 11, 12 是 3 个连续整数，所以返回 [10, 11, 12] 。
 * 示例 2：
 * 
 * 输入：num = 4
 * 输出：[]
 * 解释：没有办法将 4 表示成 3 个连续整数的和。
 *  
 * 
 * 提示：
 * 
 * 0 <= num <= 1015
 */
/**
 * @param {number} num
 * @return {number[]}
 */
 var sumOfThree = function(num) {
  const avg = num / 3
  return avg % 1 === 0 ? [avg - 1, avg, avg + 1] : []
};

/**
 * 5998. 拆分成最多数目的偶整数之和
 * 给你一个整数 finalSum 。请你将它拆分成若干个 互不相同 的偶整数之和，且拆分出来的偶整数数目 最多 。
 * 
 * 比方说，给你 finalSum = 12 ，那么这些拆分是 符合要求 的（互不相同的偶整数且和为 finalSum）：(2 + 10) ，(2 + 4 + 6) 和 (4 + 8) 。它们中，(2 + 4 + 6) 包含最多数目的整数。注意 finalSum 不能拆分成 (2 + 2 + 4 + 4) ，因为拆分出来的整数必须互不相同。
 * 请你返回一个整数数组，表示将整数拆分成 最多 数目的偶整数数组。如果没有办法将 finalSum 进行拆分，请你返回一个 空 数组。你可以按 任意 顺序返回这些整数。
 * 
 *  
 * 
 * 示例 1：
 * 
 * 输入：finalSum = 12
 * 输出：[2,4,6]
 * 解释：以下是一些符合要求的拆分：(2 + 10)，(2 + 4 + 6) 和 (4 + 8) 。
 * (2 + 4 + 6) 为最多数目的整数，数目为 3 ，所以我们返回 [2,4,6] 。
 * [2,6,4] ，[6,2,4] 等等也都是可行的解。
 * 示例 2：
 * 
 * 输入：finalSum = 7
 * 输出：[]
 * 解释：没有办法将 finalSum 进行拆分。
 * 所以返回空数组。
 * 示例 3：
 * 
 * 输入：finalSum = 28
 * 输出：[6,8,2,12]
 * 解释：以下是一些符合要求的拆分：(2 + 26)，(6 + 8 + 2 + 12) 和 (4 + 24) 。
 * (6 + 8 + 2 + 12) 有最多数目的整数，数目为 4 ，所以我们返回 [6,8,2,12] 。
 * [10,2,4,12] ，[6,2,4,16] 等等也都是可行的解。
 *  
 * 
 * 提示：
 * 
 * 1 <= finalSum <= 1010
 */
/**
 * @param {number} finalSum
 * @return {number[]}
 */
 var maximumEvenSplit = function(finalSum) {
  if (finalSum & 1 !== 0) return []
  let count = 0
  let sum = 0
  const res = []
  while (sum !== finalSum) {
    const diff = finalSum - sum
    if (diff <= count) {
      sum += 2
      res[res.length - 1] += 2
      count = res[res.length - 1]
    } else {
      res.push(count + 2)
      count += 2
      sum += count
    }
  }
  return res
};