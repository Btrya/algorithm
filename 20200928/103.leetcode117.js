/**
 * 2020/09/28 每日一题 117. 填充每个节点的下一个右侧节点指针 II
 * 给定一个二叉树
 * struct Node {
 *   int val;
 *   Node *left;
 *   Node *right;
 *   Node *next;
 * }
 * 填充它的每个 next 指针，让这个指针指向其下一个右侧节点。如果找不到下一个右侧节点，则将 next 指针设置为 NULL。
 * 初始状态下，所有 next 指针都被设置为 NULL。
 * 进阶：
 * 
 * 你只能使用常量级额外空间。
 * 使用递归解题也符合要求，本题中递归程序占用的栈空间不算做额外的空间复杂度。
 * 示例：
 * 输入：root = [1,2,3,4,5,null,7]
 * 输出：[1,#,2,3,#,4,5,7,#]
 * 解释：给定二叉树如图 A 所示，你的函数应该填充它的每个 next 指针，以指向其下一个右侧节点，如图 B 所示。
 * https://leetcode-cn.com/problems/populating-next-right-pointers-in-each-node-ii/
 */
/**
 * // Definition for a Node.
 * function Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */

/**
 * @param {Node} root
 * @return {Node}
 */
// 时间复杂度O(N)  空间复杂度O(N)
var connect = function(root) {
  if (!root) return null
  const queue = [root]
  while (queue.length) {
    const n = queue.length
    let last = null
    for (let i = 1; i <= n; i++) {
      let f = queue.shift()
      if (f.left !== null) queue.push(f.left)
      if (f.right !== null) queue.push(f.right)
      if (i !== 1) last.next = f
      last = f
    }
  } 
  return root 
};

// 时间复杂度O(N)  空间复杂度O(1)
var connect = function(root) {
  if (!root) return null
  let last = null, nextStart = null
  const handle = (p) => {
    if (last !== null) last.next = p
    if (nextStart === null) nextStart = p
    last = p
  }
  let start = root
  while (start != null) {
    last = null
    nextStart = null
    for (let p = start; p !== null; p = p.next) {
      if (p.left !== null) handle(p.left)
      if (p.right !== null) handle(p.right)
    }
    start = nextStart
  }
  return root
}