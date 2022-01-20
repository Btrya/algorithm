/**
 * 2022/01/21 每日一题 1345. 跳跃游戏 IV
 * 给你一个整数数组 arr ，你一开始在数组的第一个元素处（下标为 0）。
 * 
 * 每一步，你可以从下标 i 跳到下标：
 * 
 * i + 1 满足：i + 1 < arr.length
 * i - 1 满足：i - 1 >= 0
 * j 满足：arr[i] == arr[j] 且 i != j
 * 请你返回到达数组最后一个元素的下标处所需的 最少操作次数 。
 * 
 * 注意：任何时候你都不能跳到数组外面。
 * 
 * 示例 1：
 * 
 * 输入：arr = [100,-23,-23,404,100,23,23,23,3,404]
 * 输出：3
 * 解释：那你需要跳跃 3 次，下标依次为 0 --> 4 --> 3 --> 9 。下标 9 为数组的最后一个元素的下标。
 * 示例 2：
 * 
 * 输入：arr = [7]
 * 输出：0
 * 解释：一开始就在最后一个元素处，所以你不需要跳跃。
 * 示例 3：
 * 
 * 输入：arr = [7,6,9,6,9,6,9,7]
 * 输出：1
 * 解释：你可以直接从下标 0 处跳到下标 7 处，也就是数组的最后一个元素处。
 * 示例 4：
 * 
 * 输入：arr = [6,1,9]
 * 输出：2
 * 示例 5：
 * 
 * 输入：arr = [11,22,7,7,7,7,7,7,7,22,13]
 * 输出：3
 *  
 * 
 * 提示：
 * 
 * 1 <= arr.length <= 5 * 10^4
 * -10^8 <= arr[i] <= 10^8
 */
/**
 * @param {number[]} arr
 * @return {number}
 */
var minJumps = function (arr) {
  const l = arr.length;
  const map = new Map();

  // the map contains a number as a key and a list of indexes containing the same number in the array
  for (let i = 0; i < l; i++) {
    if (map.has(arr[i])) {
      map.get(arr[i]).push(i);
    } else {
      map.set(arr[i], [i]);
    }
  }

  let queue = [0];
  let steps = 0;

  while (queue.length !== 0) {
    const m = queue.length;
    const newQueue = [];

    for (let i = 0; i < m; i++) {
      const index = queue[i];

      if (index === l - 1) {
        return steps;
      }

      const num = arr[index];
      arr[index] = null;

      // check the first jump type: jump to a previous index
      if (index - 1 > 0 && arr[index - 1] !== null) {
        newQueue.push(index - 1);
      }
      // check the second jump type: jump to a next index
      if (arr[index + 1] !== null) {
        newQueue.push(index + 1);
      }
      // check the third jump type: jump to an index containg the same number 
      if (map.has(num)) {
        map.get(num).forEach(ind => {
          if (arr[ind] !== null) {
            newQueue.push(ind);
          }
        })
        map.delete(num);
      }
    }

    queue = newQueue;
    steps++;
  }
};