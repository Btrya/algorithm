/**
 * 2022/09/27 每日一题 面试题 01.02. 判定是否互为字符重排
 * 给定两个字符串 s1 和 s2，请编写一个程序，确定其中一个字符串的字符重新排列后，能否变成另一个字符串。
 * 
 * 示例 1：
 * 
 * 输入: s1 = "abc", s2 = "bca"
 * 输出: true 
 * 示例 2：
 * 
 * 输入: s1 = "abc", s2 = "bad"
 * 输出: false
 * 说明：
 * 
 * 0 <= len(s1) <= 100
 * 0 <= len(s2) <= 100
 */
 function CheckPermutation(s1: string, s2: string): boolean {
    if (s1.length !== s2.length) return false
    const charArr = new Array(26).fill(0)
    const baseChar = 'a'.charCodeAt(0)
    for (let i = 0; i < s1.length; ++i) {
        charArr[s1[i].charCodeAt(0) - baseChar] ++
    }
    for (let i = 0; i < s2.length; ++i) {
        if (charArr[s2[i].charCodeAt(0) - baseChar] > 0) charArr[s2[i].charCodeAt(0) - baseChar] --
        else return false
    }
    return true
};