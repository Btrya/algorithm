/**
 * 2020/10/13 每日一题 24. 两两交换链表中的节点
 * 给定一个链表，两两交换其中相邻的节点，并返回交换后的链表。
 * 你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。
 * 示例:
 * 给定 1->2->3->4, 你应该返回 2->1->4->3.
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
 * @return {ListNode}
 */
// 递归 时间复杂度O(n) 空间复杂度O(n)
var swapPairs = function(head) {
  if (head === null || head.next === null) return head
  const newHead = head.next
  head.next = swapPairs(newHead.next)
  newHead.next = head
  return newHead
};

// 迭代  时间复杂度O(n) 空间复杂度O(1)
var swapPairs = function(head) {
  const dummyHead = new ListNode(0)
  dummyHead.next = head
  let temp = dummyHead
  while (temp.next !== null && temp.next.next !== null) {
    const node1 = temp.next
    const node2 = temp.next.next
    temp.next = node2
    node1.next = node2.next
    node2.next = node1
    temp = node1
  }
  return dummyHead.next
};