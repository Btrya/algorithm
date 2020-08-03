/**
 * leetcode 每日一题 2020/08/03 415.字符串相加
 * 给定两个字符串形式的非负整数 num1 和num2 ，计算它们的和。
 * 注意：
 * 
 * num1 和num2 的长度都小于 5100.
 * num1 和num2 都只包含数字 0-9.
 * num1 和num2 都不包含任何前导零。
 * 你不能使用任何內建 BigInteger 库， 也不能直接将输入的字符串转换为整数形式。
 */
/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
// 时间复杂度O(max(len1, len2))  空间复杂度O(1)
var addStrings = function(num1, num2) {
    let i = num1.length - 1, j = num2.length - 1, add = 0
    let ans = []
    while (i >= 0 || j >= 0 || add != 0) {
        const x = i >= 0 ? num1[i] - '0' : 0
        const y = j >= 0 ? num2[j] - '0' : 0
        const result = x + y + add
        ans.push(result % 10)
        add = Math.floor(result / 10)
        i--
        j--
    }
    return ans.reverse().join('')
};