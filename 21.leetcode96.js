/**
 * leetcode 96.不同的二叉搜索树
 * 给定一个整数 n，求以 1 ... n 为节点组成的二叉搜索树有多少种？
 * 示例:
 * 
 * 输入: 3
 * 输出: 5
 * 解释:
 * 给定 n = 3, 一共有 5 种不同结构的二叉搜索树:
 * 
 *    1         3     3      2      1
 *     \       /     /      / \      \
 *      3     2     1      1   3      2
 *     /     /       \                 \
 *    2     1         2                 3
 * 
 * 扩展： 卡塔兰数Cn
 * C0 = 1， Cn+1 =  2 * Cn *  (2n +1)/n + 2
 * @param {number} n
 * @return {number}
 */
// 动态规划
var numTrees = function(n) {
  let arr = new Array(n + 1).fill(0)
  arr[0] = 1
  arr[1] = 1
  for(let i = 2; i <= n; i++) {
    for (let j = 1; j <= i ;j++) {
      arr[i] += arr[j - 1] * arr[i - j]
    }
  }
  return arr[n]
};
// 数学公式
var numTrees = function(n) {
  let count = 1
  for (let i = 0; i < n; i++) {
    count = 2 * count * (2 * i + 1) / (i + 2)
  }
  return count
}
console.log(numTrees(3))