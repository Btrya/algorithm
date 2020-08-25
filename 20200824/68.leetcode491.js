/**
 * leetcode 2020/08/25 每日一题  491.递增子序列
 * 给定一个整型数组, 你的任务是找到所有该数组的递增子序列，递增子序列的长度至少是2。
 * 示例:
 * 输入: [4, 6, 7, 7]
 * 输出: [[4, 6], [4, 7], [4, 6, 7], [4, 6, 7, 7], [6, 7], [6, 7, 7], [7,7], [4,7,7]]
 */
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var findSubsequences = function (nums) {
  const res = [];
  const len = nums.length;
  const set = new Set();
  const dfs = (start, path) => {
    if (path.length >= 2) {
			const str = path.join(","); // 转成字符串，存入set
			if (!set.has(str)) { // 避免重复的子序列进入res
				res.push(path.slice()) // 推入一份拷贝，path还要继续使用
				set.add(str)
			}
		}
		for (let i = start; i < len; i++) {
			const prev = path[path.length - 1]
			const cur = nums[i]
			if (path.length == 0 || prev <= cur) {
				path.push(cur) // 选择当前的数字
				dfs(i + 1, path) // 继续向下递归
				path.pop() // 推出当前数字，选择别的数字
			}
		}
	};
	dfs(0, [])
	return res
};

// 优化 不用set
var findSubsequences = function (nums) {
	const res = []
	const len = nums.length
	const dfs = (start, path) => {
		if (start == len) { // 指针越界
			if (path.length >= 2) {
				res.push(path.slice())
				return
			}
		}
		path.push(nums[start])
		for (let i = start + 1; i <= len; i++) {
			const prev = nums[start]
			const cur = nums[i]
			if (i < len && cur == prev) { // i还没越界，但当前选择和前一个选择相同
				dfs(i, path)    // 递归完当前选择 break
				break      // 避免i == len 导致path推入res
			} else if (i == len || prev < cur) { // i越界，放它进递归，在递归出口中return
				dfs(i, path)  // 或prev < cur， 满足条件，往下递归
			}
		}
		path.pop() // 撤销选择
	}
	for (let i = 0; i < len; i++) {
		dfs(i, [])
	}
	return res
};