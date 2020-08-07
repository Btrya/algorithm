/**
 * 2020/08/07 每日一题 leetcode 100.相同的树
 * 给定两个二叉树，编写一个函数来检验它们是否相同。
 * 如果两个树在结构上相同，并且节点具有相同的值，则认为它们是相同的。
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
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
// 直接匹配两个数组是否完全相等
var isSameTree = function(p, q) {
    return  JSON.stringify(p) == JSON.stringify(q)
};

// 深度优先搜索 时间复杂度O(min(m, n))  O(min(m, n))
var isSameTree = function(p, q) {
    if (p == null && q == null) return true
    else if (p == null || q == null) return false 
    else if (p.val != q.val) return false
    else return isSameTree(p.left, q.left) && isSameTree(p.right, q.right)
};

// 广度优先搜索
var isSameTree = function(p, q) {
    if (p == null && q == null) return true
    else if (p == null || q == null) return false 
    let queue1 = [], queue2 = []
    queue1.push(p)
    queue2.push(q)
    while (queue1.length && queue2.length) {
        const node1 = queue1.shift()
        const node2 = queue2.shift()
        if (node1.val != node2.val) return false
        let left1 = node1.left, right1 = node1.right, left2 = node2.left, right2 = node2.right
        if (left1 == null ^ left2 == null) return false
        if (right1 == null ^ right2 == null) return false
        if (left1 != null) queue1.push(left1)
        if (right1 != null) queue1.push(right1)
        if (left2 != null) queue2.push(left2)
        if (right2 != null) queue2.push(right2)
    }
    return queue1.length && queue2.length
};