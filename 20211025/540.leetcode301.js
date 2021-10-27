/**
 * 2021/10/27 每日一题 301. 删除无效的括号
 * 给你一个由若干括号和字母组成的字符串 s ，删除最小数量的无效括号，使得输入的字符串有效。
 * 
 * 返回所有可能的结果。答案可以按 任意顺序 返回。
 * 
 * 示例 1：
 * 
 * 输入：s = "()())()"
 * 输出：["(())()","()()()"]
 * 示例 2：
 * 
 * 输入：s = "(a)())()"
 * 输出：["(a())()","(a)()()"]
 * 示例 3：
 * 
 * 输入：s = ")("
 * 输出：[""]
 *  
 * 
 * 提示：
 * 
 * 1 <= s.length <= 25
 * s 由小写英文字母以及括号 '(' 和 ')' 组成
 * s 中至多含 20 个括号
 */
/**
 * @param {string} s
 * @return {string[]}
 */
var removeInvalidParentheses = function (s) {
  const ans = [];
  let currSet = new Set();

  currSet.add(s);
  while (true) {
    for (const str of currSet) {
      if (isValid(str)) {
        ans.push(str);
      }
    }
    if (ans.length > 0) {
      return ans;
    }
    const nextSet = new Set();
    for (const str of currSet) {
      for (let i = 0; i < str.length; i++) {
        if (i > 0 && str[i] === str[i - 1]) {
          continue;
        }
        if (str[i] === '(' || str[i] === ')') {
          nextSet.add(str.substring(0, i) + str.substring(i + 1));
        }
      }
    }
    currSet = nextSet;
  }
}

const isValid = (str) => {
  let count = 0;

  for (const c of str) {
    if (c === '(') {
      count++;
    } else if (c === ')') {
      count--;
      if (count < 0) {
        return false;
      }
    }
  }

  return count === 0;
}