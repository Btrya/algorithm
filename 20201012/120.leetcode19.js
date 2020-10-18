/**
 * 2020/10/18 每日一题 19. 删除链表的倒数第N个节点
 * 给定一个链表，删除链表的倒数第 n 个节点，并且返回链表的头结点。
 * 示例：
 * 给定一个链表: 1->2->3->4->5, 和 n = 2.
 * 当删除了倒数第二个节点后，链表变为 1->2->3->5.
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
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
  const dummy = new ListNode(0)
  dummy.next = head
  let l = dummy, r = dummy, offset = n + 1
  while (offset --) {
    r = r.next
    if (offset > 1 && r === null) return dummy.next
  }
  while (r) {
    r = r.next
    l = l.next
  }
  l.next = l.next.next
  return dummy.next
};