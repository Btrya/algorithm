/**
 * 2021/09/12 每日一题 678. 有效的括号字符串
 * 给定一个只包含三种字符的字符串：（ ，） 和 *，写一个函数来检验这个字符串是否为有效字符串。有效字符串具有如下规则：
 * 
 * 任何左括号 ( 必须有相应的右括号 )。
 * 任何右括号 ) 必须有相应的左括号 ( 。
 * 左括号 ( 必须在对应的右括号之前 )。
 * * 可以被视为单个右括号 ) ，或单个左括号 ( ，或一个空字符串。
 * 一个空字符串也被视为有效字符串。
 * 示例 1:
 * 
 * 输入: "()"
 * 输出: True
 * 示例 2:
 * 
 * 输入: "(*)"
 * 输出: True
 * 示例 3:
 * 
 * 输入: "(*))"
 * 输出: True
 * 注意:
 * 
 * 字符串大小将在 [1，100] 范围内
 */
/**
 * @param {string} s
 * @return {boolean}
 */
var checkValidString = function (s) {
  let minCount = 0,
    maxCount = 0;
  const n = s.length;
  for (let i = 0; i < n; i++) {
    const c = s[i];
    if (c === '(') {
      minCount++;
      maxCount++;
    } else if (c === ')') {
      minCount = Math.max(minCount - 1, 0);
      maxCount--;
      if (maxCount < 0) {
        return false;
      }
    } else {
      minCount = Math.max(minCount - 1, 0);
      maxCount++;
    }
  }
  return minCount === 0;
};