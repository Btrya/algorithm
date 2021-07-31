/**
 * 2021/07/31 每日一题 987. 二叉树的垂序遍历
 * https://leetcode-cn.com/problems/vertical-order-traversal-of-a-binary-tree/
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var verticalTraversal = function(root) {
  const nodes = []
  dfs(root, 0, 0, nodes)
  nodes.sort((a, b) => {
    if (a[0] !== b[0]) {
      return a[0] - b[0]
    } else if (a[1] !== b[1]) {
      return a[1] - b[1]
    } else {
      return a[2] - b[2]
    }
  })
  let lastCol = Number.MIN_SAFE_INTEGER
  const ans = []
  for (const node of nodes) {
    const col = node[0], row = node[1], value = node[2]
    if (lastCol !== col) {
      lastCol = col
      ans.push([])
    }
    ans[ans.length - 1].push([value])
  }
  return ans
};
const dfs = (node, row, col, nodes) => {
  if (node === null) return 
  nodes.push([col, row, node.val])
  dfs(node.left, row + 1, col - 1, nodes)
  dfs(node.right, row + 1, col + 1, nodes)
}