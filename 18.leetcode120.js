/**
 * leetcode 120.三角形最小路径和
 * 例如，给定三角形：
 *
 * [
 *      [2],
 *     [3,4],
 *    [6,5,7],
 *   [4,1,8,3]
 * ]
 * 自顶向下的最小路径和为 11（即，2 + 3 + 5 + 1 = 11）。
 * @param {number[][]} triangle
 * @return {number}
 */

// 动态规划解法 时间复杂度O(n^2)  空间复杂度O(n^2)
var minimumTotal = function (triangle) {
  let n = triangle.length;
  let newArr = [];
  for (let i = 1; i <= n; i++) {
    newArr.push(new Array(i).fill(0));
  }
  newArr[0] = triangle[0];
  for (let i = 1; i < n; i++) {
    newArr[i][0] = newArr[i - 1][0] + triangle[i][0];
    for (let j = 1; j < i; j++) {
      newArr[i][j] =
        Math.min(newArr[i - 1][j - 1], newArr[i - 1][j]) + triangle[i][j];
    }
    newArr[i][i] = newArr[i - 1][i - 1] + triangle[i][i];
  }
  let total = newArr[n - 1][0];
  for (let i = 0; i < n; i++) {
    total = Math.min(total, newArr[n - 1][i]);
  }
  return total;
};

// 优化空间复杂度为O(n)
var minimumTotal = function (triangle) {
  let n = triangle.length;
  let newArr = [];
  newArr[0] = triangle[0][0];
  for (let i = 1; i < n; i++) {
    newArr[i] = newArr[i - 1] + triangle[i][i];
    for (let j = i - 1; j > 0; j--) {
      newArr[j] = Math.min(newArr[j - 1], newArr[j]) + triangle[i][j];
    }
    newArr[0] += triangle[i][0];
  }
  let total = newArr[0];
  for (let i = 1; i < n; i++) {
    total = Math.min(total, newArr[i]);
  }
  return total;
};

console.log(minimumTotal([[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]]));
