/**
 * 2022/05/30 每日一题 1022. 从根到叶的二进制数之和
 * https://leetcode.cn/problems/sum-of-root-to-leaf-binary-numbers/
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

 function sumRootToLeaf(root: TreeNode | null): number {
  let res = 0
  function dfs(node, str) {
    if (!node) return
    const s = str + node.val
    dfs(node.left, s)
    dfs(node.right, s)
    if (!node.left && !node.right) {
      res += parseInt(s, 2)
    }
  }
  dfs(root, '')
  return res
};