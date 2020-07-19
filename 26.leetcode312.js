/**
 * leetcoode 312.戳气球 (Hard)
 * 有 n 个气球，编号为0 到 n-1，每个气球上都标有一个数字，这些数字存在数组 nums 中。
 * 现在要求你戳破所有的气球。如果你戳破气球 i ，就可以获得 nums[left] * nums[i] * nums[right] 个硬币。
 * 这里的 left 和 right 代表和 i 相邻的两个气球的序号。
 * 注意当你戳破了气球 i 后，气球 left 和气球 right 就变成了相邻的气球。
 * 求所能获得硬币的最大数量。
 * 你可以假设 nums[-1] = nums[n] = 1，但注意它们不是真实存在的所以并不能被戳破。
 * 示例:
 * 输入: [3,1,5,8]
 * 输出: 167
 * 解释: nums = [3,1,5,8] --> [3,5,8] -->   [3,8]   -->  [8]  --> []
 *      coins =  3*1*5      +  3*5*8    +  1*3*8      + 1*8*1   = 167
 */

/**
 * 对nums数组进行处理，在首尾各增加一个新的下标，成为长度为n + 2的新数组val
 * @param {number[]} nums
 * @return {number}
 */
// 记忆化搜索：理解为两个指针left 和right，当left >= right - j，则说明区间中没有气球了
// 当left < right - 1时，递归计算分割出的区间三项之和的最大值。问题转变为球solve(i, mid) 和 solve(mid, j)
// var maxCoins = function (nums) {
//   let n = nums.length;
//   let val = new Array(n + 2);
//   for (let i = 1; i <= n; i++) {
//     val[i] = nums[i - 1];
//   }
//   val[0] = val[n + 1] = 1; // 处理成为一个新的数组val
//   let rec = Array.from(Array(n + 2), () => Array(n + 2).fill(-1));
//   const generate = function (left, right) {
//     if (left >= right - 1) return 0;
//     if (rec[left][right] != -1) {
//       return rec[left][right];
//     }
//     for (let i = left + 1; i < right; i++) {
//       let sum = val[left] * val[i] * val[right];
//       sum += generate(left, i) + generate(i, right);
//       rec[left][right] = Math.max(rec[left][right], sum);
//     }
//     return rec[left][right];
//   };
//   return generate(0, n + 1);
// };

// 动态规划
// var maxCoins = function(nums) {
//   let n = nums.length
//   let val = new Array(n + 2)
//   val[0] = val[n + 1] = 1
//   let rec = Array.from(Array(n + 2), () => Array(n + 2).fill(0))
//   for (let i = 1; i <= n; i++) {
//     val[i] = nums[i - 1]
//   }
//   for (let i = n - 1; i >= 0; i--) {
//     for(let j = i + 2; j <= n + 1; j++) {
//       for(let k = i + 1; k < j; k++) {
//         let sum = val[i] * val[k] * val[j]
//         sum += rec[i][k] + rec[k][j]
//         rec[i][j] = Math.max(rec[i][j], sum)
//       }
//     }
//   }
//   return rec[0][n + 1]
// };

// 动态规划优化
var maxCoins = function(nums) {
  nums = [1, ...nums, 1]
  let n = nums.length
  let rec = Array.from(Array(n), () => Array(n).fill(0))
  for (let i = n - 1; i >= 0; i--) {
    for (let j = i + 2; j <= n; j++) {
      let max = 0
      for (let k = i + 1; k < j; k++) { 
        max = Math.max(max, rec[i][k] + rec[k][j] + nums[i] * nums[k] * nums[j])
      }
      rec[i][j] = max
    }
  }
  return rec[0][n - 1]
}
console.log(maxCoins([3, 1, 5, 8]));
