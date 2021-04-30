/**
 * 2021/04/30 每日一题 137. 只出现一次的数字 II
 * 给你一个整数数组 nums ，除某个元素仅出现 一次 外，其余每个元素都恰出现 三次 。请你找出并返回那个只出现了一次的元素。
 * 示例 1：
 * 
 * 输入：nums = [2,2,3,2]
 * 输出：3
 * 示例 2：
 * 
 * 输入：nums = [0,1,0,1,0,1,99]
 * 输出：99
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
 var singleNumber = function(nums) {
  let a = 0, b = 0;
  for (const num of nums) {
    b = ~a & (b ^ num)
    a = ~b & (a ^ num)
  }
  return b
};