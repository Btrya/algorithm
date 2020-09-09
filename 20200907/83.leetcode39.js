/**
 * 2020/09/09 每日一题 39. 组合总和
 * 给定一个无重复元素的数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。
 * candidates 中的数字可以无限制重复被选取。
 * 说明：
 * 所有数字（包括 target）都是正整数。
 * 解集不能包含重复的组合。 
 * 示例 1：
 * 输入：candidates = [2,3,6,7], target = 7,
 * 所求解集为：
 * [
 *   [7],
 *   [2,2,3]
 * ]
 * 示例 2：
 * 输入：candidates = [2,3,5], target = 8,
 * 所求解集为：
 * [
 *   [2,2,2,2],
 *   [2,3,3],
 *   [3,5]
 * ]
 */
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
// 回溯
var combinationSum = function(candidates, target) {
	const res = []
	let sum = 0
	const dfs = (start, temp) => {
		if (sum >= target) {
			if (sum == target) {
				res.push(temp.slice())
			}
			return // 结束当前递归
		}
		for (let i = start; i < candidates.length; i++) {  // 枚举出选择，从start开始
			sum += candidates[i] 			// 累加给sum
			temp.push(candidates[i])  // 假如“部分解”
			dfs(i, temp)              // 往下递归，继续选择，注意是i，不是i + 1
			sum -= candidates[i]  		// 撤销选择，sum变回来
			temp.pop()								// 撤销选择
		}
	} 
	dfs(0, [])
	return res
};