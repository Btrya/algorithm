/**
 * 2020/09/29 每日一题 145. 二叉树的后序遍历
 * 给定一个二叉树，返回它的 后序 遍历。
 * 示例:
 * 输入: [1,null,2,3]  
 *    1
 *     \
 *      2
 *     /
 *    3 
 * 
 * 输出: [3,2,1]
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
 * @return {number[]}
 */
// 递归  时间复杂度O(N) 空间复杂度O(N)
var postorderTraversal = function(root) {
  let res = []
  const helper = (node, res) => {
    if (node == null) return
    helper(node.left, res)
    helper(node.right, res)
    res.push(node.val)
  }
  helper(root, res)
  return res
};

// 迭代  时间复杂度O(N) 空间复杂度O(N)
var postorderTraversal = function(root) {
  if (!root) return []
  let stack = []
  let res = []
  let prev = null
  while (root != null || stack.length) {
    while (root != null) {
      stack.push(root)
      root = root.left
    }
    root = stack.pop()
    if (root.right == null || root.right == prev) {
      res.push(root.val)
      prev = root
      root = null
    } else {
      stack.push(root)
      root = root.right
    }
  }
  return res
};

// morris 遍历  时间复杂度O(N) 空间复杂度O(1)
var postorderTraversal = function(root) {
  let res = []
  if (!root) return res
  const addPath = (res, node) => {
    let tmp = []
    while (node != null) {
      tmp.push(node.val)
      node = node .right
    }
    for (let i = tmp.length - 1; i >= 0; i--) {
      res.push(tmp[i])
    }
  }
  let p1 = root, p2 = null
  while (p1 != null) {
    p2 = p1.left
    if (p2 != null) {
      while (p2.right != null && p2.right != p1) {
        p2 = p2.right
      }
      if (p2.right == null) {
        p2.right = p1
        p1 = p1.left
        continue
      } else {
        p2.right = null
        addPath(res, p1.left)
      }
    }
    p1 = p1.right
  }
  addPath(res, root)
  return res
}