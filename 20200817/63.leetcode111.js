/**
 * 2020/08/21 每日一题 111.二叉树的最小深度
 * 给定一个二叉树，找出其最小深度。
 * 最小深度是从根节点到最近叶子节点的最短路径上的节点数量。
 * 说明: 叶子节点是指没有子节点的节点。
 * 示例:
 * 给定二叉树 [3,9,20,null,null,15,7],
 *
 *     3
 *    / \
 *   9  20
 *     /  \
 *    15   7
 * 返回它的最小深度  2
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
 * @return {number}
 */
// 深度优先搜索 时间复杂度O(n) 最坏情况下，空间复杂度O(n) 最优情况下,空间复杂度O(log n)
var minDepth = function (root) {
  if (!root) return 0;
  if (root.left == null && root.right == null) return 1;
  let depth = Number.MAX_VALUE;
  if (root.left) {
    depth = Math.min(minDepth(root.left), depth);
  }
  if (root.right) {
    depth = Math.min(minDepth(root.right), depth);
  }
  return depth + 1;
};

// 广度优先搜索 时间复杂度O(n) 空间复杂度O(n)
var minDepth = function (root) {
  if (!root) return 0;
  let queue = [root];
  let depth = 1;
  while (queue.length) {
    const levelSize = queue.length;
    for (let i = 0; i < levelSize; i++) {
      const cur = queue.shift();
      if (cur.left == null && cur.right == null) return depth;
      if (cur.left) queue.push(cur.left);
      if (cur.right) queue.push(cur.right);
    }
    depth++;
  }
};
