/**
 * 2022/03/29 每日一题 2024. 考试的最大困扰度
 * 一位老师正在出一场由 n 道判断题构成的考试，每道题的答案为 true （用 'T' 表示）或者 false （用 'F' 表示）。老师想增加学生对自己做出答案的不确定性，方法是 最大化 有 连续相同 结果的题数。（也就是连续出现 true 或者连续出现 false）。
 * 
 * 给你一个字符串 answerKey ，其中 answerKey[i] 是第 i 个问题的正确结果。除此以外，还给你一个整数 k ，表示你能进行以下操作的最多次数：
 * 
 * 每次操作中，将问题的正确答案改为 'T' 或者 'F' （也就是将 answerKey[i] 改为 'T' 或者 'F' ）。
 * 请你返回在不超过 k 次操作的情况下，最大 连续 'T' 或者 'F' 的数目。
 * 
 *  
 * 
 * 示例 1：
 * 
 * 输入：answerKey = "TTFF", k = 2
 * 输出：4
 * 解释：我们可以将两个 'F' 都变为 'T' ，得到 answerKey = "TTTT" 。
 * 总共有四个连续的 'T' 。
 * 示例 2：
 * 
 * 输入：answerKey = "TFFT", k = 1
 * 输出：3
 * 解释：我们可以将最前面的 'T' 换成 'F' ，得到 answerKey = "FFFT" 。
 * 或者，我们可以将第二个 'T' 换成 'F' ，得到 answerKey = "TFFF" 。
 * 两种情况下，都有三个连续的 'F' 。
 * 示例 3：
 * 
 * 输入：answerKey = "TTFTTFTT", k = 1
 * 输出：5
 * 解释：我们可以将第一个 'F' 换成 'T' ，得到 answerKey = "TTTTTFTT" 。
 * 或者我们可以将第二个 'F' 换成 'T' ，得到 answerKey = "TTFTTTTT" 。
 * 两种情况下，都有五个连续的 'T' 。
 *  
 * 
 * 提示：
 * 
 * n == answerKey.length
 * 1 <= n <= 5 * 104
 * answerKey[i] 要么是 'T' ，要么是 'F'
 * 1 <= k <= n
 */
/**
 * @param {string} answerKey
 * @param {number} k
 * @return {number}
 */
var maxConsecutiveAnswers = function (answerKey, k) {
  const getMax = (type, keys, k) => {
    const n = keys.length
    let ans = 0
    for (let left = 0, right = 0, sum = 0; right < n; right++) {
      sum += keys[right] !== type ? 1 : 0
      while (sum > k) {
        sum -= keys[left++] !== type ? 1 : 0
      }
      ans = Math.max(ans, right - left + 1)
    }
    return ans
  }
  return Math.max(getMax('T', answerKey, k), getMax('F', answerKey, k))
};

var maxConsecutiveAnswers = function (answerKey, k) {
  const n = answerKey.length
  // [l,r] 窗口内的 t个数 f个数
  let sumt = 0,
    sumf = 0
  let ans = 0,
    l = 0
  for (let r = 0; r < n; r++) {
    if (answerKey[r] === 'T') sumt++
    else sumf++
    // 当两个计数都超过k时, 需要收缩窗口
    while (sumt > k && sumf > k) {
      if (answerKey[l] === 'T') sumt--
      else sumf--
      l++
    }
    ans = Math.max(ans, r - l + 1)
  }
  return ans
};