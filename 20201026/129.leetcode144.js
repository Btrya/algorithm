/**
 * 2020/10/27 每日一题 144. 二叉树的前序遍历
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
 * @return {number[]}
 */
// 递归
var preorderTraversal = function(root) {
  if (!root) return []
  return [root.val].concat(preorderTraversal(root.left), preorderTraversal(root.right))
};

// 迭代
var preorderTraversal = function(root) {
  if (!root) return []
  const stack = []
  const res = []
  stack.push(root)
  while (stack.length) {
    const node = stack.pop()
    res.push(node.val)
    if (node.right) stack.push(node.right)
    if (node.left) stack.push(node.left)
  }
  return res
};