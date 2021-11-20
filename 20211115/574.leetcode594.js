/**
 * 2021/11/20 每日一题 594. 最长和谐子序列
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
 var findLHS = function(nums) {
  const cnt = new Map();
  let res = 0;
  for (const num of nums) {
    cnt.set(num, (cnt.get(num) || 0) + 1);
  }
  for (const key of cnt.keys()) {
    if (cnt.has(key + 1)) {
      res = Math.max(res, cnt.get(key) + cnt.get(key + 1));
    }
  }
  return res;
};