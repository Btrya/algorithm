/**
 * 来源： leetcode第197场周赛
 */

/**
 * 给你一个整数数组 nums 。
 * 如果一组数字 (i,j) 满足 nums[i] == nums[j] 且 i < j ，就可以认为这是一组 好数对 。
 * 返回好数对的数目。。
 * @param {number[]} nums
 * @return {number}
 */
// var numIdenticalPairs = function(nums) {
//   let count = 0
//   for (let i = 0; i < nums.length; i++) {
//     for(let j = i + 1; j < nums.length; j++) {
//       if (nums[i] == nums[j]) {
//         count ++
//       }
//     }
//   }
//   return count
// };


// console.log(numIdenticalPairs([1,2,3,1,1,3])) // 4
// console.log(numIdenticalPairs([1,1,1,1])) // 6
// console.log(numIdenticalPairs([1,2,3])) // 0


// /**
//  * 给你一个二进制字符串 s（仅由 '0' 和 '1' 组成的字符串）。
//  * 返回所有字符都为 1 的子字符串的数目。
//  * 由于答案可能很大，请你将它对 10^9 + 7 取模后返回。
//  * @param {string} s
//  * @return {number}
//  */
// var numSub = function(s) {
//   let count = 0,
//       sum = 0,
//       modNum = 10 ** 9 + 7
//   for (let i = 0; i < s.length; i++) {
//     if (s.charAt(i) == 1) {  // 计算连续的1有几个，记录到count
//       count ++
//     } else {
//       sum += count * (count + 1) / 2 // 高斯公式 n * (n + 1) / 2
//       count = 0
//     } 
//   }
//   sum += count * (count + 1) / 2  // i跑到了字符串的最后一位，如"0110111"最后的"111"就跑不到else里面了，这里要再补一个求和
//   return sum % modNum  // 求模返回
// };

// console.log(numSub("0110111")) // 9
// console.log(numSub("101"))  // 2
// console.log(numSub("111111")) // 21
// console.log(numSub("000")) // 0


/**
 * 给你一个由 n 个节点（下标从 0 开始）组成的无向加权图，该图由一个描述边的列表组成，其中 edges[i] = [a, b] 表示连接节点 a 和 b 的一条无向边，且该边遍历成功的概率为 succProb[i] 。
 * 指定两个节点分别作为起点 start 和终点 end ，请你找出从起点到终点成功概率最大的路径，并返回其成功概率。
 * 如果不存在从 start 到 end 的路径，请 返回 0 。只要答案与标准答案的误差不超过 1e-5 ，就会被视作正确答案。
 * @param {number} n
 * @param {number[][]} edges
 * @param {number[]} succProb
 * @param {number} start
 * @param {number} end
 * @return {number}
 */
var maxProbability = function(n, edges, succProb, start, end) {

};


console.log(3, [[0,1],[1,2],[0,2]], [0.5,0.5,0.2], 0, 2)
console.log(3, [[0,1],[1,2],[0,2]], [0.5,0.5,0.3], 0, 2)
console.log(3, [[0,1]], [0.5], 0, 2)

