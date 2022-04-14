/**
 * 2022/04/15 每日一题 385. 迷你语法分析器
 * 给定一个字符串 s 表示一个整数嵌套列表，实现一个解析它的语法分析器并返回解析的结果 NestedInteger 。
 *
 * 列表中的每个元素只可能是整数或整数嵌套列表
 *
 * 示例 1：
 *
 * 输入：s = "324",
 * 输出：324
 * 解释：你应该返回一个 NestedInteger 对象，其中只包含整数值 324。
 * 示例 2：
 *
 * 输入：s = "[123,[456,[789]]]",
 * 输出：[123,[456,[789]]]
 * 解释：返回一个 NestedInteger 对象包含一个有两个元素的嵌套列表：
 * 1. 一个 integer 包含值 123
 * 2. 一个包含两个元素的嵌套列表：
 *     i.  一个 integer 包含值 456
 *     ii. 一个包含一个元素的嵌套列表
 *          a. 一个 integer 包含值 789
 *
 *
 * 提示：
 *
 * 1 <= s.length <= 5 * 104
 * s 由数字、方括号 "[]"、负号 '-' 、逗号 ','组成
 * 用例保证 s 是可解析的 NestedInteger
 * 输入中的所有值的范围是 [-106, 106]
 */
/**
 * // This is the interface that allows for creating nested lists.
 * // You should not implement it, or speculate about its implementation
 * function NestedInteger() {
 *
 *     Return true if this NestedInteger holds a single integer, rather than a nested list.
 *     @return {boolean}
 *     this.isInteger = function() {
 *         ...
 *     };
 *
 *     Return the single integer that this NestedInteger holds, if it holds a single integer
 *     Return null if this NestedInteger holds a nested list
 *     @return {integer}
 *     this.getInteger = function() {
 *         ...
 *     };
 *
 *     Set this NestedInteger to hold a single integer equal to value.
 *     @return {void}
 *     this.setInteger = function(value) {
 *         ...
 *     };
 *
 *     Set this NestedInteger to hold a nested list and adds a nested integer elem to it.
 *     @return {void}
 *     this.add = function(elem) {
 *         ...
 *     };
 *
 *     Return the nested list that this NestedInteger holds, if it holds a nested list
 *     Return null if this NestedInteger holds a single integer
 *     @return {NestedInteger[]}
 *     this.getList = function() {
 *         ...
 *     };
 * };
 */
/**
 * @param {string} s
 * @return {NestedInteger}
 */
var deserialize = function (s) {
  if (s[0] !== "[") return new NestedInteger(~~s)
  const stack = []
  let num = ""
  let negative = false
  for (let i = 0; i < s.length; ++i) {
    if (s[i] === "-") negative = true
    else if (isDigit(s[i])) {
      num += s[i]
    } else if (s[i] === "[") {
      stack.push(new NestedInteger())
    } else if (s[i] === "," || s[i] === "]") {
      if (isDigit(s[i - 1])) {
        if (negative) num *= -1
        stack[stack.length - 1].add(new NestedInteger(~~num))
      }
      num = ""
      negative = false
      if (s[i] === "]" && stack.length > 1) {
        const tmp = stack.pop()
        stack[stack.length - 1].add(tmp)
      }
    }
  }
  return stack.pop()
}

const isDigit = (ch) => {
  return parseFloat(ch).toString() === "NaN" ? false : true
}

var deserialize = function (s) {
  let obj = JSON.parse(s)
  let parse = function (value) {
    let res = new NestedInteger()
    if (Array.isArray(value)) {
      value.forEach((v) => {
        res.add(parse(v))
      })
    } else {
      res.setInteger(value)
    }
    return res
  }
  return parse(obj)
}
