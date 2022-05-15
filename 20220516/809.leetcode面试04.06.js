/**
 * 2022/05/16 每日一题 面试题 04.06. 后继者
 * https://leetcode.cn/problems/successor-lcci/
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
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
 * @param {TreeNode} p
 * @return {TreeNode}
 */
var inorderSuccessor = function (root, p) {
  const stack = []
  let index = -1
  function inorderTraversal(root) {
    if (!root) return
    inorderTraversal(root.left)
    if (root.val === p.val) index = stack.length
    stack.push(root)
    inorderTraversal(root.right)
  }
  inorderTraversal(root)
  return index === -1 ? null : stack[index + 1]
}

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @return {TreeNode}
 */
 var inorderSuccessor = function(root, p) {
  let currentIsTure = false
  let res = null
  function inorderTraversal(root) {
      if (!root) return
      inorderTraversal(root.left)
      if (res) return
      if (currentIsTure) {
          res = root
          return
      }
      if (root.val === p.val) currentIsTure = true
      inorderTraversal(root.right)
  }
  inorderTraversal(root)
  return res
};