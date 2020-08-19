/**
 * 2020/08/19 每日一题 647.回文子串
 * 给定一个字符串，你的任务是计算这个字符串中有多少个回文子串。
 * 具有不同开始位置或结束位置的子串，即使是由相同的字符组成，也会被视作不同的子串。
 * 示例 1：
 * 输入："abc"
 * 输出：3
 * 解释：三个回文子串: "a", "b", "c"
 * 示例 2：
 * 输入："aaa"
 * 输出：6
 * 解释：6个回文子串: "a", "a", "a", "aa", "aa", "aaa"
 */
/**
 * @param {string} s
 * @return {number}
 */
// 中心拓展 时间复杂度O(n^2) 空间复杂度O(1)
var countSubstrings = function(s) {
    const n = s.length
    let ans = 0
    for (let i = 0; i < 2 * n - 1; i++) {
        let l = i / 2, r = i / 2 + i % 2
        while(l >= 0 && r < n && s.charAt(l) == s.charAt(r)) {
            --l
            ++r
            ++ans
        }
    }
    return ans
};

// Manacher算法 时间复杂度O(n)  空间复杂度O(n)
var countSubstrings = function(s) {
    let n = s.length
    let t = ['$', '#']
    for (let i = 0; i < n; i++) {
        t.push(s.charAt(i))
        t.push('#')
    }
    n = t.length
    t.push('!')
    t = t.join('')

    const f = new Array(n)
    let iMax = 0, rMax = 0, ans = 0
    for (let i = 1; i < n; i++) {
        // 初始化f[i]
        f[i] = i <= iMax ? Math.min(rMax - i + 1, f[2 * iMax - i]) : 1
        // 中心拓展
        while (t.charAt(i + f[i]) == t.charAt(i - f[i])) {
            ++f[i]
        }
        // 动态维护 iMax 和 rMax
        if (i + f[i] - 1 > rMax) {
            iMax = i
            rMax = i + f[i] - 1
        }
        // 统计答案
        ans += Math.floor(f[i] / 2)
    }
    return ans
};
