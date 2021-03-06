/**
 * leetcode 周赛203
 */
/**
 * 5495. 圆形赛道上经过次数最多的扇区
 * 给你一个整数 n 和一个整数数组 rounds 。有一条圆形赛道由 n 个扇区组成，扇区编号从 1 到 n 。
 * 现将在这条赛道上举办一场马拉松比赛，该马拉松全程由 m 个阶段组成。其中，第 i 个阶段将会从扇区 rounds[i - 1] 开始，
 * 到扇区 rounds[i] 结束。举例来说，第 1 阶段从 rounds[0] 开始，到 rounds[1] 结束。
 * 请你以数组形式返回经过次数最多的扇区，按扇区编号 升序 排列。
 * 注意，赛道按扇区编号升序逆时针形成一个圆（请参见第一个示例）。
 * 示例 1：
 * 输入：n = 4, rounds = [1,3,1,2]
 * 输出：[1,2]
 * 解释：本场马拉松比赛从扇区 1 开始。经过各个扇区的次序如下所示：
 * 1 --> 2 --> 3（阶段 1 结束）--> 4 --> 1（阶段 2 结束）--> 2（阶段 3 结束，即本场马拉松结束）
 * 其中，扇区 1 和 2 都经过了两次，它们是经过次数最多的两个扇区。扇区 3 和 4 都只经过了一次。
 * 示例 2：
 * 输入：n = 2, rounds = [2,1,2,1,2,1,2,1,2]
 * 输出：[2]
 * 示例 3：
 * 输入：n = 7, rounds = [1,3,5,7]
 * 输出：[1,2,3,4,5,6,7]
 */
/**
 * @param {number} n
 * @param {number[]} rounds
 * @return {number[]}
 */
var mostVisited = function(n, rounds) {
  let steps = 0
  for (let i = 0; i < rounds.length - 1; i++) {
      const step = rounds[i] > rounds[i + 1] ? n - (rounds[i] - rounds[i + 1]) : Math.abs(rounds[i] - rounds[i + 1])
      steps += step
  }
  let ans = [rounds[0]]
  for (let i = 1; i <= steps % n; i++) {
      if (rounds[0] + i > n) {
          ans.push(rounds[0] + i - n)
      }
      else ans.push(rounds[0] + i)
  }
  return ans.sort((a, b) => a - b)
};
/**
 * 5496. 你可以获得的最大硬币数目 显示英文描述 
 * 有 3n 堆数目不一的硬币，你和你的朋友们打算按以下方式分硬币：
 * 每一轮中，你将会选出 任意 3 堆硬币（不一定连续）。
 * Alice 将会取走硬币数量最多的那一堆。
 * 你将会取走硬币数量第二多的那一堆。
 * Bob 将会取走最后一堆。
 * 重复这个过程，直到没有更多硬币。
 * 给你一个整数数组 piles ，其中 piles[i] 是第 i 堆中硬币的数目。
 * 返回你可以获得的最大硬币数目。
 * 示例 1：
 * 输入：piles = [2,4,1,2,7,8]
 * 输出：9
 * 解释：选出 (2, 7, 8) ，Alice 取走 8 枚硬币的那堆，你取走 7 枚硬币的那堆，Bob 取走最后一堆。
 * 选出 (1, 2, 4) , Alice 取走 4 枚硬币的那堆，你取走 2 枚硬币的那堆，Bob 取走最后一堆。
 * 你可以获得的最大硬币数目：7 + 2 = 9.
 * 考虑另外一种情况，如果选出的是 (1, 2, 8) 和 (2, 4, 7) ，你就只能得到 2 + 4 = 6 枚硬币，这不是最优解。
 * 示例 2：
 * 输入：piles = [2,4,5]
 * 输出：4
 * 示例 3：
 * 输入：piles = [9,8,7,6,5,1,2,3,4]
 * 输出：18
 */
/**
 * @param {number[]} piles
 * @return {number}
 */
