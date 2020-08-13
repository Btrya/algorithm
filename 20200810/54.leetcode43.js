/**
 * 2020/08/13 每日一题 leetcode 43.字符串相乘
 * 给定两个以字符串形式表示的非负整数 num1 和 num2，返回 num1 和 num2 的乘积，它们的乘积也表示为字符串形式。
 * 示例 1:
 * 输入: num1 = "2", num2 = "3"
 * 输出: "6"
 * 示例 2:
 * 输入: num1 = "123", num2 = "456"
 * 输出: "56088"
 */
/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function(num1, num2) {
    if (num1 == 0 || num2 == 0) return "0"
    const res = []
    for (let i = 0; i < num1.length; i++) {
        let tmp1 = num1[num1.length - 1 - i] // 从尾部开始获得第一个数的末尾值与num2每一个数相乘
        for (let j = 0; j < num2.length; j++) {
            let tmp2 = num2[num2.length - 1 - j]
            let pos = res[i + j] ? res[i + j] + tmp1 * tmp2 : tmp1 * tmp2
            res[i + j] = pos % 10
            pos >= 10 && (res[i + j + 1] = res[i + j + 1] ? res[i + j + 1] + Math.floor(pos / 10) : Math.floor(pos / 10))
        }
    }
    return res.reverse().join('')
};