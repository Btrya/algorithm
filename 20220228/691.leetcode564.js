/**
 * 2022/03/02 每日一题 564. 寻找最近的回文数
 * 给定一个表示整数的字符串 n ，返回与它最近的回文整数（不包括自身）。如果不止一个，返回较小的那个。
 * 
 * “最近的”定义为两个整数差的绝对值最小。
 * 
 *  
 * 
 * 示例 1:
 * 
 * 输入: n = "123"
 * 输出: "121"
 * 示例 2:
 * 
 * 输入: n = "1"
 * 输出: "0"
 * 解释: 0 和 2是最近的回文，但我们返回最小的，也就是 0。
 *  
 * 
 * 提示:
 * 
 * 1 <= n.length <= 18
 * n 只由数字组成
 * n 不含前导 0
 * n 代表在 [1, 1018 - 1] 范围内的整数
 */
/**
 * @param {string} n
 * @return {string}
 */
var nearestPalindromic = function (n) {
  let palindromicList = ["", ""] //初始化数组，用于存放 小于n的最近回文数 和 大于n的最近回文数
  let nearest = "" //最近回文数
  let lenN = n.length
  let halfN = ""
  let typeN = false //不是回文数
  if (Number(n) < 11) { //个位数需要单独处理
    nearest = String(Number(n) - 1)
    return nearest
  } else if (Number(n) == 11) {
    nearest = "9"
    return nearest
  }
  if (n.split("").reverse().join("") == n) {
    typeN = true //n本身就是回文数
  }
  let isEvenNum = lenN % 2 == 0 //n是否为偶数
  if (isEvenNum) { //长度为偶数位，则截取 [0,lenN/2) 的元素
    halfN = n.slice(0, lenN / 2)
  } else { //长度为奇数位，则截取 [0,Math.ceil(lenN/2))的元素 
    halfN = n.slice(0, Math.ceil(lenN / 2))
  }
  let lenHalfN = halfN.length
  for (let L = Number(halfN) - 1, R = Number(halfN); L >= -1; L--, R++) { //halfN作为起始点 ，左右两边同时查找
    let revsL = ""
    let strL = Math.abs(L).toString()
    let lenStrL = strL.length
    if (isEvenNum) {
      revsL = strL.split("").reverse().join("")
    } else {
      revsL = strL.substring(0, lenStrL - 1).split("").reverse().join("")
    }
    let palindromicL = strL + revsL.toString()
    if (palindromicL.length < lenN) { //处理1000 ---> 999 等 字符串长度减少的情况，需要补1位
      palindromicL += strL[0] //999 --> 9999
    }
    if (palindromicL != n) {
      if ((Math.abs(palindromicL - n)) < (Math.abs(palindromicList[0] - n))) {
        palindromicList[0] = palindromicL
      }
    }
    let revsR = ""
    let strR = R.toString()
    let lenStrR = strR.length
    if (isEvenNum) {
      revsR = strR.split("").reverse().join("")
      if (lenStrR > lenHalfN) {
        revsR = revsR.substr(1)
      }
    } else {
      revsR = strR.substring(0, lenStrR - 1).split("").reverse().join("")
      if (revsR.length == 0) { //处理 个位数情况
        revsR = strR
      } else if (lenStrR > lenHalfN) { //处理 999 + 1 = 1000 等 字符串长度增加的情况，需要去掉1位
        revsR = revsR.substr(1) // 0001 --> 001 
      }
    }
    let palindromicR = strR + String(revsR)
    if ((Math.abs(palindromicR - n) < Math.abs(n - palindromicList[0]) && (palindromicR < n))) {
      palindromicList[0] = palindromicR
      continue
    }
    if (palindromicR != n) {
      palindromicList[1] = palindromicR
      break
    }
  }
  if (palindromicList[1] - n < n - palindromicList[0]) {
    nearest = palindromicList[1]
  } else {
    nearest = palindromicList[0]
  }
  return nearest
};