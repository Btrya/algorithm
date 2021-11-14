/**
 * 2021/11/14 每日一题 5928. 解码斜向换位密码
 * https://leetcode-cn.com/contest/weekly-contest-267/problems/decode-the-slanted-ciphertext/
 */
/**
 * @param {string} encodedText
 * @param {number} rows
 * @return {string}
 */
 var decodeCiphertext = function(encodedText, rows) {
  if (rows.length == 1) return encodedText
  const n = encodedText.length
  const cols = n % rows == 0 ? n / rows : (n / rows) + (rows - n % rows)
  const last = rows * cols
  let res = ''
  // let arr = Array.from(Array(rows), () => Array(cols).fill(' '))
  for (let i = 0; i < cols; ++i) {
    res += encodedText[i]
    for (let j = 1; j < rows; ++j) {
      res += encodedText[i + (j * cols + j)] || ''
      if (i + (j * cols + j) >= last) return res.replace(/[\s]+$/g, "")
    }
  }
  return res.replace(/[\s]+$/g, "")
};