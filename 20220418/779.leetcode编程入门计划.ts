/**
 * 2022/04/21 编程入门计划
 * 1588. 所有奇数长度子数组的和
 * 给你一个正整数数组 arr ，请你计算所有可能的奇数长度子数组的和。
 * 
 * 子数组 定义为原数组中的一个连续子序列。
 * 
 * 请你返回 arr 中 所有奇数长度子数组的和 。
 * 
 * 示例 1：
 * 
 * 输入：arr = [1,4,2,5,3]
 * 输出：58
 * 解释：所有奇数长度子数组和它们的和为：
 * [1] = 1
 * [4] = 4
 * [2] = 2
 * [5] = 5
 * [3] = 3
 * [1,4,2] = 7
 * [4,2,5] = 11
 * [2,5,3] = 10
 * [1,4,2,5,3] = 15
 * 我们将所有值求和得到 1 + 4 + 2 + 5 + 3 + 7 + 11 + 10 + 15 = 58
 * 示例 2：
 * 
 * 输入：arr = [1,2]
 * 输出：3
 * 解释：总共只有 2 个长度为奇数的子数组，[1] 和 [2]。它们的和为 3 。
 * 示例 3：
 * 
 * 输入：arr = [10,11,12]
 * 输出：66
 *  
 * 
 * 提示：
 * 
 * 1 <= arr.length <= 100
 * 1 <= arr[i] <= 1000
 */
 function sumOddLengthSubarrays(arr: number[]): number {
  const n = arr.length
  const sub = new Array(n).fill(0)
  sub[0] = arr[0]
  for (let i = 1; i < n; ++i) {
    sub[i] += sub[i - 1] + arr[i]
  }
  let res = sub[n - 1]
  let t = 3
  while (t <= n) {
    for (let i = 0; i <= n - t; ++i) {
      const x2 = i === 0 ? 0 : sub[i - 1]
      res += sub[i + t - 1] - x2
    }
    t += 2
  }
  return res
};

/**
 * 283. 移动零
 * 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
 * 
 * 请注意 ，必须在不复制数组的情况下原地对数组进行操作。
 * 
 * 示例 1:
 * 
 * 输入: nums = [0,1,0,3,12]
 * 输出: [1,3,12,0,0]
 * 示例 2:
 * 
 * 输入: nums = [0]
 * 输出: [0]
 *  
 * 
 * 提示:
 * 
 * 1 <= nums.length <= 104
 * -231 <= nums[i] <= 231 - 1
 *  
 * 
 * 进阶：你能尽量减少完成的操作次数吗？
 */
/**
 Do not return anything, modify nums in-place instead.
 */
 function moveZeroes(nums: number[]): void {
  const n = nums.length
  let slow = 0, fast = 0
  while (fast < n) {
    if (nums[fast] !== 0) {
      [nums[fast], nums[slow]] = [nums[slow], nums[fast]]
      slow++
    }
    fast++
  }
};


/**
 * 1672. 最富有客户的资产总量
 * 给你一个 m x n 的整数网格 accounts ，其中 accounts[i][j] 是第 i​​​​​​​​​​​​ 位客户在第 j 家银行托管的资产数量。返回最富有客户所拥有的 资产总量 。
 * 
 * 客户的 资产总量 就是他们在各家银行托管的资产数量之和。最富有客户就是 资产总量 最大的客户。
 * 
 * 示例 1：
 * 
 * 输入：accounts = [[1,2,3],[3,2,1]]
 * 输出：6
 * 解释：
 * 第 1 位客户的资产总量 = 1 + 2 + 3 = 6
 * 第 2 位客户的资产总量 = 3 + 2 + 1 = 6
 * 两位客户都是最富有的，资产总量都是 6 ，所以返回 6 。
 * 示例 2：
 * 
 * 输入：accounts = [[1,5],[7,3],[3,5]]
 * 输出：10
 * 解释：
 * 第 1 位客户的资产总量 = 6
 * 第 2 位客户的资产总量 = 10 
 * 第 3 位客户的资产总量 = 8
 * 第 2 位客户是最富有的，资产总量是 10
 * 示例 3：
 * 
 * 输入：accounts = [[2,8,7],[7,1,3],[1,9,5]]
 * 输出：17
 *  
 * 
 * 提示：
 * 
 * m == accounts.length
 * n == accounts[i].length
 * 1 <= m, n <= 50
 * 1 <= accounts[i][j] <= 100
 */
 function maximumWealth(accounts: number[][]): number {
  const getAll = (arr) => {
    return arr.reduce((total, item) => total += item, 0)
  }
  let max = getAll(accounts[0])
  for (let i = 1; i < accounts.length; ++i) {
    max = Math.max(max, getAll(accounts[i]))
  }
  return max
};