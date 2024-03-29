/**
 * 2021/09/08 每日一题 502. IPO
 * 假设 力扣（LeetCode）即将开始 IPO 。为了以更高的价格将股票卖给风险投资公司，力扣 希望在 IPO 之前开展一些项目以增加其资本。 由于资源有限，它只能在 IPO 之前完成最多 k 个不同的项目。帮助 力扣 设计完成最多 k 个不同项目后得到最大总资本的方式。
 * 
 * 给你 n 个项目。对于每个项目 i ，它都有一个纯利润 profits[i] ，和启动该项目需要的最小资本 capital[i] 。
 * 
 * 最初，你的资本为 w 。当你完成一个项目时，你将获得纯利润，且利润将被添加到你的总资本中。
 * 
 * 总而言之，从给定项目中选择 最多 k 个不同项目的列表，以 最大化最终资本 ，并输出最终可获得的最多资本。
 * 
 * 答案保证在 32 位有符号整数范围内。
 * 示例 1：
 * 
 * 输入：k = 2, w = 0, profits = [1,2,3], capital = [0,1,1]
 * 输出：4
 * 解释：
 * 由于你的初始资本为 0，你仅可以从 0 号项目开始。
 * 在完成后，你将获得 1 的利润，你的总资本将变为 1。
 * 此时你可以选择开始 1 号或 2 号项目。
 * 由于你最多可以选择两个项目，所以你需要完成 2 号项目以获得最大的资本。
 * 因此，输出最后最大化的资本，为 0 + 1 + 3 = 4。
 * 示例 2：
 * 
 * 输入：k = 3, w = 0, profits = [1,2,3], capital = [0,1,2]
 * 输出：6
 *  
 * 
 * 提示：
 * 
 * 1 <= k <= 105
 * 0 <= w <= 109
 * n == profits.length
 * n == capital.length
 * 1 <= n <= 105
 * 0 <= profits[i] <= 104
 * 0 <= capital[i] <= 109
 */
/**
 * @param {number} k
 * @param {number} w
 * @param {number[]} profits
 * @param {number[]} capital
 * @return {number}
 */
// 默认最大堆
const defaultCmp = (x, y) => x > y;
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

const findMaximizedCapital = (k, w, profits, capital) => {
  const n = profits.length;
  const arr = new Array(n);
  // 将资本、利润按项目号组合   [资本,纯利润]
  for (let i = 0; i < n; i++) {
    arr[i] = [capital[i], profits[i]];
  }
  // 将项目按所需资本从小到大排序
  arr.sort((a, b) => a[0] - b[0]);

  // 创建最大堆
  const maxHeap = new Heap();
  let cur = 0;
  for (let i = 0; i < k; i++) {
    while (cur < n && arr[cur][0] <= w) {
      // 将所有满足条件的项目所获得的利润插入堆中
      maxHeap.insert(arr[cur++][1]);
    }
    if (maxHeap.size()) {
      // 堆不为空
      // 取出堆顶，即为最大的纯利润，更新自己的资本w
      w += maxHeap.pop();
    } else {
      // 堆为空，直接退出循环
      // 因为已经没有满足条件的项目进入堆了
      break;
    }
  }
  return w;
};