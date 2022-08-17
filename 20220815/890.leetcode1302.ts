/**
 * 2022/08/17 每日一题 1302. 层数最深叶子节点的和
 * https://leetcode.cn/problems/deepest-leaves-sum/
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

 function deepestLeavesSum(root: TreeNode | null): number {
    const res = []
    const dfs = (node, depth) => {
        if (!node) return
        if (res[depth]) res[depth].push(node.val)
        else res[depth] = [node.val]
        if (node.left) dfs(node.left, depth + 1)
        if (node.right) dfs(node.right, depth + 1)
    }
    dfs(root, 0)
    return res[res.length - 1].reduce((total, item) => total += Number(item), 0)
};