/**
 * 2020/09/18 每日一题 47.全排列
 * 给定一个可包含重复数字的序列，返回所有不重复的全排列。
 * 示例:
 * 输入: [1,1,2]
 * 输出:
 * [
 *   [1,1,2],
 *   [1,2,1],
 *   [2,1,1]
 * ]
 */
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function(nums) {
	const res = []
	const len = nums.length
	const used = new Array(len)
	nums.sort((a, b) => a- b) // 升序排序
	const helper = (path) => {
		if (path.length == len) {  // 选够了个数
			res.push(path.slice())  // path的拷贝 加入解集
			return
		}
		for (let i = 0; i < len; i++) {  // 枚举出所有的选择
			if (nums[i - 1] == nums[i] && i - 1 >= 0 && !used[i - 1]) {  // 避免产生重复的排列
				continue
			}
			if (used[i]) { // 这个数使用过了，跳过
				continue 
			}
			path.push(nums[i]) // Make a choice
			used[i] = true	// 记录路径上做过的选择
			helper(path) // explore, 基于它继续选，递归
			path.pop()   // undo the choice
			used[i] = false // 也要撤销一下对它的记录
		}
	}
	helper([])
	return res
};