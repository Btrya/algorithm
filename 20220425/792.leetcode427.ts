/**
 * 2022/04/29 每日一题 427. 建立四叉树
 * https://leetcode-cn.com/problems/construct-quad-tree/
 */
/**
 * Definition for node.
 * class Node {
 *     val: boolean
 *     isLeaf: boolean
 *     topLeft: Node | null
 *     topRight: Node | null
 *     bottomLeft: Node | null
 *     bottomRight: Node | null
 *     constructor(val?: boolean, isLeaf?: boolean, topLeft?: Node, topRight?: Node, bottomLeft?: Node, bottomRight?: Node) {
 *         this.val = (val===undefined ? false : val)
 *         this.isLeaf = (isLeaf===undefined ? false : isLeaf)
 *         this.topLeft = (topLeft===undefined ? null : topLeft)
 *         this.topRight = (topRight===undefined ? null : topRight)
 *         this.bottomLeft = (bottomLeft===undefined ? null : bottomLeft)
 *         this.bottomRight = (bottomRight===undefined ? null : bottomRight)
 *     }
 * }
 */
class Node {
  val: boolean
  isLeaf: boolean
  topLeft: Node | null
  topRight: Node | null
  bottomLeft: Node | null
  bottomRight: Node | null
  constructor(
    val?: boolean,
    isLeaf?: boolean,
    topLeft?: Node,
    topRight?: Node,
    bottomLeft?: Node,
    bottomRight?: Node
  ) {
    this.val = val === undefined ? false : val
    this.isLeaf = isLeaf === undefined ? false : isLeaf
    this.topLeft = topLeft === undefined ? null : topLeft
    this.topRight = topRight === undefined ? null : topRight
    this.bottomLeft = bottomLeft === undefined ? null : bottomLeft
    this.bottomRight = bottomRight === undefined ? null : bottomRight
  }
}
const construct = function (grid) {
  const n = grid.length
  const pre = new Array(n + 1).fill(0).map(() => new Array(n + 1).fill(0))
  for (let i = 1; i <= n; ++i) {
    for (let j = 1; j <= n; ++j) {
      pre[i][j] =
        pre[i - 1][j] + pre[i][j - 1] - pre[i - 1][j - 1] + grid[i - 1][j - 1]
    }
  }
  return dfs(grid, pre, 0, 0, n, n)
}

const dfs = (grid, pre, r0, c0, r1, c1) => {
  const total = getSum(pre, r0, c0, r1, c1)
  if (total === 0) {
    return new Node(false, true)
  } else if (total === (r1 - r0) * (c1 - c0)) {
    return new Node(true, true)
  }

  const ret = new Node(
    true,
    false,
    dfs(
      grid,
      pre,
      r0,
      c0,
      Math.floor((r0 + r1) / 2),
      Math.floor((c0 + c1) / 2)
    ),
    dfs(
      grid,
      pre,
      r0,
      Math.floor((c0 + c1) / 2),
      Math.floor((r0 + r1) / 2),
      c1
    ),
    dfs(
      grid,
      pre,
      Math.floor((r0 + r1) / 2),
      c0,
      r1,
      Math.floor((c0 + c1) / 2)
    ),
    dfs(grid, pre, Math.floor((r0 + r1) / 2), Math.floor((c0 + c1) / 2), r1, c1)
  )
  return ret
}

const getSum = (pre, r0, c0, r1, c1) => {
  return pre[r1][c1] - pre[r1][c0] - pre[r0][c1] + pre[r0][c0]
}
