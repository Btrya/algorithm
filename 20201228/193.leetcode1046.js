/**
 * 2020/12/30 每日一题 1046.最后一块石头的重量
 * 有一堆石头，每块石头的重量都是正整数。
 * 每一回合，从中选出两块 最重的 石头，然后将它们一起粉碎。假设石头的重量分别为 x 和 y，且 x <= y。那么粉碎的可能结果如下：
 * 如果 x == y，那么两块石头都会被完全粉碎；
 * 如果 x != y，那么重量为 x 的石头将会完全粉碎，而重量为 y 的石头新重量为 y-x。
 * 最后，最多只会剩下一块石头。返回此石头的重量。如果没有石头剩下，就返回 0。
 * 示例：
 * 
 * 输入：[2,7,4,1,8,1]
 * 输出：1
 * 解释：
 * 先选出 7 和 8，得到 1，所以数组转换为 [2,4,1,1,1]，
 * 再选出 2 和 4，得到 2，所以数组转换为 [2,1,1,1]，
 * 接着是 2 和 1，得到 1，所以数组转换为 [1,1,1]，
 * 最后选出 1 和 1，得到 0，最终数组转换为 [1]，这就是最后剩下那块石头的重量。
 */
/**
 * @param {number[]} stones
 * @return {number}
 */
// 当石头数量大于1的时候进入循环，每次取最重两个石头粉碎，不一样大则放入一个相差重量石头，下一轮循环再次排序
var lastStoneWeight = function(stones) {
  while (stones.length > 1) {
    stones.sort((a, b) => b - a)
    const x = stones.shift()
    const y = stones.shift()
    if (x !== y) stones.push(x - y)
  }
  return stones[0] || 0
};

// 迭代
var lastStoneWeight = function(stones) {
  if (stones.length == 1) return stones[0]
  if (stones.length == 0) return 0
  stones.sort((a, b) => a - b)
  const a = stones.pop()
  const b = stones.pop()
  if (a !== b) stones.push(a - b)
  return lastStoneWeight(stones)
};

var lastStoneWeight = function(stones) {
  stones.sort((a, b) => a - b)
  if(stones.length >= 2){
    const [min, max] = stones.splice(-2)
    if(min !== max) {
      stones.unshift(max - min)
    }
    return lastStoneWeight(stones)
  } else {
    return stones[0] || 0
  }
};