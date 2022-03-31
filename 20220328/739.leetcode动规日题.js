/**
 * 2022/03/31 动规日题
 * 139. 单词拆分
 * 给你一个字符串 s 和一个字符串列表 wordDict 作为字典。请你判断是否可以利用字典中出现的单词拼接出 s 。
 * 
 * 注意：不要求字典中出现的单词全部都使用，并且字典中的单词可以重复使用。
 * 
 *  
 * 
 * 示例 1：
 * 
 * 输入: s = "leetcode", wordDict = ["leet", "code"]
 * 输出: true
 * 解释: 返回 true 因为 "leetcode" 可以由 "leet" 和 "code" 拼接成。
 * 示例 2：
 * 
 * 输入: s = "applepenapple", wordDict = ["apple", "pen"]
 * 输出: true
 * 解释: 返回 true 因为 "applepenapple" 可以由 "apple" "pen" "apple" 拼接成。
 *      注意，你可以重复使用字典中的单词。
 * 示例 3：
 * 
 * 输入: s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]
 * 输出: false
 *  
 * 
 * 提示：
 * 
 * 1 <= s.length <= 300
 * 1 <= wordDict.length <= 1000
 * 1 <= wordDict[i].length <= 20
 * s 和 wordDict[i] 仅有小写英文字母组成
 * wordDict 中的所有字符串 互不相同
 */
/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
 var wordBreak = function (s, wordDict) {
  const wordSet = new Set(wordDict)
  const len = s.length
  const dp = new Array(len + 1).fill(false)
  dp[0] = true
  for (let i = 1; i <= len; i++) {
    for (let j = i - 1; j >= 0; j--) {
      if (dp[i] == true) break
      if (dp[j] == false) continue
      const suffix = s.slice(j, i)
      if (wordSet.has(suffix) && dp[j] == true) {
        dp[i] = true
        break
      }
    }
  }
  return dp[s.length]
};

/**
 * 42. 接雨水
 * https://leetcode-cn.com/problems/trapping-rain-water/
 */
/**
 * @param {number[]} height
 * @return {number}
 */
 var trap = function(height) {
  let n = height.length
  let fromLeft = new Array(n).fill(0)
  let fromRight = new Array(n).fill(0)
  let leftMax = 0, rightMax = 0
  for (let i = 0; i < n; ++i) {
    leftMax = Math.max(leftMax, height[i])
    fromLeft[i] = leftMax 
  }
  for (let i = n - 1; i >= 0; --i) {
    rightMax = Math.max(rightMax, height[i])
    fromRight[i] = rightMax 
  }
  let ans = 0
  for (let i = 0; i < n; ++i) {
    ans += Math.min(fromLeft[i], fromRight[i]) - height[i]
  }
  return ans
};