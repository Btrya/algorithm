/**
 * 2021/11/26 每日一题 700. 二叉搜索树中的搜索
 * 给定二叉搜索树（BST）的根节点和一个值。 你需要在BST中找到节点值等于给定值的节点。 返回以该节点为根的子树。 如果节点不存在，则返回 NULL。
 * 
 * 例如，
 * 
 * 给定二叉搜索树:
 * 
 *         4
 *        / \
 *       2   7
 *      / \
 *     1   3
 * 
 * 和值: 2
 * 你应该返回如下子树:
 * 
 *       2     
 *      / \   
 *     1   3
 * 在上述示例中，如果要找的值是 5，但因为没有节点值为 5，我们应该返回 NULL。
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
 * @param {number} val
 * @return {TreeNode}
 */
var searchBST = function(root, val) {
  let stack = [root]
  while(stack.length) {
    const node = stack.shift()
    if (node.val == val) return node
    else if (node.val > val && node.left) stack.push(node.left)
    else if (node.val < val && node.right) stack.push(node.right)
  }
  return null
};