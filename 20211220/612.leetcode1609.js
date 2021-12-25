/**
 * 2021/12/25 每日一题 1609. 奇偶树
 * https://leetcode-cn.com/problems/even-odd-tree/
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
 * @return {boolean}
 */
 var isEvenOddTree = function(root) {
  const queue = []
  queue.push(root)
  let level = 0
  while (queue.length) {
    const size = queue.length
    let prev = level % 2 == 0 ? -Number.MAX_SAFE_INTEGER : Number.MAX_SAFE_INTEGER
    for (let i = 0; i < size; ++i) {
      const node = queue.shift()
      const value = node.val
      if (level % 2 === value % 2) return false 
      if ((level % 2 === 0 && value <= prev) || (level % 2 === 1 && value >= prev)) return false
      prev = value 
      if (node.left) queue.push(node.left)
      if (node.right) queue.push(node.right) 
    }
    level++
  }
  return true
};