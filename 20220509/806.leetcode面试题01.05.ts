/**
 * 2022/05/13 每日一题 面试题 01.05. 一次编辑
 * 字符串有三种编辑操作:插入一个字符、删除一个字符或者替换一个字符。 给定两个字符串，编写一个函数判定它们是否只需要一次(或者零次)编辑。
 * 
 * 示例 1:
 * 
 * 输入: 
 * first = "pale"
 * second = "ple"
 * 输出: True
 *  
 * 
 * 示例 2:
 * 
 * 输入: 
 * first = "pales"
 * second = "pal"
 * 输出: False
 */
 function oneEditAway(first: string, second: string): boolean {
  if (first === second) return true
  const n1 = first.length, n2 = second.length
  const absDif = Math.abs(n1 - n2)
  // 长度相等判断是否可以只替换一个字符
  if (n1 === n2) {
    return onlyChangeOne(first, second)
  } else if (n1 > n2 && absDif === 1) { // n1 比 n2 大看看是否能通过删除一个字符来达到 second
    return delOneChar(first, second)
  } else if (n2 > n1 && absDif === 1){ // n2 比 n1 大看看能否能过增加一个字符来达到 second
    return delOneChar(second, first)
  }
  return false
};
function onlyChangeOne(str1, str2) {
  let count = 0
  for (let i = 0; i < str1.length; ++i) {
    if (str1[i] !== str2[i]) count++
    if (count > 1) return false
  }
  return count === 1
}
function delOneChar(str1, str2) {
  let l1 = 0, l2 = 0, r1 = str1.length - 1, r2 = str2.length - 1
  while (str1[l1] === str2[l2]) {
    l1++
    l2++
  }
  while (str1[r1] === str2[r2]) {
    r1--
    r2--
  }
  return r1 - l1 === 0
}