/**
 * 2020/09/26 每日一题 113. 路径总和 II
 * 给定一个二叉树和一个目标和，找到所有从根节点到叶子节点路径总和等于给定目标和的路径。
 * 说明: 叶子节点是指没有子节点的节点。
 * 示例:
 * 给定如下二叉树，以及目标和 sum = 22，
 *               5
 *              / \
 *             4   8
 *            /   / \
 *           11  13  4
 *          /  \    / \
 *         7    2  5   1
 * 返回:
 * [
 *    [5,4,11,2],
 *    [5,8,4,5]
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
 * @param {number} sum
 * @return {number[][]}
 */
var pathSum = function(root, sum) {
  if (!root) return []
  const res = []
  const helper = (node, now, nowArr) => {
    if (!node) return 
    nowArr = [...nowArr, node.val]; 
    now += node.val
    if (!node.left && !node.right && now == sum) {
      res.push(nowArr)
      return
    }
    helper(node.left, now, nowArr)
    helper(node.right, now, nowArr)
  }
  helper(root, 0, [])
  return res
};