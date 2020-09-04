/**
 * 2020/09/04 每日一题 257.二叉树的所有路径
 * 给定一个二叉树，返回所有从根节点到叶子节点的路径。
 * 说明: 叶子节点是指没有子节点的节点。
 * 示例:
 * 输入:
 *
 *    1
 *  /   \
 * 2     3
 *  \
 *   5
 *
 * 输出: ["1->2->5", "1->3"]
 *
 * 解释: 所有根节点到叶子节点的路径为: 1->2->5, 1->3
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
 * @return {string[]}
 */
// 递归
var binaryTreePaths = function (root) {
  if (!root) return [];
  const res = [];
  const generate = (node, path) => {
    const nowP = path == "" ? node.val : path + "->" + node.val;
    if (node.left == null && node.right == null) {
      res.push(nowP + "");
    }
    if (node.left) generate(node.left, nowP);
    if (node.right) generate(node.right, nowP);
  };
  generate(root, "");
  return res;
};

// dfs
var binaryTreePaths = function (root) {
	const paths = []
	const generate = (root, path) => {
		if (root) {
			path += root.val.toString()
			if (root.left === null && root.right === null) {
				paths.push(path)
			} else {
				path += "->"
				generate(root.left, path)
				generate(root.right, path)
			}
		}
	}
	generate(root, "")
	return paths
};

// bfs
var binaryTreePaths = function (root) {
	const paths = []
	if (!root) return paths
	const nodeQueue = [root]
	const pathQueue = [root.val.toString()]
	while(nodeQueue.length) {
		const node = nodeQueue.shift()
		const path = pathQueue.shift()
		if (node.left === null && node.right === null) {
			paths.push(path)
		} else {
			if (node.left !== null) {
				nodeQueue.push(node.left)
				pathQueue.push(path + "->" + node.left.val.toString())
			}
			if (node.right !== null) {
				nodeQueue.push(node.right)
				pathQueue.push(path + "->" + node.right.val.toString())
			}
		}
	}
	return paths
};