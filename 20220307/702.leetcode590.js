/**
 * 2022/03/12 每日一题 590. N 叉树的后序遍历
 * https://leetcode-cn.com/problems/n-ary-tree-postorder-traversal/
 */
/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node|null} root
 * @return {number[]}
 */
var postorder = function (root) {
  const res = [];
  if (root == null) {
    return res;
  }
  const stack = [];
  const visited = new Set();
  stack.push(root);
  while (stack.length) {
    const node = stack[stack.length - 1];
    /* 如果当前节点为叶子节点或者当前节点的子节点已经遍历过 */
    if (node.children.length === 0 || visited.has(node)) {
      stack.pop();
      res.push(node.val);
      continue;
    }
    for (let i = node.children.length - 1; i >= 0; --i) {
      stack.push(node.children[i]);
    }
    visited.add(node);
  }
  return res;
};

var postorder = function (root) {
  const generate = (root, res) => {
    if (root == null) {
      return []
    }
    for (const ch of root.children) {
      generate(ch, res)
    }
    res.push(root.val)
    return res
  }
  return generate(root, [])
};