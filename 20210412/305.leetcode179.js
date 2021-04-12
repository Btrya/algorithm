/**
 * 2021/04/12 每日一题 179.最大数
 * 给定一组非负整数 nums，重新排列每个数的顺序（每个数不可拆分）使之组成一个最大的整数。
 * 
 * 注意：输出结果可能非常大，所以你需要返回一个字符串而不是整数。
 * 示例 1：
 * 
 * 输入：nums = [10,2]
 * 输出："210"
 * 示例 2：
 * 
 * 输入：nums = [3,30,34,5,9]
 * 输出："9534330"
 * 示例 3：
 * 
 * 输入：nums = [1]
 * 输出："1"
 * 示例 4：
 * 
 * 输入：nums = [10]
 * 输出："10"
 */
/**
 * @param {number[]} nums
 * @return {string}
 */
 var largestNumber = function(nums) {
  nums.sort((x, y) => {
    let sx = 10, sy = 10
    while (sx <= x) {
      sx *= 10
    }
    while (sy <= y) {
      sy *= 10
    }
    return '' + (sx * y + x) - ('' + (sy * x + y))
  })
  if (nums[0] === 0) return '0'
  return nums.join('')
};