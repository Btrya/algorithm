/**
 * 2021/11/01 每日第二题
 * 无序数组中找到左侧都比他小右侧都比他大的数，要求时间复杂度为O(n)
 */
/**
 * 第一遍从左到右对每一个点比较，更新最大值的下标，找到相对增序的标记数组，第二遍反过来，更新最小值的下标，找对相对降序的标记数组，
 * 第三遍遍历多一次数组，当这个位置的数字被两次标记了，说明它比左边的都大，比右边的都小
 */
var findTarget = function(arr) {
  const n = arr.length
  let max = Number.MIN_SAFE_INTEGER, min = Number.MAX_SAFE_INTEGER
  let left2Right = new Array(n).fill(0), right2Left = new Array(n).fill(0)
  let res = []
  // 从左到右找大于 i 点的值，记录并标记该点为 1
  for (let i = 0; i < n; ++i) {
    if (arr[i] > max) {
      left2Right[i] = 1
      max = arr[i]
    }
  }
  // 从左到右找小于 i 点的值，记录并标记该点为 1
  for (let i = n - 1; i >= 0; --i) {
    if (arr[i] < min) {
      right2Left[i] = 1
      min = arr[i]
    }
  }
  // 遍历多一次数组，将正反标记数组相加，找到2的就是目标值
  for (let i = 0; i < n; ++i) {
    if (left2Right[i] + right2Left[i] == 2) res.push(arr[i])
  }
  return res
}

console.log(findTarget([2, 1, 2, 3, 5]))