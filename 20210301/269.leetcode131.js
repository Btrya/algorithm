/**
 * 2021/03/07 每日一题 131.分割回文串
 * 给定一个字符串 s，将 s 分割成一些子串，使每个子串都是回文串。
 * 
 * 返回 s 所有可能的分割方案。
 * 
 * 示例:
 * 
 * 输入: "aab"
 * 输出:
 * [
 *   ["aa","b"],
 *   ["a","a","b"]
 * ]
 */
/**
 * @param {string} s
 * @return {string[][]}
 */
 var partition = function(s) {
  const dfs = (i) => {
    if (i === n) {
      ret.push(ans.slice())
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
  return ret;
};