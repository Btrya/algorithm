/**
 * 2021/04/17 每日一题 220.存在重复元素 III
 * 给你一个整数数组 nums 和两个整数 k 和 t 。请你判断是否存在 两个不同下标 i 和 j，
 * 使得 abs(nums[i] - nums[j]) <= t ，同时又满足 abs(i - j) <= k 。
 * 
 * 如果存在则返回 true，不存在返回 false。
 * 示例 1：
 * 
 * 输入：nums = [1,2,3,1], k = 3, t = 0
 * 输出：true
 * 示例 2：
 * 
 * 输入：nums = [1,0,1,1], k = 1, t = 2
 * 输出：true
 * 示例 3：
 * 
 * 输入：nums = [1,5,9,1,5,9], k = 2, t = 3
 * 输出：false
 */
/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} t
 * @return {boolean}
 */
var containsNearbyAlmostDuplicate = function (nums, k, t) {
  const n = nums.length;
  const mp = new Map();
  for (let i = 0; i < n; ++i) {
    const x = nums[i];
    const id = getID(x, t + 1);
    if (mp.has(id)) {
      return true;
    }
    if (mp.has(id - 1) && Math.abs(x - mp.get(id - 1)) <= t) {
      return true;
    }
    if (mp.has(id + 1) && Math.abs(x - mp.get(id + 1)) <= t) {
      return true;
    }
    mp.set(id, x);
    if (i >= k) {
      mp.delete(getID(nums[i - k], t + 1));
    }
  }
  return false;
};

const getID = (x, w) => {
  return x < 0 ? Math.floor((x + 1) / w) - 1 : Math.floor(x / w);
}