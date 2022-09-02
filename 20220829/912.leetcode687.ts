/**
 * 2022/09/02 每日一题 687. 最长同值路径
 * https://leetcode.cn/problems/longest-univalue-path/
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

 function longestUnivaluePath(root: TreeNode | null): number {
    let res = 0
    const dfs = (node: TreeNode): number => {
        if (!node) return 0
        let left = dfs(node.left), right = dfs(node.right)
        let left1 = 0, right1 = 0
        if (node.left && node.left.val === node.val) {
            left1 = left + 1
        }
        if (node.right && node.right.val === node.val) {
            right1 = right + 1
        }
        res = Math.max(res, left1 + right1)
        return Math.max(left1, right1)
    }
    dfs(root)
    return res
};