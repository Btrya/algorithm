/**
 * 2021/02/09 每日一题 992.K 个不同整数的子数组 
 * 给定一个正整数数组 A，如果 A 的某个子数组中不同整数的个数恰好为 K，则称 A 的这个连续、不一定独立的子数组为好子数组。
 * （例如，[1,2,3,1,2] 中有 3 个不同的整数：1，2，以及 3。）
 * 
 * 返回 A 中好子数组的数目。
 * 
 * 示例 1：
 * 
 * 输入：A = [1,2,1,2,3], K = 2
 * 输出：7
 * 解释：恰好由 2 个不同整数组成的子数组：[1,2], [2,1], [1,2], [2,3], [1,2,1], [2,1,2], [1,2,1,2].
 * 示例 2：
 * 
 * 输入：A = [1,2,1,3,4], K = 3
 * 输出：3
 * 解释：恰好由 3 个不同整数组成的子数组：[1,2,1,3], [2,1,3], [1,3,4].
 */
/**
/**
 * @param {number[]} A
 * @param {number} K
 * @return {number}
 */
var subarraysWithKDistinct = function (A, K) {
  const n = A.length;
  const num1 = new Array(n + 1).fill(0);
  const num2 = new Array(n + 1).fill(0);
  let tot1 = 0,
    tot2 = 0;
  let left1 = 0,
    left2 = 0,
    right = 0;
  let ret = 0;
  while (right < n) {
    if (num1[A[right]] == 0) {
      tot1++;
    }
    num1[A[right]]++;
    if (num2[A[right]] == 0) {
      tot2++;
    }
    num2[A[right]]++;
    while (tot1 > K) {
      num1[A[left1]]--;
      if (num1[A[left1]] == 0) {
        tot1--;
      }
      left1++;
    }
    while (tot2 > K - 1) {
      num2[A[left2]]--;
      if (num2[A[left2]] == 0) {
        tot2--;
      }
      left2++;
    }
    ret += left2 - left1;
    right++;
  }
  return ret;
};