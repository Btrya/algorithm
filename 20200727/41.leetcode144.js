/**
 * 2020/08/02 每日一题 144.二叉树展开为链表 给定一个二叉树，原地将它展开为一个单链表。
 * */


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
 * @return {void} Do not return anything, modify root in-place instead.
 */
// 寻找前驱节点 时间复杂度O(n)  空间复杂度O(1)
var flatten = function(root) {
  let curr = root
  while (curr !== null) {
      if (curr.left !== null) {
          const next = curr.left
          let pre = next
          while (pre.right !== null) {
              pre = pre.right
          }
          pre.right = curr.right
          curr.left = null
          curr.right = next
      }
      curr = curr.right
  }
};

// 前序遍历和展开同步进行 复杂度都是O(n)
var flatten = function(root) {
  if(!root) return
  const stack = []
  stack.push(root)
  let prev = null
  while (stack.length) {
      const curr = stack.pop()
      if (prev !== null) {
          prev.left = null
          prev.right = curr
      }
      let left = curr.left, right = curr.right
      if (right !== null) stack.push(right)
      if (left !== null) stack.push(left)
      prev = curr
  }
};