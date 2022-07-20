/**
 * 2022/07/21 每日一题 814. 二叉树剪枝
 * https://leetcode.cn/problems/binary-tree-pruning/
 */
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

 function pruneTree(root: TreeNode | null): TreeNode | null {
  if (!root) return null
  root.left = pruneTree(root.left)
  root.right = pruneTree(root.right)
  if (root.val === 0 && !root.left && !root.right) return null
  return root
};