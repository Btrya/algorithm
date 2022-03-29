/**
 * 2022/03/29 每日一题 47. 全排列 II 46同
 * 给定一个可包含重复数字的序列 nums ，按任意顺序 返回所有不重复的全排列。
 * 
 * 示例 1：
 * 
 * 输入：nums = [1,1,2]
 * 输出：
 * [[1,1,2],
 *  [1,2,1],
 *  [2,1,1]]
 * 示例 2：
 * 
 * 输入：nums = [1,2,3]
 * 输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
 *  
 * 
 * 提示：
 * 
 * 1 <= nums.length <= 8
 * -10 <= nums[i] <= 10
 */
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
 var permuteUnique = function(arr) {
  const n = arr.length
  let used = new Array(n).fill(false)
  let res = []
  arr.sort()
  const dfs = (nums, len) => {
    if (len === n) res.push(nums)
    else {
      for (let i = 0; i < n; ++i) {
        if (arr[i - 1] === arr[i] && i - 1 >= 0 && !used[i - 1]) continue
        if (used[i]) continue
        nums.push(arr[i])
        used[i] = true
        dfs(nums.slice(), len + 1)
        nums.pop()
        used[i] = false
      }
    }
  }
  dfs([], 0)
  return res
};