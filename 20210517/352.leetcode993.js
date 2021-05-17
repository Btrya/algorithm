/**
 * 2021/05/17 每日一题 993.二叉树的堂兄弟节点
 * 在二叉树中，根节点位于深度 0 处，每个深度为 k 的节点的子节点位于深度 k+1 处。
 * 
 * 如果二叉树的两个节点深度相同，但 父节点不同 ，则它们是一对堂兄弟节点。
 * 
 * 我们给出了具有唯一值的二叉树的根节点 root ，以及树中两个不同节点的值 x 和 y 。
 * 
 * 只有与值 x 和 y 对应的节点是堂兄弟节点时，才返回 true 。否则，返回 false。
 * 
 * 示例 1：
 * 
 * 输入：root = [1,2,3,4], x = 4, y = 3
 * 输出：false
 * 示例 2：
 * 
 * 输入：root = [1,2,3,null,4,null,5], x = 5, y = 4
 * 输出：true
 * 示例 3：
 * 
 * 输入：root = [1,2,3,null,4], x = 2, y = 3
 * 输出：false
 * 
 * 提示：
 * 
 * 二叉树的节点数介于 2 到 100 之间。
 * 每个节点的值都是唯一的、范围为 1 到 100 的整数。
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
 * @param {number} x
 * @param {number} y
 * @return {boolean}
 */
// BFS
 var isCousins = function(root, x, y) {
  // x的信息
  let x_parent = null, x_depth = null, x_found = false  
  // y的信息
  let y_parent = null, y_depth = null, y_found = false
  // 用来判断是否遍历到 x 或 y 的辅助函数
  const update = (node, parent, depth) => {
    if (node.val === x) {
      [x_parent, x_depth, x_found] = [parent, depth, true]
    } else if (node.val === y) {
      [y_parent, y_depth, y_found] = [parent, depth, true]
    }
  }  
  q = [[root, 0]]
  update(root, null, 0)
  while (q.length) {
    const [node, depth] = q.shift()
    if (node.left) {
      q.push([node.left, depth + 1])
      update(node.left, node, depth + 1)
    }
    if (node.right) {
      q.push([node.right, depth + 1])
      update(node.right, node, depth + 1)
    }
    if (x_found && y_found) break // 都找到了 直接结束循环
  }
  return x_depth === y_depth && y_parent !== x_parent
};