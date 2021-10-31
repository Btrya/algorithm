/**
 * 2021/10/31 每日二题 剑指 Offer 40. 最小的k个数
 * 输入整数数组 arr ，找出其中最小的 k 个数。例如，输入4、5、1、6、2、7、3、8这8个数字，则最小的4个数字是1、2、3、4。
 * 
 * 示例 1：
 * 
 * 输入：arr = [3,2,1], k = 2
 * 输出：[1,2] 或者 [2,1]
 * 示例 2：
 * 
 * 输入：arr = [0,1,2,1], k = 1
 * 输出：[0]
 *  
 * 
 * 限制：
 * 
 * 0 <= k <= arr.length <= 10000
 * 0 <= arr[i] <= 10000
 */
/**
 * 堆排序
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 */
 var getLeastNumbers = function(arr, k) {
  heapSort(arr)
  return arr.splice(0, k)
};
/**
 * 堆排序主函数
 */
function heapSort(arr) {
  // 构建初始大顶堆
  buildMaxHeap(arr)
  for (let i = arr.length - 1; i > 0; --i) {
    // 将最大值交换到数组最后
    swap(arr, 0, i)
    // 调整剩余数组，使其满足大顶堆
    maxHeapify(arr, 0, i)
  }
}
/**
 * 构建初始大顶堆 函数
 */
function buildMaxHeap(arr) {
  // 从最后一个非叶子结点开始调整大顶堆，最后一个非叶子结点的下标就是 Math.floor(arr.length / 2) - 1
  for (let i = Math.floor(arr.length / 2) - 1; i >= 0; --i) {
    maxHeapify(arr, i, arr.length)
  }
}
/**
 *  调整大顶堆 函数
 * @param arr 要调整的数组
 * @param i 结点下标
 * @param heapSize 表示剩余未排序的数字的数量，也就是剩余堆的大小
 */
function maxHeapify(arr, i, heapSize) {
  // 定义左子节点下标
  let l = 2 * i + 1
  // 定义右子节点下标
  let r = l + 1
  // 记录根节点、左子树节点、右子树结点三者中的最大值下标，默认设置为根结点(当前节点下标)
  let largest = i
  // 与左子树节点比较
  if (l < heapSize && arr[l] > arr[largest]) {
    largest = l
  }
  // 与右子树节点比较
  if (r < heapSize && arr[r] > arr[largest]) {
    largest = r
  }
  if (largest !== i) {
    // 不是根结点 需要交换，把大的换到根结点位置
    swap(arr, i, largest)
    // 再次调整交换数字后的大顶堆， 相当于递归
    maxHeapify(arr, largest, heapSize)
  }
}
/**
 * 交换元素函数
 */
function swap(arr, i, j) {
  let temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}