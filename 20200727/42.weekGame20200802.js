/**
 * 2020/08/02 周赛 
 */

 /**
  * 5475. 统计好三元组
  * 给你一个整数数组 arr ，以及 a、b 、c 三个整数。请你统计其中好三元组的数量。
  * 
  * 如果三元组 (arr[i], arr[j], arr[k]) 满足下列全部条件，则认为它是一个 好三元组 。
  * 
  * 0 <= i < j < k < arr.length
  * |arr[i] - arr[j]| <= a
  * |arr[j] - arr[k]| <= b
  * |arr[i] - arr[k]| <= c
  * 其中 |x| 表示 x 的绝对值。
  * 
  * 返回 好三元组的数量 。
  * 
  *  
  * 
  * 示例 1：
  * 
  * 输入：arr = [3,0,1,1,9,7], a = 7, b = 2, c = 3
  * 输出：4
  * 解释：一共有 4 个好三元组：[(3,0,1), (3,0,1), (3,1,1), (0,1,1)] 。
  * 示例 2：
  * 
  * 输入：arr = [1,1,2,2,3], a = 0, b = 0, c = 1
  * 输出：0
  * 解释：不存在满足所有条件的三元组
  */
  // 暴力优化
  /**
 * @param {number[]} arr
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @return {number}
 */
var countGoodTriplets = function(arr, a, b, c) {
  let count = 0
  if (!arr) return count
  for (let i = 0; i < arr.length - 2; i++) {
      for (let j = i + 1; j < arr.length - 1; j++) {
          if (Math.abs(arr[i] - arr[j]) <= a) {
              for (let k = j + 1; k < arr.length; k++) {
                  if (Math.abs(arr[i] - arr[k]) <= c && Math.abs(arr[j] - arr[k]) <= b) {
                      count++
                  }
              }
          }
      }
  }
  return count
};

/**
 * 5476. 找出数组游戏的赢家
 * 给你一个由 不同 整数组成的整数数组 arr 和一个整数 k 。
 * 每回合游戏都在数组的前两个元素（即 arr[0] 和 arr[1] ）之间进行。比较 arr[0] 与 arr[1] 的大小，较大的整数将会取得这一回合的胜利并保留在位置 0 ，
 * 较小的整数移至数组的末尾。当一个整数赢得 k 个连续回合时，游戏结束，该整数就是比赛的 赢家 。
 * 返回赢得比赛的整数。
 * 题目数据 保证 游戏存在赢家。
 * 示例 1：
 * 
 * 输入：arr = [2,1,3,5,4,6,7], k = 2
 * 输出：5
 * 解释：一起看一下本场游戏每回合的情况：
 * 
 * 因此将进行 4 回合比赛，其中 5 是赢家，因为它连胜 2 回合。
 * 示例 2：
 * 
 * 输入：arr = [3,2,1], k = 10
 * 输出：3
 * 解释：3 将会在前 10 个回合中连续获胜。
 * 示例 3：
 * 
 * 输入：arr = [1,9,8,2,3,7,6,4,5], k = 7
 * 输出：9
 * 示例 4：
 * 
 * 输入：arr = [1,11,22,33,44,55,66,77,88,99], k = 1000000000
 * 输出：99
 */

 /**
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */
var getWinner = function(arr, k) {
  let i = 0, t = 0;  // t记录连胜次数
  while(t < k && i < arr.length - 1){
      if (arr[i] > arr[i + 1]){
          arr[i + 1] = arr[i];     
          ++ t
      } else
          t = 1
      ++ i
  }  
  return arr[i];
};

/**
 * 5477. 排布二进制网格的最少交换次数
 * 给你一个 n x n 的二进制网格 grid，每一次操作中，你可以选择网格的 相邻两行 进行交换。
 * 一个符合要求的网格需要满足主对角线以上的格子全部都是 0 。
 * 请你返回使网格满足要求的最少操作次数，如果无法使网格符合要求，请你返回 -1 。
 * 主对角线指的是从 (1, 1) 到 (n, n) 的这些格子。
 * 
 * 输入：grid = [[0,0,1],[1,1,0],[1,0,0]]
 * 输出：3
 */
/**
 * @param {number[][]} grid
 * @return {number}
 */
var minSwaps = function(grid) {
  let n = grid.length
  let zero = []
  for (let i = 0; i < n; i++) {
      let count = 0
      for (let j = n - 1; j >= 0; j--) {
          if(grid[i][j] == 0) count++
          else break
      }
      zero.push(count)
  }
  let count = 0
  for (let i = 0; i < n - 1; i++) {
      if (zero[i] >= n - i - 1) continue
      else {
          let j = i
          for (; j < n; j++) {
              if (zero[j] >= n - i - 1) break
          }
          if (j == n) return -1
          for (; j > i; j--) {
              [zero[j], zero[j - 1]] = [zero[j - 1], zero[j]]
              count ++
          }
      }
  }
  return count
};