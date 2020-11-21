/**
 * 2020/11/21 每日一题 148. 排序链表
 * 给你链表的头结点 head ，请将其按 升序 排列并返回 排序后的链表 。
 * 进阶：
 * 
 * 你可以在 O(n log n) 时间复杂度和常数级空间复杂度下，对链表进行排序吗？
 * https://leetcode-cn.com/problems/sort-list/
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

function findMiddleNode(head) {
  if (head === null || head.next === null) return head;
  let slow = head;
  let fast = head.next.next;
  while (fast && fast.next) {
    fast = fast.next.next;
    slow = slow.next;
  }
  return slow;
}

function merge(l1, l2) {
  if (l1 && l2) {
    const head = new ListNode();
    let current = head;
    while (l1 && l2) {
      if (l1.val < l2.val) {
        current.next = l1;
        l1 = l1.next;
      } else {
        current.next = l2;
        l2 = l2.next;
      }
      current = current.next;
    }
    l1 ? (current.next = l1) : (current.next = l2);
    return head.next;
  } else if (l1) {
    return l1;
  } else {
    return l2;
  }
}

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var sortList = function (head) {
  if (head === null || head.next === null) return head;
  // 找到终点
  const midNode = findMiddleNode(head);
  // 找到第二段的起始点
  const rightNode = midNode.next;
  // 从中点切断
  midNode.next = null;
  const leftStart = sortList(head);
  const rightStart = sortList(rightNode);
  // 合并两个子链表
  return merge(leftStart, rightStart);
};
