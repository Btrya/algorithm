/**
 * 2020/10/20 每日一题 143. 重排链表
 * 给定一个单链表 L：L0→L1→…→Ln-1→Ln ，
 * 将其重新排列后变为： L0→Ln→L1→Ln-1→L2→Ln-2→…
 * 你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。
 * 示例 1:
 * 
 * 给定链表 1->2->3->4, 重新排列为 1->4->2->3.
 * 示例 2:
 * 
 * 给定链表 1->2->3->4->5, 重新排列为 1->5->2->4->3.
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
 */
// 利用数组记录链表
var reorderList = function(head) {
  let stack = [], node = head
  if (!node) return
  while (node) {
    stack.push(node)  // 记录每一个节点
    node = node.next
  }
  let len = stack.length
  node = head  // 回到头节点
  for (let i = 0; i < len; i++) {
    if (i % 2 == 0) node.next = stack.shift()  // 根据是奇数还是偶数个来决定取链表头或者链表末
    else node.next = stack.pop()
    node = node.next
  }
  node.next = null // 最末节点为null
};

var reorderList = function(head) {
  if (!head) return
  const m = {}
  let i = 0, t = head
  while (t) {
    m[i++] = t
    t = t.next
  }
  for (let j = 0, k = (i >> 1) + 1; j < k; j++) {
    if (j < i - j -1) {
      m[j].next = m[i - j - 1]
      m[i - j - 1].next = m[j + 1]
    } else {
      m[j].next = null
    }
  }
};