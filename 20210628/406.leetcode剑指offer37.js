/**
 * 2021/06/30 每日一题 剑指 Offer 37. 序列化二叉树
 * https://leetcode-cn.com/problems/xu-lie-hua-er-cha-shu-lcof/
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
 var serialize = function(root) {
  return rserialize(root, '')
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function(data) {
  const dataArray = data.split(',')
  return rdeserialize(dataArray)
};

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */
const rserialize = (root, str) => {
  if (root === null) {
    str += 'None,' 
  } else {
    str += root.val + '' + ','
    str = rserialize(root.left, str)
    str = rserialize(root.right, str)
  }
  return str
}

const rdeserialize = (dataList) => {
  if (dataList[0] === 'None') {
    dataList.shift()
    return null
  }
  const root = new TreeNode(parseInt(dataList[0]))
  dataList.shift()
  root.left = rdeserialize(dataList)
  root.right = rdeserialize(dataList)
  return root
}