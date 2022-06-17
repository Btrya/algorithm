/**
 * 2022/06/18 每日一题 剑指 Offer II 029. 排序的循环链表
 * https://leetcode.cn/problems/4ueAj6/
 */
/**
 * Definition for node.
 * class Node {
 *     val: number
 *     next: Node | null
 *     constructor(val?: number, next?: Node) {
 *         this.val = (val===undefined ? 0 : val);
 *         this.next = (next===undefined ? null : next);
 *     }
 * }
 */
class NodeInsert {
  val: number
  next: NodeInsert | null
  constructor(val?: number, next?: NodeInsert) {
    this.val = val === undefined ? 0 : val
    this.next = next === undefined ? null : next
  }
}
function insert(head: NodeInsert | null, insertVal: number): NodeInsert | null {
  const node = new NodeInsert(insertVal)
  // 没有点的情况
  if (!head) {
    node.next = node
    return node
  }
  // 只有一个点的情况 互相next
  if (head.next === head) {
    head.next = node
    node.next = head
    return head
  }
  let curr = head, next = head.next
  while (next !== head) {
    // 当目标值比当前的值大，比下一个点的值小，那么就是找到位置了 直接break
    if (insertVal >= curr.val && insertVal <= next.val) break
    // 如果现在的值比下一个大，说明是递减了，可能是到了环的边缘
    if (curr.val > next.val) {
      // 此时判断 插入值 比当前的值大 或者 比下一个值小 那么都可以插入
      if (insertVal > curr.val || insertVal < next.val) break
    }
    curr = curr.next
    next = next.next
  }
  curr.next = node
  node.next = next
  return head
}
