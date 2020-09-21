/**
 * 2020/09/21 每日一题 538. 把二叉搜索树转换为累加树
 * 给定一个二叉搜索树（Binary Search Tree），把它转换成为累加树（Greater Tree)，使得每个节点的值是原来的节点值加上所有大于它的节点值之和。
 * 例如：
 * 
 * 输入: 原始二叉搜索树:
 *               5
 *             /   \
 *            2     13
 * 
 * 输出: 转换为累加树:
 *              18
 *             /   \
 *           20     13
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
var convertBST = function(root) {
	let sum = 0
	const inOrder = (root) => {
		if (!root) return 
		if (root.right) {
			inOrder(root.right)
		}
		sum += root.val
		root.val = sum
		if (root.left) {
			inOrder(root.left)
		}
	}
	inOrder(root)  // 递归的入口
	return root
};