/**
 * 每日一题 2020/08/29 214.最短回文串
 * 给定一个字符串 s，你可以通过在字符串前面添加字符将其转换为回文串。找到并返回可以用这种方式转换的最短回文串。
 * 示例 1:
 * 
 * 输入: "aacecaaa"
 * 输出: "aaacecaaa"
 * 示例 2:
 * 
 * 输入: "abcd"
 * 输出: "dcbabcd"
 */
/**
 * @param {string} s
 * @return {string}
 */
// 暴力法
var shortestPalindrome = function(s) {
    const len = s.length
    const rev = s.split('').reverse().join('')
    for (let i = len; i >= 0; i--) {
        if (s.substring(0, i) == rev.substring(len - i)) {
            return rev.substring(0, len - i) + s
        }
    }
};

// KMP
var shortestPalindrome = function(s) {
    const rev = s.split("").reverse().join("")
    const str = s + '#' + rev
    const next = new Array(str.length).fill(0)

    const kmp = (next, str) => {
        next[0] = 0
        let len = 0
        let i = 1
        while(i < str.length) {
            if (str[i] == str[len]) {
                len++
                next[i] = len
                i++
            } else {
                if (len == 0) {
                    next[i] = 0
                    i++
                } else {
                    len = next[len - 1]
                }
            }
        }
    }
    kmp(next, str)
    const maxLen = next[str.length - 1]
    const add = s.substring(maxLen).split('').reverse().join('')
    return add + s
};