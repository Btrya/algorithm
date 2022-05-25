/**
 * 2022/05/26 每日一题 1228. 等差数列中缺失的数字
 * 在某个数组 arr 中，值符合等差数列的数值规律：在 0 <= i < arr.length - 1 的前提下，arr[i+1] - arr[i] 的值都相等。
 * 
 * 我们会从该数组中删除一个 既不是第一个 也 不是最后一个的值，得到一个新的数组  arr。
 * 
 * 给你这个缺值的数组 arr，返回 被删除的那个数 。
 * 
 * 示例 1：
 * 
 * 输入：arr = [5,7,11,13]
 * 输出：9
 * 解释：原来的数组是 [5,7,9,11,13]。
 * 示例 2：
 * 
 * 输入：arr = [15,13,12]
 * 输出：14
 * 解释：原来的数组是 [15,14,13,12]。
 *  
 * 
 * 提示：
 * 
 * 3 <= arr.length <= 1000
 * 0 <= arr[i] <= 105
 * 给定的数组 保证 是一个有效的数组。
 */
 function missingNumber(arr: number[]): number {
  arr.sort((a, b) => a - b)
  const n = arr.length
  const diff = Math.abs(arr[0] - arr[n - 1]) / n
  for (let i = 1; i < n; ++i) {
    if (arr[i] - diff !== arr[i - 1]) return arr[i] - diff
  }
  return arr[0]
};