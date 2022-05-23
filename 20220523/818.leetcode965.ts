/**
 * 2022/05/24 每日一题 965. 单值二叉树
 * https://leetcode.cn/problems/univalued-binary-tree/
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

 function isUnivalTree(root: TreeNode | null): boolean {
  const target = root.val
  const dfs = (node) => {
    if (!node) return true
    if (node.val !== target) return false
    return dfs(node.left) && dfs(node.right)
  }
  return dfs(root)
};