/**
 * 2022/07/14 每日一题 2325. 解密消息
 * https://leetcode.cn/problems/decode-the-message/
 */
function decodeMessage(key: string, message: string): string {
  let cnt = [...new Set([...key])].filter((c) => c != " ")
  return [...message]
    .map((c) => (c == " " ? c : String.fromCharCode(cnt.indexOf(c) + 97)))
    .join("")
}
