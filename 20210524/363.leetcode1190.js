/**
 * 2021/05/26 每日一题 1190. 反转每对括号间的子串
 * 给出一个字符串 s（仅含有小写英文字母和括号）。
 * 
 * 请你按照从括号内到外的顺序，逐层反转每对匹配括号中的字符串，并返回最终的结果。
 * 
 * 注意，您的结果中 不应 包含任何括号。
 * 示例 1：
 * 
 * 输入：s = "(abcd)"
 * 输出："dcba"
 * 示例 2：
 * 
 * 输入：s = "(u(love)i)"
 * 输出："iloveu"
 * 示例 3：
 * 
 * 输入：s = "(ed(et(oc))el)"
 * 输出："leetcode"
 * 示例 4：
 * 
 * 输入：s = "a(bcdefghijkl(mno)p)q"
 * 输出："apmnolkjihgfedcbq"
 */
/**
 * @param {string} s
 * @return {string}
 */
 var reverseParentheses = function(s) {
  const n = s.length
  const pair = new Array(n).fill(0)
  const stack = []
  for (let i = 0; i < n; i++) {
    if (s[i] === '(') stack.push(i)
    else if (s[i] === ')') {
      const j = stack.pop()
      pair[i] = j
      pair[j] = i
    }
  }
  const sb = []
  let index = 0, step = 1
  while (index < n) {
    if (s[index] === '(' || s[index] === ')') {
      index = pair[index]
      step = -step
    } else {
      sb.push(s[index])
    }
    index += step
  }
  return sb.join('')
};