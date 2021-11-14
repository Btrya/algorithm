/**
 * 2021/11/14 周赛 第二题 5927. 反转偶数长度组的节点
 * 给你一个链表的头节点 head 。
 * 
 * 链表中的节点 按顺序 划分成若干 非空 组，这些非空组的长度构成一个自然数序列（1, 2, 3, 4, ...）。一个组的 长度 就是组中分配到的节点数目。换句话说：
 * 
 * 节点 1 分配给第一组
 * 节点 2 和 3 分配给第二组
 * 节点 4、5 和 6 分配给第三组，以此类推
 * 注意，最后一组的长度可能小于或者等于 1 + 倒数第二组的长度 。
 * 
 * 反转 每个 偶数 长度组中的节点，并返回修改后链表的头节点 head 。
 * 
 *  
 * 
 * 示例 1：
 * 
 * 
 * 
 * 输入：head = [5,2,6,3,9,1,7,3,8,4]
 * 输出：[5,6,2,3,9,1,4,8,3,7]
 * 解释：
 * - 第一组长度为 1 ，奇数，没有发生反转。
 * - 第二组长度为 2 ，偶数，节点反转。
 * - 第三组长度为 3 ，奇数，没有发生反转。
 * - 最后一组长度为 4 ，偶数，节点反转。
 * 示例 2：
 * 
 * 
 * 
 * 输入：head = [1,1,0,6]
 * 输出：[1,0,1,6]
 * 解释：
 * - 第一组长度为 1 ，没有发生反转。
 * - 第二组长度为 2 ，节点反转。
 * - 最后一组长度为 1 ，没有发生反转。
 * 示例 3：
 * 
 * 
 * 
 * 输入：head = [2,1]
 * 输出：[2,1]
 * 解释：
 * - 第一组长度为 1 ，没有发生反转。
 * - 最后一组长度为 1 ，没有发生反转。
 * 示例 4：
 * 
 * 输入：head = [8]
 * 输出：[8]
 * 解释：只有一个长度为 1 的组，没有发生反转。
 *  
 * 
 * 提示：
 * 
 * 链表中节点数目范围是 [1, 105]
 * 0 <= Node.val <= 105
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
var reverseList = function (head) {
  let prev = null;
  let curr = head;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
};

var reverseEvenLengthGroups = function (head) {
  let now = 1;
  let slow = new ListNode();
  slow.next = head;
  let ret = slow;
  let fast = head;

  while (fast) {
    // 走
    let old = slow;
    // 走了几步
    let tmp = 0;
    while ((tmp < now) && fast) {
      fast = fast.next;
      slow = slow.next;
      tmp++;
    }
    // 要翻了..
    if ((tmp % 2 == 0)) {
      slow.next = null;
      let origin = old.next;
      old.next = reverseList(origin);
      origin.next = fast;
      slow = origin;
    }
    now++;
  }
  return ret.next;
};