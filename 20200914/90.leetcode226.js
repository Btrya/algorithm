/**
 * 2020/09/16 每日一题 226. 翻转二叉树
 * 翻转一棵二叉树。
 * 示例：
 * 输入：
 *
 *      4
 *    /   \
 *   2     7
 *  / \   / \
 * 1   3 6   9
 * 输出：
 *
 *      4
 *    /   \
 *   7     2
 *  / \   / \
 * 9   6 3   1
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
 * @return {TreeNode}
 */
// 递归
var invertTree = function (root) {
	if (!root) return root;
	[root.left, root.right] = [root.right, root.left]
	invertTree(root.left)
	invertTree(root.right)
	return root
};

// BFS
var invertTree = function (root) {
	if (!root) return root
	const queue = [] // 维护一个队列
	queue.push(root) // 初始推入第一层的root
	while (queue.length) {
		const cur = queue.shift()
		const temp = cur.left
		cur.left = cur.right
		cur.right = temp
		if (cur.left) {
			queue.push(cur.left)
		}
		if (cur.right) {
			queue.push(cur.right)
		}
	}
	return root
};
