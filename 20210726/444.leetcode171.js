/**
 * 2021/07/30 每日一题 171. Excel表列序号
 */
/**
 * @param {string} columnTitle
 * @return {number}
 */
 var titleToNumber = function(columnTitle) {
  let n = columnTitle.length, ans = 0, index = 0
  for (let i = n - 1; i >=0; --i) {
    const num = columnTitle[i].charCodeAt() - 'A'.charCodeAt() + 1
    ans += 26 ** index++ * num
  }
  return ans
};