/**
 * 2020/12/27 每日一题 205.同构字符串
 * 给定两个字符串 s 和 t，判断它们是否是同构的。
 * 如果 s 中的字符可以被替换得到 t ，那么这两个字符串是同构的。
 * 所有出现的字符都必须用另一个字符替换，同时保留字符的顺序。两个字符不能映射到同一个字符上，但字符可以映射自己本身。
 * 示例 1:
 * 
 * 输入: s = "egg", t = "add"
 * 输出: true
 * 示例 2:
 * 
 * 输入: s = "foo", t = "bar"
 * 输出: false
 * 示例 3:
 * 
 * 输入: s = "paper", t = "title"
 * 输出: true
 */
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
// 哈希表
var isIsomorphic = function (s, t) {
    let mapS = {}
    let mapT = {}
    let index = 0
    while (index < s.length) {
        const x = s[index], y = t[index]
        if ((mapS[x] && mapS[x] !== y) || (mapT[y] && mapT[y] !== x)) return false
        mapS[x] = y
        mapT[y] = x
        index++
    }
    return true
};

var isIsomorphic = function (s, t) {
    for (let i = 0; i < s.length; i++) {
        if (s.indexOf(s[i]) !== t.indexOf(t[i])) {
            return false;
        }
    }
    return true;
};