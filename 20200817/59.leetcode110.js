/**
 * 2020/08/17 每日一题 leetcode 110.平衡二叉树
 * 给定一个二叉树，判断它是否是高度平衡的二叉树。
 * 本题中，一棵高度平衡二叉树定义为：
 * 一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过1。
 * 示例 1:
 * 给定二叉树 [3,9,20,null,null,15,7]
 * 
 *     3
 *    / \
 *   9  20
 *     /  \
 *    15   7
 * 返回 true 。
 * 示例 2:
 * 给定二叉树 [1,2,2,3,3,null,null,4,4]
 * 
 *        1
 *       / \
 *      2   2
 *     / \
 *    3   3
 *   / \
 *  4   4
 * 返回 false 。
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
 * @return {boolean}
 */
// 自顶向下递归 时间复杂度O(n^2) 空间复杂度O(n)
var isBalanced = function(root) {
    if (!root) return true
    function getDepth(node) {
        if (!node) return 0
        return Math.max(getDepth(node.left), getDepth(node.right)) + 1
    }
    return Math.abs(getDepth(root.left) - getDepth(root.right)) <= 1 && isBalanced(root.left) && isBalanced(root.right)
};

// 自底向上递归 时间复杂度O(n) 空间复杂度O(n)
var isBalanced = function(root) {
    function getDepth(node) {
        if (!node) return 0
        let leftDepth = getDepth(node.left)
        let rightDepth = getDepth(node.right)
        if (leftDepth == -1 || rightDepth == -1 || Math.abs(leftDepth - rightDepth) > 1) {
            return - 1
        } else {
            return Math.max(leftDepth, rightDepth) + 1
        }
    }
    return getDepth(root) >= 0
};
