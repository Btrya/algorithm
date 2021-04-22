/**
 * 2021/04/22 每日一题 363. 矩形区域不超过 K 的最大数值和
 * 给你一个 m x n 的矩阵 matrix 和一个整数 k ，找出并返回矩阵内部矩形区域的不超过 k 的最大数值和。
 * 
 * 题目数据保证总会存在一个数值和不超过 k 的矩形区域。
 * 示例 1：
 * 
 * 输入：matrix = [[1,0,1],[0,-2,3]], k = 2
 * 输出：2
 * 解释：蓝色边框圈出来的矩形区域 [[0, 1], [-2, 3]] 的数值和是 2，且 2 是不超过 k 的最大数字（k = 2）。
 * 示例 2：
 * 
 * 输入：matrix = [[2,2,-1]], k = 3
 * 输出：3
 *  
 * 
 * 提示：
 * 
 * m == matrix.length
 * n == matrix[i].length
 * 1 <= m, n <= 100
 * -100 <= matrix[i][j] <= 100
 * -105 <= k <= 105
 */
/**
 * @param {number[][]} matrix
 * @param {number} k
 * @return {number}
 */
 var maxSumSubmatrix = function(matrix, k) {
  const row = matrix.length;
  if (!row) return 0;
  const col = matrix[0].length;
  if (!col) return 0;

  let max = -Infinity;
  for (let l = 0; l < col; l++) {
    const list = new Array(row).fill(0);
    for (let r = l; r < col; r++) {
      for (let k = 0; k < row; k++) list[k] += matrix[k][r];
      const m = maxSubarraySumNoMoreThanK(list, k);
      max = Math.max(max, m);
    }
  }

  function maxSubarraySumNoMoreThanK(list, k) {
    let max = -Infinity;
    const preSum = [0];
    let accu = 0;
    for (let i = 0; i < list.length; i++) {
      accu += list[i];
      const index = findLowerBound(preSum, accu - k);
      const sum = accu - preSum[index];
      if (sum <= k) max = Math.max(max, sum);
      insert(preSum, accu);
    }
    return max;
  }

  function insert(nums, target) {
    if (target >= nums[nums.length - 1]) {
      nums.push(target);
      return;
    }
    const index = findLowerBound(nums, target);
    nums.splice(index, 0, target);
  }

  function findLowerBound(nums, target) {
    let l = 0;
    let r = nums.length - 1;
    while (l < r) {
      const mid = l + r >>> 1;
      if (nums[mid] >= target) r = mid;
      else l = mid + 1;
    }
    return l;
  }

  if (max === -Infinity) return 0;
  return max;
};