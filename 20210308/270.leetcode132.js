/**
 * 2021/03/08 每日一题 132. 分割回文串 II
 * 给你一个字符串 s，请你将 s 分割成一些子串，使每个子串都是回文。
 * 返回符合要求的 最少分割次数 。
 * 
 * 示例 1：
 * 
 * 输入：s = "aab"
 * 输出：1
 * 解释：只需一次分割就可将 s 分割成 ["aa","b"] 这样两个回文子串。
 * 示例 2：
 * 
 * 输入：s = "a"
 * 输出：0
 * 示例 3：
 * 
 * 输入：s = "ab"
 * 输出：1
 */
/**
 * @param {string} s
 * @return {number}
 */
 var minCut = function(s) {
  const dfs = (i) => {
    if (i === n) {
      ret.push(ans.slice().length)
      return 
    }
    for (let j = i; j < n; j++) {
      if (f[i][j]) {
        ans.push(s.slice(i, j + 1))
        dfs(j + 1)
        ans.pop()
      }
    }
  }
  const n = s.length;
  const f = new Array(n).fill(0).map(() => new Array(n).fill(true));
  let ret = [], ans = [];
  
  for (let i = n - 1; i >= 0; --i) {
      for (let j = i + 1; j < n; ++j) {
          f[i][j] = (s[i] === s[j]) && f[i + 1][j - 1];
      }
  }
  dfs(0);
  return ret.sort((a, b) => a - b)[0];
};