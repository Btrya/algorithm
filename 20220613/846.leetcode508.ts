/**
 * 2022/06/19 每日一题 508. 出现次数最多的子树元素和
 * https://leetcode.cn/problems/most-frequent-subtree-sum/
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

 function findFrequentTreeSum(root: TreeNode | null): number[] {
  let maxCount = 0
  const countMap = new Map()
  const dfs = (node) => {
    if (!node) return 0
    let sum = node.val + dfs(node.left) + dfs(node.right)
    countMap.set(sum, (countMap.get(sum) || 0) + 1)
    maxCount = Math.max(maxCount, countMap.get(sum))
    return sum
  }
  dfs(root)
  const ans = []
  for (const [key, value] of countMap) {
    if (value === maxCount) ans.push(key)
  }
  return ans
};