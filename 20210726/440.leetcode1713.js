/**
 * 2021/07/26 每日一题 1713. 得到子序列的最少操作次数
 * 给你一个数组 target ，包含若干 互不相同 的整数，以及另一个整数数组 arr ，arr 可能 包含重复元素。
 * 
 * 每一次操作中，你可以在 arr 的任意位置插入任一整数。比方说，如果 arr = [1,4,1,2] ，那么你可以在中间添加 3 得到 [1,4,3,1,2] 。你可以在数组最开始或最后面添加整数。
 * 
 * 请你返回 最少 操作次数，使得 target 成为 arr 的一个子序列。
 * 
 * 一个数组的 子序列 指的是删除原数组的某些元素（可能一个元素都不删除），同时不改变其余元素的相对顺序得到的数组。比方说，[2,7,4] 是 [4,2,3,7,2,1,4] 的子序列（加粗元素），但 [2,4,2] 不是子序列。
 * 
 * 示例 1：
 * 
 * 输入：target = [5,1,3], arr = [9,4,2,3,4]
 * 输出：2
 * 解释：你可以添加 5 和 1 ，使得 arr 变为 [5,9,4,1,2,3,4] ，target 为 arr 的子序列。
 * 示例 2：
 * 
 * 输入：target = [6,4,8,1,3,2], arr = [4,7,6,2,3,8,6,1]
 * 输出：3
 */
/**
 * @param {number[]} target
 * @param {number[]} arr
 * @return {number}
 */
 var minOperations = function(target, arr) {
  const n = target.length
  const pos = new Map()
  for (let i = 0; i < n; ++i) pos.set(target[i], i)
  const d = []
  for (const val of arr) {
    if (pos.has(val)) {
      const idx = pos.get(val)
      const it = binarySearch(d, idx)
      if (it !== d.length) d[it] = idx
      else d.push(idx)
    }
  }
  return n - d.length
};
const binarySearch = (d, target) => {
  const size = d.length
  if (size === 0 || d[size - 1] < target) {
    return size
  }
  let low = 0, high = size - 1
  while (low < high) {
    const mid = (low + high) >>> 1
    if (d[mid] < target) low = mid + 1
    else high = mid
  }
  return low
}