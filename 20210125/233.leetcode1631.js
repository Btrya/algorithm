/**
 * 2021/01/29 每日一题 1631.最小体力消耗路经
 * https://leetcode-cn.com/problems/path-with-minimum-effort/submissions/
 * 你准备参加一场远足活动。给你一个二维 rows x columns 的地图 heights ，其中 heights[row][col] 表示格子 (row, col) 的高度。一开始你在最左上角的格子 (0, 0) ，且你希望去最右下角的格子 (rows-1, columns-1) （注意下标从 0 开始编号）。
 * 你每次可以往 上，下，左，右 四个方向之一移动，你想要找到耗费 体力 最小的一条路径。
 * 一条路径耗费的 体力值 是路径上相邻格子之间 高度差绝对值 的 最大值 决定的。
 * 请你返回从左上角走到右下角的最小 体力消耗值 。
 */
/**
 * @param {number[][]} heights
 * @return {number}
 */
var minimumEffortPath = function (heights) {
  const dirs = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1]
  ];

  const m = heights.length,
    n = heights[0].length;
  let left = 0,
    right = 999999,
    ans = 0;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const queue = [
      [0, 0]
    ];
    const seen = new Array(m * n).fill(0);
    seen[0] = 1;
    while (queue.length) {
      const [x, y] = queue.shift();
      for (let i = 0; i < 4; i++) {
        const nx = x + dirs[i][0];
        const ny = y + dirs[i][1];
        if (nx >= 0 && nx < m && ny >= 0 && ny < n && !seen[nx * n + ny] && Math.abs(heights[x][y] - heights[nx][ny]) <= mid) {
          queue.push([nx, ny]);
          seen[nx * n + ny] = 1;
        }
      }
    }
    if (seen[m * n - 1]) {
      ans = mid;
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return ans;
};