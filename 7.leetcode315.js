/**
 * 转至leetcode 315题：计算右侧小于当前元素的个数 (Hard)
 * 给定一个整数数组 nums，按要求返回一个新数组 counts。数组 counts 有该性质： counts[i] 的值是  nums[i] 右侧小于 nums[i] 的元素的数量。
 * 输入: [5,2,6,1]
 * 输出: [2,1,1,0] 
 * @param {number[]} nums
 * @return {number[]}
 */
// 遍历解法
// var countSmaller = function(nums) {
//   let arr = []
//   nums.forEach((item, index) => {
//     let count = 0
//     for (let i = index; i < nums.length; i++ ) {
//       if (item > nums[i]) {
//         count++
//       }
//     }
//     arr.push(count)
//   })
//   return arr
// };

// // 离散化树状数组
// var countSmaller = function(nums) {
//   let res = []
//   let font = new Array(nums.length + 1).fill(0)
//   let bucket = []
//   const discrretization = function(name) {
//     let set = new Set()
//     for (let s of nums) {
//       set.add(s)
//     }
//     let index = 0
//     for (let s of set) {
//       bucket[index++] = s
//     }
//     bucket.sort((a, b) => a - b)
//   }
//   // 求i对应二进制最小位开始的连续0个数
//   const lowbit = function(x) {
//     return x & -x
//   }
//   const getId = function(x) {
//     return bucket.indexOf(x) + 1
//   }
//   const query = function(pos) {
//     let ret = 0
//     while(pos > 0) {
//       ret += font[pos]
//       pos -= lowbit(pos)
//     }
//     return ret
//   }
//   const update = function(pos) {
//     while(pos < font.length) {
//       font[pos] += 1
//       pos += lowbit(pos)
//       console.log(pos)
//     }
//   }
//   discrretization(nums)
//   for (let i = nums.length - 1; i >= 0; i--) {
//     let id = getId(nums[i])
//     res.push(query(id - 1))
//     update(id)
//     console.log('font', font)
//     console.log('bucket', bucket)
//     console.log('res', res)
//   }
//   return res.reverse()
// };

// 归并排序
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var countSmaller = function(nums) {
  let index = new Array(nums.length)
  let temp = new Array(nums.length)
  let tempIndex = new Array(nums.length)
  let ans = new Array(nums.length).fill(0)
  const Merge = function(arr, l, mid, r) {
      let i = l, j = mid + 1, p = l
      while(i <= mid && j <= r) {
          if(arr[i] <= arr[j]) {
              temp[p] = arr[i]
              tempIndex[p] = index[i]
              ans[index[i]] += (j - mid - 1)
              ++i
              ++p
          } else {
              temp[p] = arr[j]
              tempIndex[p] = index[j]
              ++j
              ++p
          }
      }
      while(i <= mid) {
          temp[p] = arr[i]
          tempIndex[p] = index[i]
          ans[index[i]] += (j - mid - 1)
          ++i
          ++p
      }
      while(j <= r) {
          temp[p] = arr[j]
          tempIndex[p] = index[j]
          ++j
          ++p
      }
      for(let k = l; k <= r; k++) {
          index[k] = tempIndex[k]
          arr[k] = temp[k]
      }
  };
  const MergeSort = function (arr, l, r) {
      if (l >= r) return
      let mid = (l + r) >> 1
      MergeSort(arr, l, mid)
      MergeSort(arr, mid + 1, r)
      Merge(arr, l, mid, r)
  }
  for (let i = 0; i < nums.length; i++) {
      index[i] = i
  }
  let l = 0, r = nums.length - 1
  MergeSort(nums, l, r)
  console.log(temp)
  console.log(tempIndex)
  return ans
};

let testData = [5,2,6,1]
console.log(countSmaller(testData))