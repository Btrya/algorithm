/**
 * 2022/07/29 每日一题 593. 有效的正方形
 * 给定2D空间中四个点的坐标 p1, p2, p3 和 p4，如果这四个点构成一个正方形，则返回 true 。
 *
 * 点的坐标 pi 表示为 [xi, yi] 。输入 不是 按任何顺序给出的。
 *
 * 一个 有效的正方形 有四条等边和四个等角(90度角)。
 * 示例 1:
 *
 * 输入: p1 = [0,0], p2 = [1,1], p3 = [1,0], p4 = [0,1]
 * 输出: True
 * 示例 2:
 *
 * 输入：p1 = [0,0], p2 = [1,1], p3 = [1,0], p4 = [0,12]
 * 输出：false
 * 示例 3:
 *
 * 输入：p1 = [1,0], p2 = [-1,0], p3 = [0,1], p4 = [0,-1]
 * 输出：true
 *
 *
 * 提示:
 *
 * p1.length == p2.length == p3.length == p4.length == 2
 * -104 <= xi, yi <= 104
 */
function validSquare(
  p1: number[],
  p2: number[],
  p3: number[],
  p4: number[]
): boolean {
  const res = new Set(),
    arr = arguments
  for (let i = 0; i < 3; i++) {
    for (let j = i + 1; j < 4; j++) {
      res.add(
        Math.sqrt((arr[i][0] - arr[j][0]) ** 2 + (arr[i][1] - arr[j][1]) ** 2)
      )
      if (res.size > 2) return false
    }
  }
  if (res.size !== 2) return false

  const temp = [...res]
  return temp[0] > 0 && temp[1] > 0
}
