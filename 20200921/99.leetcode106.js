/**
 * 2020/09/25 每日一题 106. 从中序与后序遍历序列构造二叉树
 * 根据一棵树的中序遍历与后序遍历构造二叉树。
 * 注意:
 * 你可以假设树中没有重复的元素。
 * 
 * 例如，给出
 * 
 * 中序遍历 inorder = [9,3,15,20,7]
 * 后序遍历 postorder = [9,15,7,20,3]
 * 返回如下的二叉树：
 * 
 *     3
 *    / \
 *   9  20
 *     /  \
 *    15   7
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
// 递归 时间复杂度O(n) 空间复杂度O(n)
var buildTree = function(inorder, postorder) {
  let post_idx
  const idx_map = new Map()
  const helper = (in_left, in_right) => {
    if (in_left > in_right) return null  // 没有节点构建二叉树了
    const root_val = postorder[post_idx]  // 选择post_idx位置的元素作为当前子树根节点
    const root = new TreeNode(root_val)
    const index = idx_map.get(root_val) // 根据root所在位置分成左右两棵子树
    post_idx -- // 下标减一
    root.right = helper(index + 1, in_right) // 构造右子树
    root.left = helper(in_left, index - 1)
    return root
  }
  post_idx = postorder.length - 1 // 从后序遍历的最后一个元素开始
  let idx = 0
  inorder.forEach((val, idx) => {
    idx_map.set(val, idx)
  })
  return helper(0, inorder.length - 1)
};

// 迭代
var buildTree = function(inorder, postorder) {
  if (postorder.length == 0) return null
  const root = new TreeNode(postorder[postorder.length - 1])
  const stack = []
  stack.push(root)
  let inorderIndex = inorder.length - 1
  for (let i = postorder.length - 2; i >= 0; i--) {
    let postorderVal = postorder[i]
    let node = stack[stack.length - 1]
    if (node.val !== inorder[inorderIndex]) {
      node.right = new TreeNode(postorderVal)
      stack.push(node.right)
    } else {
      while (stack.length && stack[stack.length - 1].val === inorder[inorderIndex]) {
        node = stack.pop()
        inorderIndex--
      }
      node.left = new TreeNode(postorderVal)
      stack.push(node.left)
    }
  }
  return root
};