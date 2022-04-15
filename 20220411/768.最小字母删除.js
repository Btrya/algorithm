/**
 * 2022/04/15 群友贡献题
 * 【最小字母删除】
 * 对于一个仅含有小写字母的字符串，定义一次删除操作：
 * 选择字符串中最小字典序的字母，若有多个相同字母，则选择最左边那个，将其从字符串中删除
 * 给定字符串和正整数k，输出进行k次删除操作之后的字符串结果
 * 
 * 输入描述
 * 一个仅含有小写字母的字符串s
 * k
 * 
 * 输出描述
 * 进行k次删除操作之后的字符串
 * 
 * 【示例】
 * 输入
 * badabpzib
 * 3
 * 
 * 输出
 * dbpzib
 */
function delMinChar(s, k) {
  const n = s.length
  if (n < k) return ''
  const charArr = Array.from(new Array(26), () => [])
  let res = ''
  for (let i = 0; i < n; ++i) {
    const charCode = s[i].charCodeAt() - 97
    charArr[charCode].push(i)
  }
  // 拍平数组
  const flatArr = charArr.flat().slice(0, k)
  for (let i = 0; i < n; ++i) {
    if (!flatArr.includes(i)) res += s[i]
  }
  return res
}

function delMinChar1(s, k) {
  const n = s.length
  let res = s.split('')
  if (n < k) return ''
  const charArr = Array.from(new Array(26), () => [])
  for (let i = 0; i < n; ++i) {
    const charCode = s[i].charCodeAt() - 97
    charArr[charCode].push(i)
  }
  // 拍平数组
  const flatArr = charArr.flat().slice(0, k).sort((a, b) => b - a)
  for (let i = 0; i < flatArr.length; ++i) {
    res.splice(flatArr[i], 1)
  }
  return res.join('')
}

console.time('includes')
console.log(delMinChar('badabpzib', 3)) // dbpzib
console.timeEnd('includes')
console.time('splice')
console.log(delMinChar1('badabpzib', 3)) // dbpzib
console.timeEnd('splice')