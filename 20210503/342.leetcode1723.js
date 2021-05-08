/**
 * 2021/05/08 每日一题 1723. 完成所有工作的最短时间
 * 给你一个整数数组 jobs ，其中 jobs[i] 是完成第 i 项工作要花费的时间。
 * 
 * 请你将这些工作分配给 k 位工人。所有工作都应该分配给工人，且每项工作只能分配给一位工人。
 * 工人的 工作时间 是完成分配给他们的所有工作花费时间的总和。请你设计一套最佳的工作分配方案，使工人的 最大工作时间 得以 最小化 。
 * 
 * 返回分配方案中尽可能 最小 的 最大工作时间 。
 * 示例 1：
 * 
 * 输入：jobs = [3,2,3], k = 3
 * 输出：3
 * 解释：给每位工人分配一项工作，最大工作时间是 3 。
 * 示例 2：
 * 
 * 输入：jobs = [1,2,4,7,8], k = 2
 * 输出：11
 * 解释：按下述方式分配工作：
 * 1 号工人：1、2、8（工作时间 = 1 + 2 + 8 = 11）
 * 2 号工人：4、7（工作时间 = 4 + 7 = 11）
 * 最大工作时间是 11 。
 */
/**
 * @param {number[]} jobs
 * @param {number} k
 * @return {number}
 */
var minimumTimeRequired = function (jobs, k) {
  const n = jobs.length;
  const sum = new Array(1 << n).fill(0);
  for (let i = 1; i < (1 << n); i++) {
    const x = NumberOfTrailingZeros(i),
      y = i - (1 << x);
    sum[i] = sum[y] + jobs[x];
  }

  const dp = new Array(k).fill(0).map(() => new Array(1 << n).fill(0));
  for (let i = 0; i < (1 << n); i++) {
    dp[0][i] = sum[i];
  }

  for (let i = 1; i < k; i++) {
    for (let j = 0; j < (1 << n); j++) {
      let minn = Number.MAX_VALUE;
      for (let x = j; x != 0; x = (x - 1) & j) {
        minn = Math.min(minn, Math.max(dp[i - 1][j - x], sum[x]));
      }
      dp[i][j] = minn;
    }
  }
  return dp[k - 1][(1 << n) - 1];
};

const NumberOfTrailingZeros = (number) => {
  const num = parseInt(number).toString(2);
  const multiply_De_Bruijn_position = [
    0, 1, 28, 2, 29, 14, 24, 3, 30, 22, 20, 15, 25, 17, 4, 8,
    31, 27, 13, 23, 21, 19, 16, 7, 26, 12, 18, 6, 11, 5, 10, 9
  ];
  return multiply_De_Bruijn_position[(((num & (-num)) * 0x077CB531) >> 27) & 31]
}