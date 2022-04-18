/**
 * 2022/04/18 编程入门学习计划 
 * 976. 三角形的最大周长
 * 给定由一些正数（代表长度）组成的数组 nums ，返回 由其中三个长度组成的、面积不为零的三角形的最大周长 。如果不能形成任何面积不为零的三角形，返回 0。
 * 
 * 示例 1：
 * 
 * 输入：nums = [2,1,2]
 * 输出：5
 * 示例 2：
 * 
 * 输入：nums = [1,2,1]
 * 输出：0
 *  
 * 
 * 提示：
 * 
 * 3 <= nums.length <= 104
 * 1 <= nums[i] <= 106
 */
 function largestPerimeter(nums: number[]): number {
  const n = nums.length
  nums.sort((a, b) => b - a)
  for (let i = 2; i < n; ++i) {
    if (nums[i - 2] < nums[i - 1] + nums[i]) return nums[i - 2] + nums[i - 1] + nums[i]
  }
  return 0
};

/**
 * 1779. 找到最近的有相同 X 或 Y 坐标的点
 * 给你两个整数 x 和 y ，表示你在一个笛卡尔坐标系下的 (x, y) 处。同时，在同一个坐标系下给你一个数组 points ，其中 points[i] = [ai, bi] 表示在 (ai, bi) 处有一个点。当一个点与你所在的位置有相同的 x 坐标或者相同的 y 坐标时，我们称这个点是 有效的 。
 * 
 * 请返回距离你当前位置 曼哈顿距离 最近的 有效 点的下标（下标从 0 开始）。如果有多个最近的有效点，请返回下标 最小 的一个。如果没有有效点，请返回 -1 。
 * 
 * 两个点 (x1, y1) 和 (x2, y2) 之间的 曼哈顿距离 为 abs(x1 - x2) + abs(y1 - y2) 。
 * 
 * 示例 1：
 * 
 * 输入：x = 3, y = 4, points = [[1,2],[3,1],[2,4],[2,3],[4,4]]
 * 输出：2
 * 解释：所有点中，[3,1]，[2,4] 和 [4,4] 是有效点。有效点中，[2,4] 和 [4,4] 距离你当前位置的曼哈顿距离最小，都为 1 。[2,4] 的下标最小，所以返回 2 。
 * 示例 2：
 * 
 * 输入：x = 3, y = 4, points = [[3,4]]
 * 输出：0
 * 提示：答案可以与你当前所在位置坐标相同。
 * 示例 3：
 * 
 * 输入：x = 3, y = 4, points = [[2,3]]
 * 输出：-1
 * 解释：没有 有效点。
 */
 function nearestValidPoint(x: number, y: number, points: number[][]): number {
  const n = points.length
  let min = Number.MAX_SAFE_INTEGER, res = -1
  for (let i = 0; i < n; ++i) {
    const [x2, y2] = points[i]
    if (!(x === x2 || y === y2)) continue
    if (min > (Math.abs(x - x2) + Math.abs(y - y2))) {
      min = Math.abs(x - x2) + Math.abs(y - y2)
      res = i
    }
  }
  return res
};