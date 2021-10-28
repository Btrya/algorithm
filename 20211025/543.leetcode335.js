/**
 * 2021/10/29 每日一题 335. 路径交叉
 * https://leetcode-cn.com/problems/self-crossing/
 */
/**
 * @param {number[]} distance
 * @return {boolean}
 */
var isSelfCrossing = function (distance) {
  const n = distance.length;

  // 处理第 1 种情况
  let i = 0;
  while (i < n && (i < 2 || distance[i] > distance[i - 2])) {
    ++i;
  }

  if (i === n) {
    return false;
  }

  // 处理第 j 次移动的情况
  if ((i === 3 && distance[i] == distance[i - 2]) ||
    (i >= 4 && distance[i] >= distance[i - 2] - distance[i - 4])) {
    distance[i - 1] -= distance[i - 3];
  }
  ++i;

  // 处理第 2 种情况
  while (i < n && distance[i] < distance[i - 2]) {
    ++i;
  }

  return i !== n;
};