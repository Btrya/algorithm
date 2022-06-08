/**
 * 2022/06/09 每日一题 497. 非重叠矩形中的随机点
 * https://leetcode.cn/problems/random-point-in-non-overlapping-rectangles/
 */
 class Solution {
  private range: number[]
  private sum: number
  private rects: number[][]
  constructor(rects: number[][]) {
    this.rects = rects
    const len = rects.length
    // 拿到每一个矩形的面积
    this.range = rects.map(item => {
      return (item[2] - item[0] + 1) * (item[3] - item[1] + 1)
    })
    for (let i = 1; i < len; ++i) {
      this.range[i] = this.range[i - 1] + this.range[i]
    }
    this.sum = this.range[len - 1]
  }

  pick(): number[] {
    const num = Math.random() * this.sum
    const index = this.range.findIndex(item => item >= num)
    const item = this.rects[index]
    const w = item[2] - item[0]
    const h = item[3] - item[1]
    const wR = ~~(Math.random() * (w + 1))
    const hR = ~~(Math.random() * (h + 1))
    return [item[0] + wR, item[1] + hR]
  }
}

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(rects)
 * var param_1 = obj.pick()
 */