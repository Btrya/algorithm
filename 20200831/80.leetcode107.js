/**
 * 2020/09/06 每日一题 107. 二叉树的层次遍历 II
 * 给定一个二叉树，返回其节点值自底向上的层次遍历。 （即按从叶子节点所在层到根节点所在的层，逐层从左向右遍历）
 * 
 * 例如：
 * 给定二叉树 [3,9,20,null,null,15,7],
 * 
 *     3
 *    / \
 *   9  20
 *     /  \
 *    15   7
 * 返回其自底向上的层次遍历为：
 * 
 * [
 *   [15,7],
 *   [9,20],
 *   [3]
 * ]
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrderBottom = function(root) {
  if (!root) return []
  const queue = []
  queue.push(root)
  const res = []
  while(queue.length) {
    const subRes = []
    const levelSize = queue.length
    for (let i = 0; i < levelSize; i++) {
      const cur = queue.shift()
      subRes.push(cur.val)
      if (cur.left) {
        queue.push(cur.left)
      }
      if (cur.right) {
        queue.push(cur.right)
      }
    }
    res.unshift(subRes)
  }
  return res
};