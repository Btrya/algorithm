/**
 * 2022/08/27 每日一题 662. 二叉树最大宽度
 * https://leetcode.cn/problems/maximum-width-of-binary-tree/
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

 function widthOfBinaryTree(root: TreeNode | null): number {
    const queue: [TreeNode, bigint][] = [[root, 1n]]
    let max = -1
    while (queue.length) {
      const size = queue.length
      max = Math.max(max, Number(queue[queue.length - 1][1] - queue[0][1] + 1n))
      for (let i = 0; i < size; i++) {
        const [node, index] = queue.shift()
        node?.left && queue.push([node.left, index * 2n])
        node?.right && queue.push([node.right, index * 2n + 1n])
      }
    }
    return max
  };