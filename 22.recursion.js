/**
 * 递归
 */

function recursion(level, param) {
  // 1.recursion terminator 终止递归的条件(忘记加这个就可能造成死循环)
  if (level > MAX_LEVEL) return
  // 2.process logic in current level  处理当前层逻辑
  process(level, param)
  // 3.drill down 进入下一层
  recursion(level + 1, newParam)
  // 4.reverse the current level status if needed  清理当前层(不是所有函数都需要清理)
}

/**
 * leetcode 22.括号生成
 * 数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。
 * 输入：n = 3
 * 输出：[
 *        "((()))",
 *        "(()())",
 *        "(())()",
 *        "()(())",
 *        "()()()"
 *      ]
 */
 /**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
  let res = []
  const _generate = function (left, right, str) {
    // terminator
    if (left == 0 && right == 0)  res.push(str)
    // process current logic and drill down
    if (left != 0) _generate(left - 1, right, str + "(")
    if (right != 0 && right > left) _generate(left, right - 1, str + ")")
  }
  _generate(n, n, "")
  return res
};

console.log(generateParenthesis(3))