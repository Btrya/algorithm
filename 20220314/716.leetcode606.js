/**
 * 2022/03/19 每日一题 606. 根据二叉树创建字符串
 * https://leetcode-cn.com/problems/construct-string-from-binary-tree/
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
 * @return {string}
 */
 var tree2str = function(root) {
  const dfs = (node) => {
    if (!node) return ''
    let right = node.right ? `(${dfs(node.right)})`: ``
    let left = node.left ? `(${dfs(node.left)})`: right ? `()` : ``
    return `${node.val}${left}${right}`
  }
  return dfs(root)
};