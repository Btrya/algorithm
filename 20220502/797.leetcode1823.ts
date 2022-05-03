/**
 * 2022/05/04 每日一题 1823. 找出游戏的获胜者
 * https://leetcode-cn.com/problems/find-the-winner-of-the-circular-game/
 */
 function findTheWinner(n: number, k: number): number {
  let winner = 0
  // 要有 n - 1 次的人淘汰
  for (let i = 2; i <= n; i++) {
    // F(i) = (F(i - 1) + k) % i
    winner = (winner + k) % i
  }
  return winner + 1
};