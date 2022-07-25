/**
 * 2022/07/25 每日一题 919. 完全二叉树插入器
 * https://leetcode.cn/problems/complete-binary-tree-inserter/
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

 class CBTInserter {
    private p: TreeNode[]
    constructor(root: TreeNode) {
        this.p = [root]
        for (const r of this.p) {
            r.left && this.p.push(r.left)
            r.right && this.p.push(r.right)
        }
    }

    insert(v: number): number {
        const n = this.p.length
        const father = this.p[(n - 1) >> 1]
        this.p.push(new TreeNode(v))
        father[n & 1 ? 'left': 'right'] = this.p[n]
        return father.val
    }

    get_root(): TreeNode | null {
        return this.p[0]
    }
}

/**
 * Your CBTInserter object will be instantiated and called as such:
 * var obj = new CBTInserter(root)
 * var param_1 = obj.insert(val)
 * var param_2 = obj.get_root()
 */