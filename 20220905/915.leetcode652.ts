/**
 * 2022/09/05 每日一题 652. 寻找重复的子树
 * https://leetcode.cn/problems/find-duplicate-subtrees/
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

 function findDuplicateSubtrees(root: TreeNode | null): Array<TreeNode | null> {
    const seen = new Map()
    const repeat = new Set()
    let idx = 0
    const dfs = (node) => {
        if (!node) {
            return 0
        }
        const tri = [node.val, dfs(node.left), dfs(node.right)]
        const hash = tri.toString()
        if (seen.has(hash)) {
            const pair = seen.get(hash)
            repeat.add(pair[0])
            return pair[1]
        } else {
            seen.set(hash, [node, ++idx])
            return idx
        }
    }
    dfs(root)
    return [...repeat] as TreeNode[]
};