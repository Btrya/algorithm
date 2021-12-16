/**
 * 2021/12/16 每日一题 1610. 可见点的最大数目
 * https://leetcode-cn.com/problems/maximum-number-of-visible-points/
 */
/**
 * @param {number[][]} points
 * @param {number} angle
 * @param {number[]} location
 * @return {number}
 */
var visiblePoints = function (points, angle, location) {
  let sameCnt = 0;
  const polarDegrees = [];
  let locationX = location[0];
  let locationY = location[1];
  for (let i = 0; i < points.length; ++i) {
    const x = points[i][0];
    const y = points[i][1];
    if (x === locationX && y === locationY) {
      sameCnt++;
      continue;
    }
    const degree = Math.atan2(y - locationY, x - locationX);
    polarDegrees.push(degree);
  }
  polarDegrees.sort((a, b) => a - b);

  const m = polarDegrees.length;
  for (let i = 0; i < m; ++i) {
    polarDegrees.push(polarDegrees[i] + 2 * Math.PI);
  }

  let maxCnt = 0;
  let right = 0;
  const toDegree = angle * Math.PI / 180;
  for (let i = 0; i < m; ++i) {
    const curr = polarDegrees[i] + toDegree;
    while (right < polarDegrees.length && polarDegrees[right] <= curr) {
      right++;
    }
    maxCnt = Math.max(maxCnt, right - i);
  }
  return maxCnt + sameCnt;
};