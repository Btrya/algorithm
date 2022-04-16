/**
 * 2022/04/16 编程入门学习计划题
 * 1523. 在区间范围内统计奇数数目
 * 给你两个非负整数 low 和 high 。请你返回 low 和 high 之间（包括二者）奇数的数目。
 * 
 * 示例 1：
 * 
 * 输入：low = 3, high = 7
 * 输出：3
 * 解释：3 到 7 之间奇数数字为 [3,5,7] 。
 * 示例 2：
 * 
 * 输入：low = 8, high = 10
 * 输出：1
 * 解释：8 到 10 之间奇数数字为 [9] 。
 *  
 * 
 * 提示：
 * 
 * 0 <= low <= high <= 10^9
 */
 function countOdds(low: number, high: number): number {
  const diff = high - low 
  const firstIsOdd = low % 2 !== 0
  if (diff % 2 === 0 && firstIsOdd) return diff / 2 + 1
  return Math.ceil(diff / 2)
};


/**
 * 1491. 去掉最低工资和最高工资后的工资平均值
 * 给你一个整数数组 salary ，数组里每个数都是 唯一 的，其中 salary[i] 是第 i 个员工的工资。
 * 
 * 请你返回去掉最低工资和最高工资以后，剩下员工工资的平均值。
 * 
 * 示例 1：
 * 
 * 输入：salary = [4000,3000,1000,2000]
 * 输出：2500.00000
 * 解释：最低工资和最高工资分别是 1000 和 4000 。
 * 去掉最低工资和最高工资以后的平均工资是 (2000+3000)/2= 2500
 * 示例 2：
 * 
 * 输入：salary = [1000,2000,3000]
 * 输出：2000.00000
 * 解释：最低工资和最高工资分别是 1000 和 3000 。
 * 去掉最低工资和最高工资以后的平均工资是 (2000)/1= 2000
 * 示例 3：
 * 
 * 输入：salary = [6000,5000,4000,3000,2000,1000]
 * 输出：3500.00000
 * 示例 4：
 * 
 * 输入：salary = [8000,9000,2000,3000,6000,1000]
 * 输出：4750.00000
 *  
 * 
 * 提示：
 * 
 * 3 <= salary.length <= 100
 * 10^3 <= salary[i] <= 10^6
 * salary[i] 是唯一的。
 * 与真实值误差在 10^-5 以内的结果都将视为正确答案。
 */
 function average(salary: number[]): number {
  const n = salary.length - 2
  return Number((salary.sort((a, b) => a - b).slice(1, -1).reduce((total, item) => total += item, 0) / n).toFixed(5))
};