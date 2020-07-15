/**
 * 树
 */

/**
 * 中序遍历
 * @param {TreeNode} root
 */

var inorderTraversal = function (root) {
  if (!root) return [];
  return inorderTraversal(root.left).concat(
    root.val,
    inorderTraversal(root.right)
  );
};

console.log(inorderTraversal(new TreeNode([1, null, 2, 3])));

/**
 * leetcode 98.验证二叉搜索树
 * 假设一个二叉搜索树具有如下特征：
 *
 * 节点的左子树只包含小于当前节点的数。
 * 节点的右子树只包含大于当前节点的数。
 * 所有左子树和右子树自身必须也是二叉搜索树
 *
 * @param {TreeNode} root
 * @return {boolean}
 */
// 利用二叉搜索树的特性：根节点的左节点一定比根节点小，右节点一定比根节点大  进行迭代
var isValidBST = function (root) {
  const _generate = function (root, lower, upper) {
    // terminator
    if (!root) return true;
    // process
    let bool = root.val > lower && root.val < upper;
    if (root.left) bool = bool && _generate(root.left, lower, root.val);
    if (root.right) bool = bool && _generate(root.right, root.val, upper);
    return bool;
  };
  return _generate(root, -Infinity, Infinity);
};

// 利用中序遍历，得到一个新的数组，如果是二叉搜索树即数组一定是升序的
var isValidBST = function(root) {
  const inorderTraversal = function(root) {
      if (!root) return []
      return inorderTraversal(root.left).concat(root.val, inorderTraversal(root.right))
  }
  let arr = inorderTraversal(root)
  for (let i = 1; i < arr.length; i++) {
      if (arr[i] <= arr[i -1]) return false
  }
  return true
};

// 中序遍历优化
var isValidBST = function(root) {
  let stack = [];
  let inorder = -Infinity;
  while (stack.length || root !== null) {
      while (root !== null) {
          stack.push(root);
          root = root.left;
      }
      root = stack.pop();
      // 如果中序遍历得到的节点的值小于等于前一个 inorder，说明不是二叉搜索树
      if (root.val <= inorder) return false;
      inorder = root.val;
      root = root.right;
  }
  return true;
};


/**给定一个二叉树，找出其最大深度。
 * 二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。
 *  
 * 说明: 叶子节点是指没有子节点的节点。
 * 
 * 示例：
 * 给定二叉树 [3,9,20,null,null,15,7]，
 * 返回 3
 * @param {TreeNode} root
 * @return {number}
 */
// 递归计算深度 时间复杂度O(N)
var maxDepth = function(root) {
  // terminator
  if (!root) return 0
  // process
  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1
};

// 利用栈
var maxDepth = function(root) {
  let stack = []
  let depth = 0
  if (root !== null) {
      stack.push(root)
  }
  while(stack.length) {
      let len = stack.length
      // 清空队列，左右节点进入队列
      while(len--) {
          let first = stack.shift()
          if (first.left) stack.push(first.left)
          if (first.right) stack.push(first.right)
      }
      depth++
  }
  return depth
};

/**
 * leetcode 102.二叉树的层序遍历
 * 示例：
 * 二叉树：[3,9,20,null,null,15,7],
 * 返回其层次遍历结果：
 * [
 *   [3],
 *   [9,20],
 *   [15,7]
 * ]
 * @param {TreeNode} root
 * @return {number[][]}
 */
// 优化BFS，即保证队列只有一层的node，遍历同一层的node，存储val后进入下一层
var levelOrder = function(root) {
  let res = []
  if (!root) return res
  let quene = [root] // 栈
  while (quene.length) {
      let currentLength = quene.length  // 当前这一层的node数量
      res.push([]) // 新建这一层对应的结果数组
      for (let i = 0; i < currentLength; i++) {
          let node = quene.shift()
          res[res.length - 1].push(node.val)
          if (node.left) quene.push(node.left) // 如果有左右子节点，则入栈，下一次遍历即下一层的node
          if (node.right) quene.push(node.right)
      }
  }
  return res
};