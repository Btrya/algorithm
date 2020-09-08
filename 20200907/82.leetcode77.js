/**
 * 2020/09/08 每日一题 77.组合
 * 给定两个整数 n 和 k，返回 1 ... n 中所有可能的 k 个数的组合。
 * 示例:
 * 
 * 输入: n = 4, k = 2
 * 输出:
 * [
 *   [2,4],
 *   [3,4],
 *   [2,3],
 *   [1,2],
 *   [1,3],
 *   [1,4],
 * ]
 */
/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
// 递归实现组合型枚举
var combine = function(n, k) {
	const ans = []
	const dfs = (cur, temp) => {
		if (temp.length + (n - cur + 1) < k) return
		if (temp.length == k) {
			ans.push(temp)
			return
		}
		dfs(cur + 1, [...temp, cur])
		dfs(cur + 1, temp)
	}
	dfs(1, [])
	return ans
};

// 二进制字典组合型枚举
var combine = function(n, k) {
	const temp = []
	const ans = []
	// 初始化 将temp中[0, k - 1]每个位置i设置为i + 1， 即[0, k - 1] 存 [1, k]
	// 末尾加一位n + 1作为哨兵
	for (let i = 1; i <= k; i++) {
		temp.push(i)
	}
	temp.push(n + 1)
	let j = 0
	while (j < k) {
		ans.push(temp.slice(0, k))
		j = 0
		// 寻找第一个 temp[j] + 1 != temp[j + 1] 的位置t
		// 我们需要把[0, t - 1] 区间内的每个位置重置成[1, t]
		while(j < k && temp[j] + 1 == temp[j + 1]) {
			temp[j] = j + 1
			++j
		}
		// j是第一个temp[j] + 1 != temp[j + 1] 的位置
		++temp[j]
	}
	return ans
}
