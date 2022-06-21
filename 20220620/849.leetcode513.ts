/**
 * 2022/06/22 每日一题 513. 找树左下角的值
 * https://leetcode.cn/problems/find-bottom-left-tree-value/
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

 function findBottomLeftValue(root: TreeNode | null): number {
  let ans = []
  const dfs = (node, depth) => {
    if (!node) return
    if (ans[depth] === undefined) ans[depth] = node.val
    dfs(node.left, depth + 1)
    dfs(node.right, depth + 1)
  }
  dfs(root, 0)
  return ans[ans.length - 1]
};