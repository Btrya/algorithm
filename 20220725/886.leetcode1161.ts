/**
 * 2022/07/31 每日一题 1161. 最大层内元素和
 * https://leetcode.cn/problems/maximum-level-sum-of-a-binary-tree/
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

 function maxLevelSum(root: TreeNode | null): number {
  const res = []
  let ans = Number.MIN_SAFE_INTEGER, max = Number.MIN_SAFE_INTEGER
  const dfs = (node, depth) => {
    if (!node) return
    res[depth] = (res[depth] || 0) + node.val
    dfs(node.left, depth + 1)
    dfs(node.right, depth + 1)
  }
  dfs(root, 0)
  for (let i = 0; i < res.length; ++i) {
    if (res[i] > max) {
      max = res[i]
      ans = i
    }
  }
  return ans + 1
};