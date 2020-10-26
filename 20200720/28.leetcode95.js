/**
 * 更多二叉搜索树题目查阅 21.generateTrees.js
 * leetcode95.不同的二叉树II
 * 给定一个整数 n，生成所有由 1 ... n 为节点所组成的 二叉搜索树 
 * 输入：3
 * 输出：
 * [
 *   [1,null,3,2],
 *   [3,2,null,1],
 *   [3,1,null,null,2],
 *   [2,1,3],
 *   [1,null,2,null,3]
 * ]
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
 * @param {number} n
 * @return {TreeNode[]}
 */
// 递归求解 时间复杂度O(n^3)
var generateTrees = function(n) {
  if (n === 0) return []
  const _generate = function(start, end) {
      let ans = []
      if (start > end) return [null]  // 停止递归条件
      for(let i = start; i <= end; i++) {
          let leftNodes = _generate(start, i - 1)
          let rightNodes = _generate(i + 1, end)
          for (let l of leftNodes) {
              for(let r of  rightNodes) {
                  let curr = new TreeNode(i)
                  curr.left = l
                  curr.right = r
                  ans.push(curr)
              }
          }
      }
      return ans
  }
  return _generate(1, n)
};

// 优化
var generateTrees = function(n) {
  if (!n) return []
  const gen = (start, end) => {
    let all = []
    if (start > end) {
      all.push(null)
      return all
    }
    for (let i = start; i <= end; i++) {
      let leftTrees = gen(start, i - 1)
      let rightTrees = gen(i + 1, end)
      for (let left of leftTrees) {
        for (let right of rightTrees) {
          all.push(new TreeNode(i, left, right))
        }
      }
    }
    return all
  }
  return gen(1, n)
};

console.log(generateTrees(3))