/**
 * 2022/06/24 每日一题 515. 在每个树行中找最大值
 * https://leetcode.cn/problems/find-largest-value-in-each-tree-row/
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

function largestValues(root: TreeNode | null): number[] {
  const ans = []
  const dfs = (node, depth) => {
    if (!node) return
    if (ans[depth] === undefined) ans[depth] = node.val
    else ans[depth] = Math.max(ans[depth], node.val)
    dfs(node.left, depth + 1)
    dfs(node.right, depth + 1)
  }
  dfs(root, 0)
  return ans
}
