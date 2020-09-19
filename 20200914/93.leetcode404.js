/**
 * 2020/09/19 每日一题 404. 左叶子之和
 * 计算给定二叉树的所有左叶子之和。
 * 
 * 示例：
 * 
 *     3
 *    / \
 *   9  20
 *     /  \
 *    15   7
 * 
 * 在这个二叉树中，有两个左叶子，分别是 9 和 15，所以返回 24
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
// dfs
var sumOfLeftLeaves = function(root) {
	const dfs = (root, isLeft) => {
		if (root == null) {
			return 0
		}
		if (root.left == null && root.right == null) {
			if (isLeft) return root.val
			return 0
		}
		return dfs(root.left, true) + dfs(root.right, false)
	}
	return dfs(root, false)
};

// bfs
var sumOfLeftLeaves = function(root) {
	if (root == null) return 0
	let sum = 0
	const queue = []
	queue.push(root)
	while (queue.length) {
		const cur = queue.shift()
		if (cur.left) {
			if (cur.left.left == null && cur.left.right == null) {
				sum += cur.left.val
			}
			queue.push(cur.left)
		}
		if (cur.right) {
			queue.push(cur.right)
		}
	}
	return sum
};