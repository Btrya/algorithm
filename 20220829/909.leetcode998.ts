/**
 * 2022/08/30 每日一题 998. 最大二叉树 II
 * https://leetcode.cn/problems/maximum-binary-tree-ii/
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

 function insertIntoMaxTree(root: TreeNode | null, val: number): TreeNode | null {
    if (!root || val > root.val) return new TreeNode(val, root)
    root.right = insertIntoMaxTree(root.right, val)
    return root
};