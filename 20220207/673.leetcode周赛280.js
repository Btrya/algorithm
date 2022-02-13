/**
 * 2022/02/13 周赛 6004. 得到 0 的操作数
 * 给你两个 非负 整数 num1 和 num2 。
 * 
 * 每一步 操作 中，如果 num1 >= num2 ，你必须用 num1 减 num2 ；否则，你必须用 num2 减 num1 。
 * 
 * 例如，num1 = 5 且 num2 = 4 ，应该用 num1 减 num2 ，因此，得到 num1 = 1 和 num2 = 4 。然而，如果 num1 = 4且 num2 = 5 ，一步操作后，得到 num1 = 4 和 num2 = 1 。
 * 返回使 num1 = 0 或 num2 = 0 的 操作数 。
 * 
 *  
 * 
 * 示例 1：
 * 
 * 输入：num1 = 2, num2 = 3
 * 输出：3
 * 解释：
 * - 操作 1 ：num1 = 2 ，num2 = 3 。由于 num1 < num2 ，num2 减 num1 得到 num1 = 2 ，num2 = 3 - 2 = 1 。
 * - 操作 2 ：num1 = 2 ，num2 = 1 。由于 num1 > num2 ，num1 减 num2 。
 * - 操作 3 ：num1 = 1 ，num2 = 1 。由于 num1 == num2 ，num1 减 num2 。
 * 此时 num1 = 0 ，num2 = 1 。由于 num1 == 0 ，不需要再执行任何操作。
 * 所以总操作数是 3 。
 * 示例 2：
 * 
 * 输入：num1 = 10, num2 = 10
 * 输出：1
 * 解释：
 * - 操作 1 ：num1 = 10 ，num2 = 10 。由于 num1 == num2 ，num1 减 num2 得到 num1 = 10 - 10 = 0 。
 * 此时 num1 = 0 ，num2 = 10 。由于 num1 == 0 ，不需要再执行任何操作。
 * 所以总操作数是 1 。
 *  
 * 
 * 提示：
 * 
 * 0 <= num1, num2 <= 105
 */
/**
 * @param {number} num1
 * @param {number} num2
 * @return {number}
 */
 var countOperations = function(num1, num2) {
  let count = 0
  while (num1 !== 0 && num2 !== 0) {
    count++
    const diff = Math.abs(num1 - num2)
    if (num1 > num2) num1 = diff
    else num2 = diff
  }
  return count
};

/**
 * 6005. 使数组变成交替数组的最少操作数
 * 给你一个下标从 0 开始的数组 nums ，该数组由 n 个正整数组成。
 * 
 * 如果满足下述条件，则数组 nums 是一个 交替数组 ：
 * 
 * nums[i - 2] == nums[i] ，其中 2 <= i <= n - 1 。
 * nums[i - 1] != nums[i] ，其中 1 <= i <= n - 1 。
 * 在一步 操作 中，你可以选择下标 i 并将 nums[i] 更改 为 任一 正整数。
 * 
 * 返回使数组变成交替数组的 最少操作数 。
 * 
 *  
 * 
 * 示例 1：
 * 
 * 输入：nums = [3,1,3,2,4,3]
 * 输出：3
 * 解释：
 * 使数组变成交替数组的方法之一是将该数组转换为 [3,1,3,1,3,1] 。
 * 在这种情况下，操作数为 3 。
 * 可以证明，操作数少于 3 的情况下，无法使数组变成交替数组。
 * 示例 2：
 * 
 * 输入：nums = [1,2,2,2,2]
 * 输出：2
 * 解释：
 * 使数组变成交替数组的方法之一是将该数组转换为 [1,2,1,2,1].
 * 在这种情况下，操作数为 2 。
 * 注意，数组不能转换成 [2,2,2,2,2] 。因为在这种情况下，nums[0] == nums[1]，不满足交替数组的条件。
 *  
 * 
 * 提示：
 * 
 * 1 <= nums.length <= 105
 * 1 <= nums[i] <= 105
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
 var minimumOperations = function(nums) {
  if (nums.length < 2) return 0
  let odd = new Map(), oddCount = 0
  let even = new Map(), evenCount = 0
  for (let i = 0; i < nums.length; i += 2) {
    odd.set(nums[i], (odd.get(nums[i]) || 0) + 1)
    oddCount++
  }
  for (let i = 1; i < nums.length; i += 2) {
    even.set(nums[i], (even.get(nums[i]) || 0) + 1)
    evenCount++
  }
  odd = Array.from(odd).sort((a, b) => b[1] - a[1])
  even = Array.from(even).sort((a, b) => b[1] - a[1])
  if (odd[0][0] === even[0][0]) {
    if (odd.length === 1 && even.length === 1) return evenCount
    else if (odd.length === 1) return oddCount - odd[0][1] + evenCount - even[1][1]
    else if (even.length === 1 ) return oddCount - odd[1][1] + evenCount - even[0][1]
    else return oddCount - odd[1][1] + evenCount - even[0][1]
  } else {
    return oddCount - odd[0][1] + evenCount - even[0][1]
  }
};

/**
 * 6006. 拿出最少数目的魔法豆
 * 给你一个 正 整数数组 beans ，其中每个整数表示一个袋子里装的魔法豆的数目。
 * 
 * 请你从每个袋子中 拿出 一些豆子（也可以 不拿出），使得剩下的 非空 袋子中（即 至少 还有 一颗 魔法豆的袋子）魔法豆的数目 相等 。一旦魔法豆从袋子中取出，你不能将它放到任何其他的袋子中。
 * 
 * 请你返回你需要拿出魔法豆的 最少数目。
 * 
 *  
 * 
 * 示例 1：
 * 
 * 输入：beans = [4,1,6,5]
 * 输出：4
 * 解释：
 * - 我们从有 1 个魔法豆的袋子中拿出 1 颗魔法豆。
 *   剩下袋子中魔法豆的数目为：[4,0,6,5]
 * - 然后我们从有 6 个魔法豆的袋子中拿出 2 个魔法豆。
 *   剩下袋子中魔法豆的数目为：[4,0,4,5]
 * - 然后我们从有 5 个魔法豆的袋子中拿出 1 个魔法豆。
 *   剩下袋子中魔法豆的数目为：[4,0,4,4]
 * 总共拿出了 1 + 2 + 1 = 4 个魔法豆，剩下非空袋子中魔法豆的数目相等。
 * 没有比取出 4 个魔法豆更少的方案。
 * 示例 2：
 * 
 * 输入：beans = [2,10,3,2]
 * 输出：7
 * 解释：
 * - 我们从有 2 个魔法豆的其中一个袋子中拿出 2 个魔法豆。
 *   剩下袋子中魔法豆的数目为：[0,10,3,2]
 * - 然后我们从另一个有 2 个魔法豆的袋子中拿出 2 个魔法豆。
 *   剩下袋子中魔法豆的数目为：[0,10,3,0]
 * - 然后我们从有 3 个魔法豆的袋子中拿出 3 个魔法豆。
 *   剩下袋子中魔法豆的数目为：[0,10,0,0]
 * 总共拿出了 2 + 2 + 3 = 7 个魔法豆，剩下非空袋子中魔法豆的数目相等。
 * 没有比取出 7 个魔法豆更少的方案。
 *  
 * 
 * 提示：
 * 
 * 1 <= beans.length <= 105
 * 1 <= beans[i] <= 105
 */
