/**
 * 2021/07/22 加餐*2 101. 对称二叉树
 * 给定一个二叉树，检查它是否是镜像对称的。
 * 
 * 例如，二叉树 [1,2,2,3,4,4,3] 是对称的。
 * 
 *     1
 *    / \
 *   2   2
 *  / \ / \
 * 3  4 4  3
 *  
 * 
 * 但是下面这个 [1,2,2,null,3,null,3] 则不是镜像对称的:
 * 
 *     1
 *    / \
 *   2   2
 *    \   \
 *    3    3
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
// 递归
 var isSymmetric = function(root) {
  const check = (p, q) => {
    if (!p && !q) return true
    if (!p || !q) return false
    return p.val === q.val && check(p.left, q.right) && check(p.right, q.left)
  }
  return check(root, root)
};

// 迭代
var isSymmetric = function(root) {
  const check = (v1, v2) => {
    let q = []
    q.push(v1)
    q.push(v2)

    while(q.length) {
      v1 = q.shift()
      v2 = q.shift()
      if (!v1 && !v2) continue
      if ((!v1 || !v2) || (v1.val !== v2.val)) return false

      q.push(v1.left)
      q.push(v2.right)

      q.push(v1.right)
      q.push(v2.left)
    }
    return true
  }

  return check(root, root)
};