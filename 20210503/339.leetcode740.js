/**
 * 2021/05/05 每日一题 740. 删除并获得点数
 * 给你一个整数数组 nums ，你可以对它进行一些操作。
 * 
 * 每次操作中，选择任意一个 nums[i] ，删除它并获得 nums[i] 的点数。
 * 之后，你必须删除每个等于 nums[i] - 1 或 nums[i] + 1 的元素。
 * 
 * 开始你拥有 0 个点数。返回你能通过这些操作获得的最大点数。
 * 示例 1：
 * 
 * 输入：nums = [3,4,2]
 * 输出：6
 * 解释：
 * 删除 4 获得 4 个点数，因此 3 也被删除。
 * 之后，删除 2 获得 2 个点数。总共获得 6 个点数。
 * 示例 2：
 * 
 * 输入：nums = [2,2,3,3,3,4]
 * 输出：9
 * 解释：
 * 删除 3 获得 3 个点数，接着要删除两个 2 和 4 。
 * 之后，再次删除 3 获得 3 个点数，再次删除 3 获得 3 个点数。
 * 总共获得 9 个点数。
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var deleteAndEarn = function (nums) {
  const rob = (nums) => {
    const size = nums.length;
    if (size === 1) {
      return nums[0];
    }

    let [first, second] = [nums[0], Math.max(nums[0], nums[1])];
    for (let i = 2; i < size; i++) {
      [first, second] = [second, Math.max(first + nums[i], second)];
    }
    return second;
  }

  const n = nums.length;
  let ans = 0;
  nums.sort((a, b) => a - b);
  total = [nums[0]];

  for (let i = 1; i < n; i++) {
    const val = nums[i];
    if (val === nums[i - 1]) {
      total[total.length - 1] += val;
    } else if (val === nums[i - 1] + 1) {
      total.push(val);
    } else {
      ans += rob(total);
      total = [val];
    }
  }
  ans += rob(total);
  return ans;
};