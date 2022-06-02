/**
 * 2022/06/02 每日一题 450. 删除二叉搜索树中的节点
 * https://leetcode.cn/problems/delete-node-in-a-bst/
 */
var deleteNode = function (root, key) {
  // 边界条件
  if (root === null) return null
  // 当前这个节点就是目标 key
  if (root.val === key) {
    // 第一种情况：没有任何子节点
    if (!root.left && !root.right) return null
    // 只有右子节点
    if (!root.left) return root.right
    // 只有左子节点
    if (!root.right) return root.left
    // 记录右子树
    let curNode: TreeNode = root.right
    // 找到右子树最左侧节点
    while (curNode.left !== null) curNode = curNode.left
    // root的左子树当作当前节点的左子树
    curNode.left = root.left
    return root.right
  }
  if (root.val > key) root.left = deleteNode(root.left, key)
  if (root.val < key) root.right = deleteNode(root.right, key)
  return root
}
