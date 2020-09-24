/**
 * 2020/09/24 每日一题  501. 二叉搜索树中的众数
 * 给定一个有相同值的二叉搜索树（BST），找出 BST 中的所有众数（出现频率最高的元素）。
 * 假定 BST 有如下定义：
 * 结点左子树中所含结点的值小于等于当前结点的值
 * 结点右子树中所含结点的值大于等于当前结点的值
 * 左子树和右子树都是二叉搜索树
 * 例如：
 * 给定 BST [1,null,2,2],
 * 
 *    1
 *     \
 *      2
 *     /
 *    2
 * 返回[2].
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var findMode = function(root) {
  let base = 0, count = 0, maxCount = 0
  let ans = []
  const update = (x) => {
    if (x === base) {
      ++count
    } else {
      count = 1
      base = x
    }
    if (count === maxCount) {
      ans.push(base)
    }
    if (count > maxCount) {
      maxCount = count
      ans = [base]
    }
  }
  let cur = root, pre = null
  while (cur !== null) {
    if (cur.left == null) {
      update(cur.val)
      cur = cur.right
      continue
    }
    pre = cur.left
    while (pre.right != null && pre.right !== cur) {
      pre = pre.right
    }
    if (pre.right == null) {
      pre.right = cur
      cur = cur.left
    } else {
      pre.right = null
      update(cur.val)
      cur = cur.right
    }
  }
  return ans
};