/**
 * 2021/02/11 每日一题 703.数据流中的第 K 大元素
 * 设计一个找到数据流中第 k 大元素的类（class）。注意是排序后的第 k 大元素，不是第 k 个不同的元素。
 * 请实现 KthLargest 类：
 * 
 * KthLargest(int k, int[] nums) 使用整数 k 和整数流 nums 初始化对象。
 * int add(int val) 将 val 插入数据流 nums 后，返回当前数据流中第 k 大的元素。
 * 
 * 示例：
 * 
 * 输入：
 * ["KthLargest", "add", "add", "add", "add", "add"]
 * [[3, [4, 5, 8, 2]], [3], [5], [10], [9], [4]]
 * 输出：
 * [null, 4, 5, 5, 8, 8]
 * 
 * 解释：
 * KthLargest kthLargest = new KthLargest(3, [4, 5, 8, 2]);
 * kthLargest.add(3);   // return 4
 * kthLargest.add(5);   // return 5
 * kthLargest.add(10);  // return 5
 * kthLargest.add(9);   // return 8
 * kthLargest.add(4);   // return 8
 * 
 * 提示：
 * 1 <= k <= 104
 * 0 <= nums.length <= 104
 * -104 <= nums[i] <= 104
 * -104 <= val <= 104
 * 最多调用 add 方法 104 次
 * 题目数据保证，在查找第 k 大元素时，数组中至少有 k 个元素
 */
/**
 * @param {number} k
 * @param {number[]} nums
 */
function swap(arr, i1, i2) {
  let temp = arr[i1];
  arr[i1] = arr[i2];
  arr[i2] = temp;
}

/**
 * @param {number} k
 * @param {number[]} nums
 */
var KthLargest = function (k, nums) {
  // 第一个元素空着
  this.minHeap = [null];
  this.k = k;
  // 所有元素都添加到最小堆
  for (let i = 0; i < nums.length; i++) {
    this.add(nums[i]);
  }
};

/** 
 * @param {number} val
 * @return {number}
 */
KthLargest.prototype.add = function (val) {
  if (this.minHeap.length <= this.k) {
    // 最小堆没满，放到最小堆
    this.minHeap.push(val);
    // 上浮最新的元素，维护堆的秩序
    this.up(this.minHeap.length - 1);
  } else {
    if (val > this.minHeap[1]) {
      // 新的元素比最小堆堆顶大，替换最小堆堆顶
      this.minHeap[1] = val;
      // 下沉这个元素，维护堆的秩序
      this.down(1);
    }
    // 否则直接丢弃这个元素
  }
  return this.minHeap[1];
};
/**
 * 最小堆的上浮操作
 * @param {number} idx 要上浮的元素下标
 */
KthLargest.prototype.up = function (idx) {
  let parent = Math.floor(idx / 2);
  if (parent >= 1 && this.minHeap[parent] > this.minHeap[idx]) {
    swap(this.minHeap, parent, idx);
    // 递归上浮
    this.up(parent);
  }
};
/**
 * 最小堆的下沉操作
 * @param {number} idx 要下沉的元素下标
 */
KthLargest.prototype.down = function (idx) {
  let to = idx;
  // 和左子元素比较
  let left = idx * 2;
  if (left < this.minHeap.length && this.minHeap[left] < this.minHeap[to]) {
    to = left;
  }
  // 和右子元素比较
  let right = idx * 2 + 1;
  if (right < this.minHeap.length && this.minHeap[right] < this.minHeap[to]) {
    to = right;
  }
  if (to !== idx) {
    swap(this.minHeap, to, idx);
    // 递归下沉
    this.down(to);
  }
};
// let obj = new KthLargest(k, nums)
// let param_1 = obj.add(val)

/**
 * Your KthLargest object will be instantiated and called as such:
 * var obj = new KthLargest(k, nums)
 * var param_1 = obj.add(val)
 */