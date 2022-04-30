/**
 * 2022/05/01 每日一题 1305. 两棵二叉搜索树中的所有元素
 * https://leetcode-cn.com/problems/all-elements-in-two-binary-search-trees/
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

 function getAllElements(root1: TreeNode | null, root2: TreeNode | null): number[] {
  const res = []
  function dfs(node) {
    if (!node) return
    res.push(node.val)
    dfs(node.left)
    dfs(node.right)
  }
  dfs(root1)
  dfs(root2)
  return res.sort((a, b) => a - b)
};