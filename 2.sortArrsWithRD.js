/**
 * 2.合并二维有序数组成一维有序数组，归并排序的思路
 * @param arrs 传入二维数组
 */

 // test Data
 let arrs = [[2, 5, 6], [1, 3, 5], [7, 8, 10], [4, 6, 8]]

 // 最简单的实现方法：数组降维+升序排序， 但这不是归并排序的思路
 function mySimpleRealizeFun(arrs) {
  // 降维第一时间想到Array.flat()
  let newArrs = arrs.flat().sort((a, b) => a - b)
  return newArrs
 }

 console.log(mySimpleRealizeFun(arrs))

 // 归并排序的思路
 /**
  * 递归分割函数
  * @param {Array} arrs 
  */
 function mergeSort(arrs) {
  const len = arrs.length
  // 当arrs的子数组只有一个的时候，无法再继续分割，返回这个arr
  if (len <= 1) {
    return arrs[0]
  }
  // 计算分割点
  const mid = Math.floor(len / 2)
  // 左子数组
  const leftArr = mergeSort(arrs.slice(0, mid))
  // 右子数组
  const rightArr = mergeSort(arrs.slice(mid, len))
  // 合并降维且为有序数组的左右数组
  arrs = mergeArr(leftArr, rightArr)
  return arrs
 }
 /**
  * 合并数组函数
  * @param {Array} arr1
  * @param {Array} arr2
  */
 function mergeArr(arr1, arr2) {
  // 初始化结果数组，缓存arr1，arr2的数组长度
  const res = [],
      len1 = arr1.length,
      len2 = arr2.length
  // 定义arr1,arr2指针
  let i = 0,
      j = 0
  // 合并子数组
  while(i < len1 && j < len2) {
    if (arr1[i] < arr2[j]) {
      res.push(arr1[i])
      i++
    } else {
      res.push(arr2[j])
      j++
    }
  }
  // 当有一个子数组首先合并完全，则拼接另一个数组的剩余部分
  if (i < len1) {
    return res.concat(arr1.slice(i))
  } else {
    return res.concat(arr2.slice(j))
  }
 }

 console.log(mergeSort(arrs))