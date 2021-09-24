/**
 * 2021/09/24 每日一题 430. 扁平化多级双向链表
 * https://leetcode-cn.com/problems/flatten-a-multilevel-doubly-linked-list/
 */
/**
 * // Definition for a Node.
 * function Node(val,prev,next,child) {
 *    this.val = val;
 *    this.prev = prev;
 *    this.next = next;
 *    this.child = child;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
 */
var flatten = function (head) {
  const dfs = (node) => {
    let cur = node;
    // 记录链表的最后一个节点
    let last = null;
    while (cur) {
      let next = cur.next;
      //  如果有子节点，那么首先处理子节点
      if (cur.child) {
        const childLast = dfs(cur.child);
        next = cur.next;
        //  将 node 与 child 相连
        cur.next = cur.child;
        cur.child.prev = cur;
        //  如果 next 不为空，就将 last 与 next 相连
        if (next != null) {
          childLast.next = next;
          next.prev = childLast;
        }
        // 将 child 置为空
        cur.child = null;
        last = childLast;
      } else {
        last = cur;
      }
      cur = next;
    }
    return last;
  }
  dfs(head);
  return head;
};

// 方便理解的dfs
const dfs = (pre, cur) => {
  if (cur === null) return pre
  pre.next = cur
  cur.prev = pre
  const next = cur.next
  const tail = dfs(cur, cur.child) // 这里由于dfs开头判空处理了，所以如果没有的话直接拿到cur
  cur.child = null // child去链接
  return dfs(tail, next)
}
const flatten = (head) => {
  if (head === null) return null
  let pre = new Node(0, null, head, null)
  dfs(pre, head)
  pre.next.prev = null
  return pre.next
}