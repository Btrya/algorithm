/**
 * leetcode 2020/08/09 每日一题 93.复原IP地址
 * 给定一个只包含数字的字符串，复原它并返回所有可能的 IP 地址格式。
 * 有效的 IP 地址正好由四个整数（每个整数位于 0 到 255 之间组成），整数之间用 '.' 分隔。
 * 例：
 * 输入: "25525511135"
 * 输出: ["255.255.11.135", "255.255.111.35"]
 */

/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function(s) {
  let needCount = 4
  let segments = new Array(needCount)
  const ans = []
  const dfs = function(segId, segStart) {
      if (segId == needCount) {
          if (segStart == s.length) ans.push(segments.join('.'))
          return 
      }
      if (segStart == s.length) return 
      if (s.charAt(segStart) == '0') {
          segments[segId] = 0
          dfs (segId + 1, segStart + 1)
      }
      let addr = 0
      for (let i = segStart; i < s.length; i++) {
          addr = addr * 10 + (s.charAt(i) - '0')
          if (addr > 0 && addr <= 0xFF) {
              segments[segId] = addr
              dfs(segId + 1, i + 1)
          } else break
      }
  }
  dfs(0, 0)
  return ans
};