/**
 * 2022/03/21 每日一题 653. 两数之和 IV - 输入 BST
 * https://leetcode-cn.com/problems/two-sum-iv-input-is-a-bst/
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {boolean}
 */
 var findTarget = function(root, k) {
  let map = {}
  const dfs = (node) => {
    if (!node) return false
    if (map[k - node.val]) return true
    map[node.val] = true
    return dfs(node.left) || dfs(node.right)
  }
  return dfs(root)
};