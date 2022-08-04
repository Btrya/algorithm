/**
 * 2022/08/05 每日一题 623. 在二叉树中增加一行
 * https://leetcode.cn/problems/add-one-row-to-tree/
 */
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function addOneRow(
  root: TreeNode | null,
  val: number,
  depth: number
): TreeNode | null {
  if (!root) {
    return null
  }
  if (depth === 1) {
    return new TreeNode(val, root, null)
  }
  if (depth === 2) {
    root.left = new TreeNode(val, root.left, null)
    root.right = new TreeNode(val, null, root.right)
  } else {
    root.left = addOneRow(root.left, val, depth - 1)
    root.right = addOneRow(root.right, val, depth - 1)
  }
  return root
}
