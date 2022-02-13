/**
 * 2022/02/13 周赛 6004. 得到 0 的操作数
 * 给你两个 非负 整数 num1 和 num2 。
 * 
 * 每一步 操作 中，如果 num1 >= num2 ，你必须用 num1 减 num2 ；否则，你必须用 num2 减 num1 。
 * 
 * 例如，num1 = 5 且 num2 = 4 ，应该用 num1 减 num2 ，因此，得到 num1 = 1 和 num2 = 4 。然而，如果 num1 = 4且 num2 = 5 ，一步操作后，得到 num1 = 4 和 num2 = 1 。
 * 返回使 num1 = 0 或 num2 = 0 的 操作数 。
 * 
 *  
 * 
 * 示例 1：
 * 
 * 输入：num1 = 2, num2 = 3
 * 输出：3
 * 解释：
 * - 操作 1 ：num1 = 2 ，num2 = 3 。由于 num1 < num2 ，num2 减 num1 得到 num1 = 2 ，num2 = 3 - 2 = 1 。
 * - 操作 2 ：num1 = 2 ，num2 = 1 。由于 num1 > num2 ，num1 减 num2 。
 * - 操作 3 ：num1 = 1 ，num2 = 1 。由于 num1 == num2 ，num1 减 num2 。
 * 此时 num1 = 0 ，num2 = 1 。由于 num1 == 0 ，不需要再执行任何操作。
 * 所以总操作数是 3 。
 * 示例 2：
 * 
 * 输入：num1 = 10, num2 = 10
 * 输出：1
 * 解释：
 * - 操作 1 ：num1 = 10 ，num2 = 10 。由于 num1 == num2 ，num1 减 num2 得到 num1 = 10 - 10 = 0 。
 * 此时 num1 = 0 ，num2 = 10 。由于 num1 == 0 ，不需要再执行任何操作。
 * 所以总操作数是 1 。
 *  
 * 
 * 提示：
 * 
 * 0 <= num1, num2 <= 105
 */
/**
 * @param {number} num1
 * @param {number} num2
 * @return {number}
 */
 var countOperations = function(num1, num2) {
  let count = 0
  while (num1 !== 0 && num2 !== 0) {
    count++
    const diff = Math.abs(num1 - num2)
    if (num1 > num2) num1 = diff
    else num2 = diff
  }
  return count
};

/**
 * 6005. 使数组变成交替数组的最少操作数
 * 给你一个下标从 0 开始的数组 nums ，该数组由 n 个正整数组成。
 * 
 * 如果满足下述条件，则数组 nums 是一个 交替数组 ：
 * 
 * nums[i - 2] == nums[i] ，其中 2 <= i <= n - 1 。
 * nums[i - 1] != nums[i] ，其中 1 <= i <= n - 1 。
 * 在一步 操作 中，你可以选择下标 i 并将 nums[i] 更改 为 任一 正整数。
 * 
 * 返回使数组变成交替数组的 最少操作数 。
 * 
 *  
 * 
 * 示例 1：
 * 
 * 输入：nums = [3,1,3,2,4,3]
 * 输出：3
 * 解释：
 * 使数组变成交替数组的方法之一是将该数组转换为 [3,1,3,1,3,1] 。
 * 在这种情况下，操作数为 3 。
 * 可以证明，操作数少于 3 的情况下，无法使数组变成交替数组。
 * 示例 2：
 * 
 * 输入：nums = [1,2,2,2,2]
 * 输出：2
 * 解释：
 * 使数组变成交替数组的方法之一是将该数组转换为 [1,2,1,2,1].
 * 在这种情况下，操作数为 2 。
 * 注意，数组不能转换成 [2,2,2,2,2] 。因为在这种情况下，nums[0] == nums[1]，不满足交替数组的条件。
 *  
 * 
 * 提示：
 * 
 * 1 <= nums.length <= 105
 * 1 <= nums[i] <= 105
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
 var minimumOperations = function(nums) {
  if (nums.length < 2) return 0
  let odd = new Map(), oddCount = 0
  let even = new Map(), evenCount = 0
  for (let i = 0; i < nums.length; i += 2) {
    odd.set(nums[i], (odd.get(nums[i]) || 0) + 1)
    oddCount++
  }
  for (let i = 1; i < nums.length; i += 2) {
    even.set(nums[i], (even.get(nums[i]) || 0) + 1)
    evenCount++
  }
  odd = Array.from(odd).sort((a, b) => b[1] - a[1])
  even = Array.from(even).sort((a, b) => b[1] - a[1])
  if (odd[0][0] === even[0][0]) {
    if (odd.length === 1 && even.length === 1) return evenCount
    else if (odd.length === 1) return oddCount - odd[0][1] + evenCount - even[1][1]
    else if (even.length === 1 ) return oddCount - odd[1][1] + evenCount - even[0][1]
    else return oddCount - odd[1][1] + evenCount - even[0][1]
  } else {
    return oddCount - odd[0][1] + evenCount - even[0][1]
  }
};