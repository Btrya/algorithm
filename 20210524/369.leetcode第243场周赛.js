/**
 * 2021/05/30 第243场周赛
 * 5772. 检查某单词是否等于两单词之和
 * 字母的 字母值 取决于字母在字母表中的位置，从 0 开始 计数。即，'a' -> 0、'b' -> 1、'c' -> 2，以此类推。
 * 
 * 对某个由小写字母组成的字符串 s 而言，其 数值 就等于将 s 中每个字母的 字母值 按顺序 连接 并 转换 成对应整数。
 * 
 * 例如，s = "acb" ，依次连接每个字母的字母值可以得到 "021" ，转换为整数得到 21 。
 * 给你三个字符串 firstWord、secondWord 和 targetWord ，每个字符串都由从 'a' 到 'j' （含 'a' 和 'j' ）的小写英文字母组成。
 * 
 * 如果 firstWord 和 secondWord 的 数值之和 等于 targetWord 的数值，返回 true ；否则，返回 false 。
 * 
 * 示例 1：
 * 
 * 输入：firstWord = "acb", secondWord = "cba", targetWord = "cdb"
 * 输出：true
 * 解释：
 * firstWord 的数值为 "acb" -> "021" -> 21
 * secondWord 的数值为 "cba" -> "210" -> 210
 * targetWord 的数值为 "cdb" -> "231" -> 231
 * 由于 21 + 210 == 231 ，返回 true
 * 示例 2：
 * 
 * 输入：firstWord = "aaa", secondWord = "a", targetWord = "aab"
 * 输出：false
 * 解释：
 * firstWord 的数值为 "aaa" -> "000" -> 0
 * secondWord 的数值为 "a" -> "0" -> 0
 * targetWord 的数值为 "aab" -> "001" -> 1
 * 由于 0 + 0 != 1 ，返回 false
 * 示例 3：
 * 
 * 输入：firstWord = "aaa", secondWord = "a", targetWord = "aaaa"
 * 输出：true
 * 解释：
 * firstWord 的数值为 "aaa" -> "000" -> 0
 * secondWord 的数值为 "a" -> "0" -> 0
 * targetWord 的数值为 "aaaa" -> "0000" -> 0
 * 由于 0 + 0 == 0 ，返回 true
 *  
 * 
 * 提示：
 * 
 * 1 <= firstWord.length, secondWord.length, targetWord.length <= 8
 * firstWord、secondWord 和 targetWord 仅由从 'a' 到 'j' （含 'a' 和 'j' ）的小写英文字母组成。
 */
/**
 * @param {string} firstWord
 * @param {string} secondWord
 * @param {string} targetWord
 * @return {boolean}
 */
 var isSumEqual = function(firstWord, secondWord, targetWord) {
  const calcWordNum = (word) => {
    const n = word.length
    let ans = ''
    for (let i = 0; i < n; i++) {
      ans += word[i].charCodeAt() - 97
    }
    return ~~ans
  }
  return calcWordNum(firstWord) + calcWordNum(secondWord) === calcWordNum(targetWord)
};

/**
 * 5773. 插入后的最大值
 * 给你一个非常大的整数 n 和一个整数数字 x ，大整数 n 用一个字符串表示。n 中每一位数字和数字 x 都处于闭区间 [1, 9] 中，且 n 可能表示一个 负数 。
 * 
 * 你打算通过在 n 的十进制表示的任意位置插入 x 来 最大化 n 的 数值 ​​​​​​。但 不能 在负号的左边插入 x 。
 * 
 * 例如，如果 n = 73 且 x = 6 ，那么最佳方案是将 6 插入 7 和 3 之间，使 n = 763 。
 * 如果 n = -55 且 x = 2 ，那么最佳方案是将 2 插在第一个 5 之前，使 n = -255 。
 * 返回插入操作后，用字符串表示的 n 的最大值。
 * 示例 1：
 * 
 * 输入：n = "99", x = 9
 * 输出："999"
 * 解释：不管在哪里插入 9 ，结果都是相同的。
 * 示例 2：
 * 
 * 输入：n = "-13", x = 2
 * 输出："-123"
 * 解释：向 n 中插入 x 可以得到 -213、-123 或者 -132 ，三者中最大的是 -123 。
 * 提示：
 * 
 * 1 <= n.length <= 105
 * 1 <= x <= 9
 * n​​​ 中每一位的数字都在闭区间 [1, 9] 中。
 * n 代表一个有效的整数。
 * 当 n 表示负数时，将会以字符 '-' 开始。
 */
