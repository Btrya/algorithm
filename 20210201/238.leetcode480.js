/**
 * 2021/02/03 每日一题 480.滑动窗口中位数
 * 中位数是有序序列最中间的那个数。如果序列的大小是偶数，则没有最中间的数；此时中位数是最中间的两个数的平均数。
 * 例如：
 * [2,3,4]，中位数是 3
 * [2,3]，中位数是 (2 + 3) / 2 = 2.5
 * 给你一个数组 nums，有一个大小为 k 的窗口从最左端滑动到最右端。窗口中有 k 个数，每次窗口向右移动 1 位。
 * 你的任务是找出每次窗口移动后得到的新窗口中元素的中位数，并输出由它们组成的数组
 * 示例：
 * 给出 nums = [1,3,-1,-3,5,3,6,7]，以及 k = 3。
 * 
 * 窗口位置                      中位数
 * ---------------               -----
 * [1  3  -1] -3  5  3  6  7       1
 *  1 [3  -1  -3] 5  3  6  7      -1
 *  1  3 [-1  -3  5] 3  6  7      -1
 *  1  3  -1 [-3  5  3] 6  7       3
 *  1  3  -1  -3 [5  3  6] 7       5
 *  1  3  -1  -3  5 [3  6  7]      6
 *  因此，返回该滑动窗口的中位数数组 [1,-1,-1,3,5,6]。
 * 
 * 提示：
 * 
 * 你可以假设 k 始终有效，即：k 始终小于输入的非空数组的元素个数。
 * 与真实值误差在 10 ^ -5 以内的答案将被视作正确答案。
 */
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
class PQ {
  constructor() {
    this.queue = []
  }
  // 添加，用二分查找  找到要插入的位置
  add(val) {
    let left = 0, right = this.queue.length - 1
    while (left <= right) {
      let mid = left + ((right - left) / 2 | 0)
      if (this.queue[mid] > val) left = mid + 1
      else right = mid - 1
    }
    this.queue.splice(left, 0, val)
  }
  // 删除 找到对应的位置删除
  del(val) {
    let index = this.queue.indexOf(val)
    this.queue.splice(index, 1)
  }
  getMid(isOdd) {
    let mid = this.queue.length / 2 | 0
    return isOdd ? this.queue[mid] : (this.queue[mid - 1] + this.queue[mid]) / 2 
  }
}
var medianSlidingWindow = function(nums, k) {
  if (!k || !nums.length) return []
  let pq = new PQ()
  let list = [];
  for (let i = 0; i < nums.length; i++) {
    pq.add(nums[i])
    if (i >= k) pq.del(nums[i - k]) // 窗口移动
    if (i >= k - 1) { // 窗口大小为k，添加中位数到数组
      let val = pq.getMid(k & 1)
      list.push(val)
    }
  }
  return list
};