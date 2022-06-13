/**
 * 2022/06/10 每日一题 1118. 一月有多少天
 * 指定年份 year 和月份 month，返回 该月天数 。
 * 
 *  
 * 
 * 示例 1：
 * 
 * 输入：year = 1992, month = 7
 * 输出：31
 * 示例 2：
 * 
 * 输入：year = 2000, month = 2
 * 输出：29
 * 示例 3：
 * 
 * 输入：year = 1900, month = 2
 * 输出：28
 *  
 * 
 * 提示：
 * 
 * 1583 <= year <= 2100
 * 1 <= month <= 12
 */
function numberOfDays(year: number, month: number): number {
  // 普通闰年：公历年份是4的倍数，且不是100的倍数的，为闰年（如2004年、2020年等就是闰年）。
  // 世纪闰年：公历年份是整百数的，必须是400的倍数才是闰年（如1900年不是闰年，2000年是闰年）
  const isRun = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
  const monthMap = {
    '1': 31,
    '2': isRun ? 29 : 28,
    '3': 31,
    '4': 30,
    '5': 31,
    '6': 30,
    '7': 31,
    '8': 31,
    '9': 30,
    '10': 31,
    '11': 30,
    '12': 31
  }
  return monthMap[month]
};