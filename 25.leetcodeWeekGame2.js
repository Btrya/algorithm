/**
 * leetcode 第198场周赛  2020/7/19
 * 5464.换酒问题
 * 小区便利店正在促销，用 numExchange 个空酒瓶可以兑换一瓶新酒。你购入了 numBottles 瓶酒。
 * 如果喝掉了酒瓶中的酒，那么酒瓶就会变成空的。
 * 请你计算 最多 能喝到多少瓶酒
 * 例子：输入：numBottles = 9, numExchange = 3
 * 输出：13
 * 解释：你可以用 3 个空酒瓶兑换 1 瓶酒。
 * 所以最多能喝到 9 + 3 + 1 = 13 瓶酒。
 */

 /**
 * @param {number} numBottles
 * @param {number} numExchange
 * @return {number}
 */
// 递归
var numWaterBottles = function(numBottles, numExchange) {
  let all = numBottles
  let rest = numBottles // 剩下的空瓶子
  const generate = function (Bottles) {
    rest = Bottles % numExchange
    let temp = Math.floor(Bottles / numExchange)
    all += temp
    if (rest + temp >= numExchange) {
      generate(rest + temp)
    }
  }
  generate(all)
  return all
};
// 数学解法
var numWaterBottles = function(numBottles, numExchange) {
  return Math.floor((numBottles * numExchange - 1) / (numExchange - 1))
};


// console.log(numWaterBottles(9 ,3)) // 13
// console.log(numWaterBottles(15 ,4)) // 19
// console.log(numWaterBottles(5 ,5)) // 6
// console.log(numWaterBottles(2 ,3)) // 2

/**
 * leetcode 5465.子树种标签相同的节点数
 */
/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {string} labels
 * @return {number[]}
 */
function TreeNode (idx, label, childs) {
  this.idx = idx
  this.label = label
  this.childs= childs
}
var countSubTrees = function(n, edges, labels) {
  let ans = new Array(n).fill(0)

  return ans
};

console.log(countSubTrees(7, [[0,1],[0,2],[1,4],[1,5],[2,3],[2,6]], 'abaedcd')) // [2, 1, 1, 1, 1, 1, 1]
console.log(countSubTrees(4, [[0,1],[1,2],[0,3]], 'bbbb')) // [4, 2, 1, 1]
console.log(countSubTrees(4, [[0,2],[0,3],[1,2]], 'aeed')) // [1, 1, 2, 1]



/**
 * 5466. 最多不重叠子字符串
 * 给你一个只包含小写字母的字符串 s ，你需要找到 s 中最多数目的非空子字符串，满足如下条件：
 * 这些字符串之间互不重叠，也就是说对于任意两个子字符串 s[i..j] 和 s[k..l] ，要么 j < k 要么 i > l 。
 * 如果一个子字符串包含字符 c ，那么 s 中所有 c 字符都应该在这个子字符串中。
 * 请你找到满足上述条件的最多子字符串数目。如果有多个解法有相同的子字符串数目，请返回这些子字符串总长度最小的一个解。可以证明最小总长度解是唯一的。
 * 
 * 请注意，你可以以 任意 顺序返回最优解的子字符串。
 */