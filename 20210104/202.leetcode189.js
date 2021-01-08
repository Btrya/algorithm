/**
 * 2021/01/08 每日一题 189. 旋转数组
 * 给定一个数组，将数组中的元素向右移动 k 个位置，其中 k 是非负数。
 * 示例 1:
 * 
 * 输入: [1,2,3,4,5,6,7] 和 k = 3
 * 输出: [5,6,7,1,2,3,4]
 * 解释:
 * 向右旋转 1 步: [7,1,2,3,4,5,6]
 * 向右旋转 2 步: [6,7,1,2,3,4,5]
 * 向右旋转 3 步: [5,6,7,1,2,3,4]
 * 示例 2:
 * 
 * 输入: [-1,-100,3,99] 和 k = 2
 * 输出: [3,99,-1,-100]
 * 解释: 
 * 向右旋转 1 步: [99,-1,-100,3]
 * 向右旋转 2 步: [3,99,-1,-100]
 */
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
// 对原数组切割后拼接到头部
var rotate = function(nums, k) {
  k = k % nums.length; // 剪枝
  let tmp = nums.splice(nums.length - k, k)
  nums.unshift(...tmp)
};

var rotate = function(nums, k) {
  let n = nums.length, cnt = 0;
  k = k % n;
  for (let s = 0; cnt < n; ++s) {
    let c = s;
    let pre = nums[c];
    while(1) {
      let next = (c + k) % n;
      let tmp = nums[next];
      nums[next] = pre;
      pre = tmp;
      c = next;
      ++cnt;
      if (s == c) break;
    }
  }
};