/**
 * 2021/04/13 每日一题 783. 二叉搜索树节点最小距离
 * 给你一个二叉搜索树的根节点 root ，返回 树中任意两不同节点值之间的最小差值 。
 * 
 * 注意：本题与 530：https://leetcode-cn.com/problems/minimum-absolute-difference-in-bst/ 相同
 * 示例 1：
 * 
 * 
 * 输入：root = [4,2,6,1,3]
 * 输出：1
 * 示例 2：
 * 
 * 
 * 输入：root = [1,0,48,null,null,12,49]
 * 输出：1
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
 * @return {number}
 */
 var minDiffInBST = function(root) {
  if(!root) return root
  let min = Infinity
  let stack = []
  let cur = root
  let pre = null
  while(stack.length || cur){
      while(cur){
          stack.push(cur)
          cur = cur.left
      }
      cur = stack.pop()
      if (pre) min = Math.min(cur.val - pre.val, min)
      pre = cur
      cur = cur.right
  }
  return min
};