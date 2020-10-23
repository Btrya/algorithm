/**
 * 2020/10/23 每日一题 234. 回文链表
 * 请判断一个链表是否为回文链表。
 * 示例 1:
 * 输入: 1->2
 * 输出: false
 * 示例 2:
 * 输入: 1->2->2->1
 * 输出: true
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
// 先生成一个数组，然后双指针查 时间复杂度O(n)  O(n) 
var isPalindrome = function(head) {
  const vals = []
  while (head != null) {
    vals.push(head.val)
    head = head.next
  }
  for (let i = 0, j = vals.length - 1; i < j; i++, j--) {
    if (vals[i] != vals[j]) return false
  }
  return true
};

// 优化 时间复杂度：O(n) O(1)
var isPalindrome = function(head) {
  if (head == null) return true
  const endOfFirstHalf = (head) => {
    let fast = head, slow = head
    while (fast.next !== null && fast.next.next !== null) {
      fast = fast.next.next
      slow = slow.next
    }
    return slow
  }
  const reverseList = (head) => {
    let prev = null
    let cur = head
    while (cur !== null) {
      let nextTmep = cur.next
      cur.next = prev
      prev = cur
      cur = nextTmep
    }
    return prev
  }
  const firstHalfEnd = endOfFirstHalf(head)
  const secondHalfStart = reverseList(firstHalfEnd.next)
  let p1 = head, p2 = secondHalfStart, result = true
  while (result && p2 !== null) {
    if (p1.val != p2.val) return false
    p1 = p1.next
    p2 = p2.next
  }
  firstHalfEnd.next = reverseList(secondHalfStart)
  return result
};