/**
 * 2020/09/12 每日一题 637. 二叉树的层平均值
 * 给定一个非空二叉树, 返回一个由每层节点平均值组成的数组。
 * 示例 1：
 * 
 * 输入：
 *     3
 *    / \
 *   9  20
 *     /  \
 *    15   7
 * 输出：[3, 14.5, 11]
 * 解释：
 * 第 0 层的平均值是 3 ,  第1层是 14.5 , 第2层是 11 。因此返回 [3, 14.5, 11] 。
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
// dfs 时间复杂度O(n)  空间复杂度O(n)
var averageOfLevels = function(root) {
  let counts = []
  let sums = []
  const dfs = (node, level) => {
    if (!node) return
    if (level < sums.length) {
      sums[level] += node.val
      counts[level] ++
    } else {
      sums.push(node.val)
      counts.push(1)
    }
    dfs(node.left, level + 1)
    dfs(node.right, level + 1)
  }
  dfs(root, 0)
  const res = []
  for (let i = 0; i < sums.length; i++) {
    res.push(sums[i] / counts[i])
  }
  return res
};

// bfs 时间复杂度O(n)  空间复杂度O(n)
var averageOfLevels = function(root) {
  const res = []
  const queue = [root]
  while (queue.length) {
    let sum = 0, size = queue.length
    for (let i = 0; i < size; i++) {
      let node = queue.shift()
      sum += node.val
      let left = node.left, right = node.right
      if (!left) queue.push(node.left)
      if (!right) queue.push(node.right)
    }
    res.push(sum / size)
  }
  return res
}