/**
 * @param {number[]} beans
 * @return {number}
 */
// 默认最大堆
const defaultCmp = (x, y) => x < y;
// 交换元素
const swap = (arr, i, j) => ([arr[i], arr[j]] = [arr[j], arr[i]]);
// 堆类，默认最大堆
class Heap {
  constructor(cmp = defaultCmp) {
    this.container = [];
    this.cmp = cmp;
  }
  // 插入
  insert(data) {
    const {
      container,
      cmp
    } = this;
    container.push(data);
    let index = this.size() - 1;
    while (index) {
      let parent = (index - 1) >> 1;
      if (!cmp(container[index], container[parent])) {
        return;
      }
      swap(container, index, parent);
      index = parent;
    }
  }
  // 弹出堆顶，并返回
  pop() {
    const {
      container,
      cmp
    } = this;
    if (!this.size()) {
      return null;
    }

    swap(container, 0, this.size() - 1);
    const res = container.pop();
    const length = this.size();
    let index = 0,
      exchange = index * 2 + 1;

    while (exchange < length) {
      // // 以最大堆的情况来说：如果有右节点，并且右节点的值大于左节点的值
      let right = index * 2 + 2;
      if (right < length && cmp(container[right], container[exchange])) {
        exchange = right;
      }
      if (!cmp(container[exchange], container[index])) {
        break;
      }
      swap(container, exchange, index);
      index = exchange;
      exchange = index * 2 + 1;
    }

    return res;
  }
  // 获取堆大小
  size() {
    return this.container.length;
  }
}
var minimumRemoval = function(beans) {
  let ans = -1
  let sums = beans.reduce((total, prev) => total += prev, 0)
  let len = beans.length
  let bean = 0
  let heapBeans = new Heap()
  for (let i = 0; i < len; ++i) {
    heapBeans.insert(beans[i])
  }
  while (heapBeans.size()) {
    const num = heapBeans.pop()
    if (ans === -1 || ans > (sums - (len - bean) * num)) {
      ans = sums - (len - bean) * num
    }
    bean++
  }
  return ans
};
/**
 * @param {number[]} beans
 * @return {number}
 */
 var minimumRemoval = function(beans) {
  const sum = beans.reduce((cur, next) => cur + next, 0)
  let ans = sum
  beans.sort((a, b) => a - b)
  for (let i = 0; i < beans.length; i ++) {
      ans = Math.min(ans, sum - beans[i] * (beans.length - i))
  }
  return ans
};