/**
 * @param {string} n
 * @param {number} x
 * @return {string}
 */
 var maxValue = function(n, x) {
  const isZheng = n.indexOf('-') === -1
  const ans = []
  let alreadyPush = false
  if (isZheng) {
    for (let i = 0; i < n.length; i++) {
      if (x > n[i] && !alreadyPush) {
        ans.push(x)
        alreadyPush = true
      }
      ans.push(n[i])
    }
  } else {
    ans.push('-')
    for (let i = 1; i < n.length; i++) {
      if (x < n[i] && !alreadyPush) {
        ans.push(x)
        alreadyPush = true
      }
      ans.push(n[i])
    }
  }
  if (!alreadyPush) ans.push(x)
  return ans.join('')
};

/**
 * 5774. 使用服务器处理任务
 * 给你两个 下标从 0 开始 的整数数组 servers 和 tasks ，长度分别为 n​​​​​​ 和 m​​​​​​ 。servers[i] 是第 i​​​​​​​​​​ 台服务器的 权重 ，而 tasks[j] 是处理第 j​​​​​​ 项任务 所需要的时间（单位：秒）。
 * 
 * 你正在运行一个仿真系统，在处理完所有任务后，该系统将会关闭。每台服务器只能同时处理一项任务。第 0 项任务在第 0 秒可以开始处理，相应地，第 j 项任务在第 j 秒可以开始处理。处理第 j 项任务时，你需要为它分配一台 权重最小 的空闲服务器。如果存在多台相同权重的空闲服务器，请选择 下标最小 的服务器。如果一台空闲服务器在第 t 秒分配到第 j 项任务，那么在 t + tasks[j] 时它将恢复空闲状态。
 * 
 * 如果没有空闲服务器，则必须等待，直到出现一台空闲服务器，并 尽可能早 地处理剩余任务。 如果有多项任务等待分配，则按照 下标递增 的顺序完成分配。
 * 
 * 如果同一时刻存在多台空闲服务器，可以同时将多项任务分别分配给它们。
 * 
 * 构建长度为 m 的答案数组 ans ，其中 ans[j] 是第 j 项任务分配的服务器的下标。
 * 
 * 返回答案数组 ans​​​​ 。
 * 
 * 示例 1：
 * 
 * 输入：servers = [3,3,2], tasks = [1,2,3,2,1,2]
 * 输出：[2,2,0,2,1,2]
 * 解释：事件按时间顺序如下：
 * - 0 秒时，第 0 项任务加入到任务队列，使用第 2 台服务器处理到 1 秒。
 * - 1 秒时，第 2 台服务器空闲，第 1 项任务加入到任务队列，使用第 2 台服务器处理到 3 秒。
 * - 2 秒时，第 2 项任务加入到任务队列，使用第 0 台服务器处理到 5 秒。
 * - 3 秒时，第 2 台服务器空闲，第 3 项任务加入到任务队列，使用第 2 台服务器处理到 5 秒。
 * - 4 秒时，第 4 项任务加入到任务队列，使用第 1 台服务器处理到 5 秒。
 * - 5 秒时，所有服务器都空闲，第 5 项任务加入到任务队列，使用第 2 台服务器处理到 7 秒。
 * 示例 2：
 * 
 * 输入：servers = [5,1,4,3,2], tasks = [2,1,2,4,5,2,1]
 * 输出：[1,4,1,4,1,3,2]
 * 解释：事件按时间顺序如下：
 * - 0 秒时，第 0 项任务加入到任务队列，使用第 1 台服务器处理到 2 秒。
 * - 1 秒时，第 1 项任务加入到任务队列，使用第 4 台服务器处理到 2 秒。
 * - 2 秒时，第 1 台和第 4 台服务器空闲，第 2 项任务加入到任务队列，使用第 1 台服务器处理到 4 秒。
 * - 3 秒时，第 3 项任务加入到任务队列，使用第 4 台服务器处理到 7 秒。
 * - 4 秒时，第 1 台服务器空闲，第 4 项任务加入到任务队列，使用第 1 台服务器处理到 9 秒。
 * - 5 秒时，第 5 项任务加入到任务队列，使用第 3 台服务器处理到 7 秒。
 * - 6 秒时，第 6 项任务加入到任务队列，使用第 2 台服务器处理到 7 秒。
 *  
 * 
 * 提示：
 * 
 * servers.length == n
 * tasks.length == m
 * 1 <= n, m <= 2 * 105
 * 1 <= servers[i], tasks[j] <= 2 * 105
 */
/**
 * @param {number[]} servers
 * @param {number[]} tasks
 * @return {number[]}
 */
 var assignTasks = function(servers, tasks) {

};