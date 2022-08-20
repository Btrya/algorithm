/**
 * 2022/08/20 每日一题 654. 最大二叉树
 * https://leetcode.cn/problems/maximum-binary-tree/
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
function constructMaximumBinaryTree(nums: number[]): TreeNode | null {
  const n = nums.length
  const stack = []
  const tree = new Array(n).fill(0)
  for (let i = 0; i < n; ++i) {
    tree[i] = new TreeNode(nums[i])
    while (stack.length && nums[i] > nums[stack[stack.length - 1]]) {
      tree[i].left = tree[stack[stack.length - 1]]
      stack.pop()
    }
    if (stack.length) {
      tree[stack[stack.length - 1]].right = tree[i]
    }
    stack.push(i)
  }
  return tree[stack[0]]
}
