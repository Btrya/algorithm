/**
 * 2021/02/14 每日一题 情人节 765
 * N 对情侣坐在连续排列的 2N 个座位上，想要牵到对方的手。 计算最少交换座位的次数，
 * 以便每对情侣可以并肩坐在一起。 一次交换可选择任意两人，让他们站起来交换座位。
 * 人和座位用 0 到 2N-1 的整数表示，情侣们按顺序编号，第一对是 (0, 1)，第二对是 (2, 3)，以此类推，最后一对是 (2N-2, 2N-1)。
 * 
 * 这些情侣的初始座位  row[i] 是由最初始坐在第 i 个座位上的人决定的。
 * 
 * 示例 1:
 * 
 * 输入: row = [0, 2, 1, 3]
 * 输出: 1
 * 解释: 我们只需要交换row[1]和row[2]的位置即可。
 * 示例 2:
 * 
 * 输入: row = [3, 2, 0, 1]
 * 输出: 0
 * 解释: 无需交换座位，所有的情侣都已经可以手牵手了。
 * 说明:
 * 
 * len(row) 是偶数且数值在 [4, 60]范围内。
 * 可以保证row 是序列 0...len(row)-1 的一个全排列。
 */
/**
 * @param {number[]} row
 * @return {number}
 */
var minSwapsCouples = function (row) {
  const n = row.length;
  const tot = n / 2;

  const graph = new Array(tot).fill(0).map(() => new Array());
  for (let i = 0; i < n; i += 2) {
    const l = Math.floor(row[i] / 2);
    const r = Math.floor(row[i + 1] / 2);
    if (l != r) {
      graph[l].push(r);
      graph[r].push(l);
    }
  }
  const visited = new Array(tot).fill(false);
  let ret = 0;
  for (let i = 0; i < tot; i++) {
    if (!visited[i]) {
      const queue = [];
      visited[i] = true;
      queue.push(i);
      let cnt = 0;

      while (queue.length) {
        const x = queue.shift();
        cnt += 1;

        for (const y of graph[x]) {
          if (!visited[y]) {
            visited[y] = true;
            queue.push(y);
          }
        }
      }
      ret += cnt - 1;
    }
  }
  return ret;
};