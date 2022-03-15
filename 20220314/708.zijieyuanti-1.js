/**
 * 2022/03/15 字节原题
 * 输入整数数组arr，找出其中最小的k个数，输出时相对位置不变
 */
function getMinKArr(arr, k) {
  let sorted = JSON.parse(JSON.stringify(arr)).sort((a, b) => a - b) // sort会改变原数组
  let minKArr = sorted.splice(0, k) // 拿到最小k个数
  if (k == 1) return minKArr // 边界剪枝
  // 拿到 最小k个数 中最大的数，统计其数量
  let minKArrMaxNum = minKArr[minKArr.length - 1], count = 1
  for (let i = minKArr.length - 2; i >= 0; --i) {
    if (minKArr[i] == minKArrMaxNum) count++
    else break // 如果倒数第二位数已经不是这个数了直接break掉循环 剪枝
  }
  // 遍历原数组找对相对位置，此时比 minKArrMaxNum 小的可以直接push，相等的话要根据count来决定需不需要push
  let res = []
  for (let i = 0; i < arr.length; ++i) {
    if (arr[i] < minKArrMaxNum) res.push(arr[i])
    else if (arr[i] === minKArrMaxNum && count-- > 0) res.push(arr[i])
    // arr[i] === minKArrMaxNum 不满足不会走 count--
  }
  return res
}

console.log(getMinKArr([3, 2, 1], 2))
console.log(getMinKArr([0, 1, 2, 1], 3))
console.log(getMinKArr([4, 5, 1, 6, 2, 7, 3, 8], 4))