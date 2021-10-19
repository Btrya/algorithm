## 树 概述
`树`是一种常用的数据结构，用来模拟具有树状结构的数据集合。

树里的每一个节点`有一个值`和`一个包含所有子节点的列表(又是一个树，称为子树)`。

从`图`的观点来看，`树`可以看成是一个拥有 `N个节点` 和 `N - 1条边` 的一个有向无环图。

`二叉树`是一种更为典型的树形结构，顾名思义，二叉树就是每个节点最多有`两个子树`的树结构，通常称为`左子树`和`右子树`

## 树的遍历
遍历之前要先了解 `树` 的构造函数
```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
```

### 前序遍历
前序遍历首先访问根节点，然后遍历左子树，最后遍历右子树  `根左右`

递归算法:
```js
/*
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function(root) {
  if (!root) return []
  return [root.val].concat(preorderTraversal(root.left), preorderTraversal(root.right))
};
```

迭代算法:
```js
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function(root) {
  if (!root) return []
  const stack = []
  const res = []
  stack.push(root)
  while (stack.length) {
    const node = stack.pop()
    res.push(node.val)
    if (node.right) stack.push(node.right)
    if (node.left) stack.push(node.left)
  }
  return res
};
```

### 中序遍历
中序便利是先遍历左子树，然后访问根节点，然后遍历右子树  `左根右`

递归算法:
```js
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function(root) {
  if (!root) return []
  return inorderTraversal(root.left).concat(root.val, inorderTraversal(root.right))
};
```

迭代算法:
```js
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function(root) {
  if (!root) return []
  const result = [], stack = []
  while (root !== null || stack.length > 0) {
    while(root) {
      stack.push(root)
      root = root.left
    }
    const pop = stack.pop()
    result.push(pop.val)
    root = pop.right
  }
  return result
};
```


### 后序遍历
后序遍历是先遍历左子树，然后遍历右子树，最后访问树的根结点 `左右根`

递归算法:
```js
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var postorderTraversal = function(root) {
  if (!root) return []
  return postorderTraversal(root.left).concat(postorderTraversal(root.right), root.val)
} 
```

迭代算法:
```js
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var postorderTraversal = function(root) {
  if (!root) return []
  let stack = []
  let res = []
  let prev = null
  while (root != null || stack.length) {
    while (root != null) {
      stack.push(root)
      root = root.left
    }
    root = stack.pop()
    if (root.right == null || root.right == prev) {
      res.push(root.val)
      prev = root
      root = null
    } else {
      stack.push(root)
      root = root.right
    }
  }
  return res
};
```

morris 迭代:
```js
// morris 遍历
var postorderTraversal = function(root) {
  let res = []
  if (!root) return res
  const addPath = (res, node) => {
    let tmp = []
    while (node != null) {
      tmp.push(node.val)
      node = node .right
    }
    for (let i = tmp.length - 1; i >= 0; i--) {
      res.push(tmp[i])
    }
  }
  let p1 = root, p2 = null
  while (p1 != null) {
    p2 = p1.left
    if (p2 != null) {
      while (p2.right != null && p2.right != p1) {
        p2 = p2.right
      }
      if (p2.right == null) {
        p2.right = p1
        p1 = p1.left
        continue
      } else {
        p2.right = null
        addPath(res, p1.left)
      }
    }
    p1 = p1.right
  }
  addPath(res, root)
  return res
};
```

### 注意点
1. 删除树的某个节点的时候，删除过程以后序遍历的顺序进行。就是说，当你删除一个节点的时候，会先删除它的左子节点和右子节点，然后才是删除本身。

### 技巧
1. 后序遍历的时候使用栈来处理表达式会更简单：`每遇到一个操作符，就从栈中探出栈顶两个元素，计算并返回结果`