/**
 * 2021/03/27 每日一题 61. 旋转链表
 * 给你一个链表的头节点 head ，旋转链表，将链表每个节点向右移动 k 个位置。
 * 示例 1：
 * 
 * 
 * 输入：head = [1,2,3,4,5], k = 2
 * 输出：[4,5,1,2,3]
 * 示例 2：
 * 
 * 
 * 输入：head = [0,1,2], k = 4
 * 输出：[2,0,1]
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
 * @param {number} k
 * @return {ListNode}
 */
 var rotateRight = function(head, k) {
  if (k === 0 || !head || !head.next) return head
  // 使用n计数链表长度
  let n = 1
  let cur = head
  while (cur.next) {
    cur = cur.next
    n++
  }
  let add = n - k % n // 求出超过链表长度的最终k
  if (add === n) return head
  cur.next = head
  while (add) {
    cur = cur.next
    add--
  }
  const ret = cur.next
  cur.next = null
  return ret
};