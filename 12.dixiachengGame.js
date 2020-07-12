/**
 * 来自leetcode 174.地下城游戏
 * 一些恶魔抓住了公主（P）并将她关在了地下城的右下角。地下城是由 M x N 个房间组成的二维网格。我们英勇的骑士（K）最初被安置在左上角的房间里，他必须穿过地下城并通过对抗恶魔来拯救公主。
 * 骑士的初始健康点数为一个正整数。如果他的健康点数在某一时刻降至 0 或以下，他会立即死亡。
 * 有些房间由恶魔守卫，因此骑士在进入这些房间时会失去健康点数（若房间里的值为负整数，则表示骑士将损失健康点数）；其他房间要么是空的（房间里的值为 0），要么包含增加骑士健康点数的魔法球（若房间里的值为正整数，则表示骑士将增加健康点数）。
 * 为了尽快到达公主，骑士决定每次只向右或向下移动一步。
 * 编写一个函数来计算确保骑士能够拯救到公主所需的最低初始健康点数。
 */

 /**
  * 采用dp逆向思维，最后一个房间骑士的血量一定为1，倒推回第一个房间，只关注最低初始健康点数。
  * @param {number[][]} dungeon
  * @return {number}
  */
 var calculateMinimumHP = function(dungeon) {
  let n = dungeon.length   // 行数
      m = dungeon[0].length    // 列数
      temp = []
  for(let i = 0; i < n; i++) {
      temp[i] = new Array().fill(Number.MAX_VALUE)
  }
  for (let i = n - 1; i >= 0; i --) {
      for (let j = m - 1; j >= 0; j--) {
          if (j == m - 1 && i == n - 1) {
              temp[i][j] = Math.max(1, 1 - dungeon[i][j])
          } else if (i == n - 1) {
              temp[i][j] = Math.max(1, temp[i][j + 1] - dungeon[i][j])
          } else if (j == m - 1) {
              temp[i][j] = Math.max(1, temp[i + 1][j] - dungeon[i][j])
          } else {
              temp[i][j] = Math.max(1, Math.min(temp[i][j + 1], temp[i + 1][j]) - dungeon[i][j])
          }
      }
  }
  console.log(temp)
  return temp[0][0]
};

console.log(calculateMinimumHP([[-2,-3,3],[-5,-10,1],[10,30,-5]]))