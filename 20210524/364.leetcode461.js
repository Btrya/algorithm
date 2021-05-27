/**
 * 2021/05/27 每日一题 461. 汉明距离
 * 两个整数之间的汉明距离指的是这两个数字对应二进制位不同的位置的数目。
 * 
 * 给出两个整数 x 和 y，计算它们之间的汉明距离。
 * 
 * 注意：
 * 0 ≤ x, y < 231.
 * 
 * 示例:
 * 
 * 输入: x = 1, y = 4
 * 
 * 输出: 2
 * 
 * 解释:
 * 1   (0 0 0 1)
 * 4   (0 1 0 0)
 *        ↑   ↑
 * 
 * 上面的箭头指出了对应二进制位不同的位置。
 */
/**
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
 var hammingDistance = function(x, y) {
  let x2 = x.toString(2), y2 = y.toString(2) // 10进制转2进制 
  const len = Math.max(x2.length, y2.length) // 拿到2进制长度相对较长的那个长度
  let res = 0
  x2 = x2.padStart(len, '0') // 少的那一个前缀补0
  y2 = y2.padStart(len, '0')
  for (let i = len - 1; i >= 0; i--) {
    if (y2[i] !== x2[i]) res++ // 从后往前匹配，不一样则结果+1
  }
  return res
};

var hammingDistance = function(x, y) {
  let s = x ^ y, ret = 0;
  while (s != 0) {
      s &= s - 1;
      ret++;
  }
  return ret;
};