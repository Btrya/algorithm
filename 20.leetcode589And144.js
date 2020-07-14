/**
 * 来自leetcode 589.N叉树的前序遍历
 * 给定一个 N 叉树，返回其节点值的前序遍历。
 * // Definition for a Node.
 * function Node(val, children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node} root
 * @return {number[]}
 */

// 递归
var preorder = function (root) {
  if (!root) return [];
  let res = [root.val];
  for (let i = 0; i < root.children.length; i++) {
    res = res.concat(preorder(root.children[i]));
  }
  return res;
};

// 简写
var preorder = function(root) {
  if (!root) return []
  return Array.prototype.concat.apply([root.val],root.children.map((v) => preorder(v)))
};

/**
 * leetcode 144.二叉树的前序遍历
 * 给定一个二叉树，返回它的 前序 遍历。
 * 示例:
 * 输入: [1,null,2,3]  
 *    1
 *     \
 *      2
 *     /
 *    3 
 * 输出: [1,2,3]
 *
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
var preorderTraversal = function(root) {
  if (!root) return []
  return [root.val].concat(preorderTraversal(root.left), preorderTraversal(root.right))
};