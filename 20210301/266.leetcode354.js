/**
 * 2021/03/04 每日一题 354. 俄罗斯套娃信封问题
 * 给定一些标记了宽度和高度的信封，宽度和高度以整数对形式 (w, h) 出现。
 * 当另一个信封的宽度和高度都比这个信封大的时候，这个信封就可以放进另一个信封里，如同俄罗斯套娃一样。
 * 
 * 请计算最多能有多少个信封能组成一组“俄罗斯套娃”信封（即可以把一个信封放到另一个信封里面）。
 * 
 * 说明:
 * 不允许旋转信封。
 * 
 * 示例:
 * 
 * 输入: envelopes = [[5,4],[6,4],[6,7],[2,3]]
 * 输出: 3 
 * 解释: 最多信封的个数为 3, 组合为: [2,3] => [5,4] => [6,7]。
 */
/**
 * @param {number[][]} envelopes
 * @return {number}
 */
var maxEnvelopes = function(envelopes) {
  if (envelopes.length == 0) return 0
  const n = envelopes.length
  envelopes.sort((e1, e2) => {
    if (e1[0] - e2[0]) return e1[0] - e2[0]
    else e2[1] - e1[1]
  })

  const f = [envelopes[0][1]]
  for (let i = 1; i < n; i++) {
    const num = envelopes[i][1]
    if (num > f[f.length - 1]) f.push(num)
    else {
      const index = binarySearch(f, num)
      f[index] = num
    }
  }
  return f.length
};

// 二分查找函数
const binarySearch = (f, target) => {
  let low = 0, high = f.length - 1
  while (low < high) {
    const mid = Math.floor((high - low) / 2) + low
    if (f[mid] < target) {
      low = mid + 1
    } else {
      high = mid
    }
  }
  return low
}