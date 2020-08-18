/**
 * 2020/08/18 每日一题 109. 有序链表转换二叉搜索树
 * 给定一个单链表，其中的元素按升序排序，将其转换为高度平衡的二叉搜索树。
 * 本题中，一个高度平衡二叉树是指一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过 1。
 * 示例:
 * 给定的有序链表： [-10, -3, 0, 5, 9],
 * 一个可能的答案是：[0, -3, 9, -10, null, 5], 它可以表示下面这个高度平衡二叉搜索树：
 *
 *       0
 *      / \
 *    -3   9
 *    /   /
 *  -10  5
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {ListNode} head
 * @return {TreeNode}
 */
// 有序链表转成有序数组 时间复杂度O(N)  空间复杂度O(N)
var sortedListToBST = function (head) {
  const arr = [];
  while (head) {
    arr.push(head.val);
    head = head.next;
  }
  const buildBST = (start, end) => {
    if (start > end) return null;
    const mid = (start + end) >>> 1;
    const root = new TreeNode(arr[mid]);
    root.left = buildBST(start, mid - 1);
    root.right = buildBST(mid + 1, end);
    return root;
  };
  return buildBST(0, arr.length - 1);
};

// 快慢指针法 时间复杂度O(nlogn) 空间复杂度	O(logn)
var sortedListToBST = function (head) {
	if (head == null) return null
	let slow = head, fast = head, preSlow
	while (fast && fast.next) {
		preSlow = slow
		slow = slow.next
		fast = fast.next.next
	}
	const root = new TreeNode(slow.val)
	if (preSlow != null) {
		preSlow.next = null
		root.left = sortedListToBST(head)
	}
	root.right = sortedListToBST(slow.next)
	return root
};

// 中序遍历策略优化 时间复杂度O(N)  空间复杂度O(logN)
var sortedListToBST = function (head) {
	if (head == null) return null
	let len = 0, h = head // h初始指向head头节点
	while (head) {
		len++ // 更新链表长度
		head = head.next
	}
	const buildBST = (start, end) => {
		if (start > end) return null
		const mid = (start + end) >>> 1
		const left = buildBST(start, mid - 1)
		const root = new TreeNode(h.val)
		root.left = left
		h = h.next
		root.right = buildBST(mid + 1, end) // 构建当前root的右子树
		return root
	}
	return buildBST(0, len - 1)
}
