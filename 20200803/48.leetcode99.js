/**
 * leetcode 每日一题 99.恢复二叉搜索树
 * 二叉搜索树中的两个节点被错误地交换。
 * 请在不改变其结构的情况下，恢复这棵树
 * 示例 1:
 * 输入: [1,3,null,null,2]
 * 
 *    1
 *   /
 *  3
 *   \
 *    2
 * 
 * 输出: [3,1,null,null,2]
 * 
 *    3
 *   /
 *  1
 *   \
 *    2
 * 示例 2:
 * 输入: [3,1,4,null,null,2]
 * 
 *   3
 *  / \
 * 1   4
 *    /
 *   2
 * 
 * 输出: [2,1,4,null,null,3]
 * 
 *   2
 *  / \
 * 1   4
 *    /
 *   3
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
 * @return {void} Do not return anything, modify root in-place instead.
 */
// 时间复杂度O(N) 空间复杂度O(N)
var recoverTree = function(root) {
    const inorder = (root, nums) => {
      if (!root) return
      inorder(root.left, nums)
      nums.push(root.val)
      inorder(root.right, nums)
    }
    const findTwoSwapped = (nums) => {
      const n = nums.length
      let x = -1, y = -1
      for (let i = 0; i < n -1; i++) {
        if (nums[i + 1] < nums[i]) {
          y = nums[i + 1]
          if (x === -1) x = nums[i]
          else break;
        }
      }
      return [x, y]
    }
    const recover = (r, count, x, y) => {
      if (r !== null) {
        if (r.val === x || r.val === y) {
          r.val = r.val === x ? y : x
          if (--count == 0) return
        }
        recover(r.left, count, x, y)
        recover(r.right, count, x, y)
      }
    }
    let nums = []
    inorder(root, nums)
    const [first, second] = findTwoSwapped(nums)
    recover(root, 2, first, second)
};