var maxCoins = function(piles) {
  let ans = 0
  piles = piles.sort((a, b) => b - a)
  while(piles.length) {
      ans += piles[1]
      piles.splice(0, 2)
      piles.splice(-1)
  }
  return ans
};
/**
 * 5497. 查找大小为 M 的最新分组 显示英文描述 
 * 给你一个数组 arr ，该数组表示一个从 1 到 n 的数字排列。有一个长度为 n 的二进制字符串，该字符串上的所有位最初都设置为 0 。
 * 在从 1 到 n 的每个步骤 i 中（假设二进制字符串和 arr 都是从 1 开始索引的情况下），二进制字符串上位于位置 arr[i] 的位将会设为 1 。
 * 给你一个整数 m ，请你找出二进制字符串上存在长度为 m 的一组 1 的最后步骤。一组 1 是一个连续的、由 1 组成的子串，
 * 且左右两边不再有可以延伸的 1 。
 * 返回存在长度 恰好 为 m 的 一组 1  的最后步骤。如果不存在这样的步骤，请返回 -1 。
 * 示例 1：
 * 输入：arr = [3,5,1,2,4], m = 1
 * 输出：4
 * 解释：
 * 步骤 1："00100"，由 1 构成的组：["1"]
 * 步骤 2："00101"，由 1 构成的组：["1", "1"]
 * 步骤 3："10101"，由 1 构成的组：["1", "1", "1"]
 * 步骤 4："11101"，由 1 构成的组：["111", "1"]
 * 步骤 5："11111"，由 1 构成的组：["11111"]
 * 存在长度为 1 的一组 1 的最后步骤是步骤 4 。
 * 示例 2：
 * 输入：arr = [3,1,5,4,2], m = 2
 * 输出：-1
 * 解释：
 * 步骤 1："00100"，由 1 构成的组：["1"]
 * 步骤 2："10100"，由 1 构成的组：["1", "1"]
 * 步骤 3："10101"，由 1 构成的组：["1", "1", "1"]
 * 步骤 4："10111"，由 1 构成的组：["1", "111"]
 * 步骤 5："11111"，由 1 构成的组：["11111"]
 * 不管是哪一步骤都无法形成长度为 2 的一组 1 。
 * 示例 3：
 * 输入：arr = [1], m = 1
 * 输出：1
 * 示例 4：
 * 输入：arr = [2,1], m = 2
 * 输出：2
 */
/**
 * @param {number[]} arr
 * @param {number} m
 * @return {number}
 */
// 极端用例过不去
var findLatestStep = function(arr, m) {
  let ans = [], str = ''.padStart(arr.length, '0'), target = ''.padStart(m, '1')
  for (let i = 0; i < arr.length; i++) {
      str = str.substring(0, arr[i]) + '1' + str.substring(arr[i] + 1);
      let tmp = str.split("0").filter(item => item != '')
      ans.push(tmp)
  }
  for (let i = ans.length - 1; i >= 0; i--) {
      if (ans[i].includes(target)) return i + 1
  }
  return -1
};
/**
 * 5498. 石子游戏 V 显示英文描述 
 * 几块石子 排成一行 ，每块石子都有一个关联值，关联值为整数，由数组 stoneValue 给出。
 * 游戏中的每一轮：Alice 会将这行石子分成两个 非空行（即，左侧行和右侧行）；Bob 负责计算每一行的值，
 * 即此行中所有石子的值的总和。Bob 会丢弃值最大的行，Alice 的得分为剩下那行的值（每轮累加）。
 * 如果两行的值相等，Bob 让 Alice 决定丢弃哪一行。下一轮从剩下的那一行开始。
 * 只 剩下一块石子 时，游戏结束。Alice 的分数最初为 0 。
 * 返回 Alice 能够获得的最大分数 。
 * 示例 1：
 * 输入：stoneValue = [6,2,3,4,5,5]
 * 输出：18
 * 解释：在第一轮中，Alice 将行划分为 [6，2，3]，[4，5，5] 。左行的值是 11 ，右行的值是 14 。Bob 丢弃了右行，Alice 的分数现在是 11 。
 * 在第二轮中，Alice 将行分成 [6]，[2，3] 。这一次 Bob 扔掉了左行，Alice 的分数变成了 16（11 + 5）。
 * 最后一轮 Alice 只能将行分成 [2]，[3] 。Bob 扔掉右行，Alice 的分数现在是 18（16 + 2）。游戏结束，因为这行只剩下一块石头了。
 * 示例 2：
 * 输入：stoneValue = [7,7,7,7,7,7,7]
 * 输出：28
 * 示例 3：
 * 输入：stoneValue = [4]
 * 输出：0
 */
/**
 * @param {number[]} stoneValue
 * @return {number}
 */
var stoneGameV = function(stoneValue) {

};