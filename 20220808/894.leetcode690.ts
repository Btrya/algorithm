/**
 * 2022/08/10 每日一题 640. 求解方程
 * 求解一个给定的方程，将x以字符串 "x=#value" 的形式返回。该方程仅包含 '+' ， '-' 操作，变量 x 和其对应系数。
 *
 * 如果方程没有解，请返回 "No solution" 。如果方程有无限解，则返回 “Infinite solutions” 。
 *
 * 如果方程中只有一个解，要保证返回值 'x' 是一个整数。
 *
 * 示例 1：
 *
 * 输入: equation = "x+5-3+x=6+x-2"
 * 输出: "x=2"
 * 示例 2:
 *
 * 输入: equation = "x=x"
 * 输出: "Infinite solutions"
 * 示例 3:
 *
 * 输入: equation = "2x=x"
 * 输出: "x=0"
 *
 * 提示:
 *
 * 3 <= equation.length <= 1000
 * equation 只有一个 '='.
 * equation 方程由整数组成，其绝对值在 [0, 100] 范围内，不含前导零和变量 'x' 。
 */
/**
 * @param {string} equation
 * @return {string}
 */
var solveEquation = function (equation) {
  const NO_RESULT = "No solution"
  const INFINITE_RESULT = "Infinite solutions"
  let factor = 0,
    val = 0
  let index = 0,
    n = equation.length,
    sign1 = 1 // 等式左边默认系数为正
  while (index < n) {
    if (equation[index] === "=") {
      sign1 = -1 // 等式右边默认系数为负
      index++
      continue
    }

    let sign2 = sign1,
      number = 0
    let valid = false // 记录 number 是否有效
    if (equation[index] === "-" || equation[index] === "+") {
      // 去掉前面的符号
      sign2 = equation[index] === "-" ? -sign1 : sign1
      index++
    }
    while (index < n && isDigit(equation[index])) {
      number = number * 10 + (equation[index].charCodeAt() - "0".charCodeAt())
      index++
      valid = true
    }

    if (index < n && equation[index] === "x") {
      // 变量
      factor += valid ? sign2 * number : sign2
      index++
    } else {
      // 数值
      val += sign2 * number
    }
  }

  if (factor === 0) {
    return val === 0 ? INFINITE_RESULT : NO_RESULT
  }
  if (val % factor !== 0) {
    return NO_RESULT
  }
  return "x=" + -val / factor
}

const isDigit = (ch) => {
  return parseFloat(ch).toString() === "NaN" ? false : true
}
