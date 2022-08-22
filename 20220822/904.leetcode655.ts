/**
 * 2022/08/22 每日一题 655. 输出二叉树
 * https://leetcode.cn/problems/print-binary-tree/
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
 * } 1 3 7 15 
 */

 function printTree(root: TreeNode | null): string[][] {
    const calDepth = (root) => {
        let h = 0
        if (root.left) {
            h = Math.max(h, calDepth(root.left) + 1)
        }
        if (root.right) {
            h = Math.max(h, calDepth(root.right) + 1)
        }
        return h
    }

    const dfs = (res, root, r, c, height) => {
        res[r][c] = root.val.toString()
        if (root.left) {
            dfs(res, root.left, r + 1, c - (1 << (height - r - 1)), height)
        }
        if (root.right) {
            dfs(res, root.right, r + 1, c + (1 << (height - r - 1)), height)
        }
    }

    const height = calDepth(root)
    const m = height + 1
    const n = (1 << (height + 1)) - 1
    const res = new Array(m).fill(0).map(() => new Array(n).fill(''))
    dfs(res, root, 0, Math.floor((n - 1) / 2), height)
    return res
};