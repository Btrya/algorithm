/**
 * 2020/10/02 每日一题 771.宝石与石头
 * 给定字符串J 代表石头中宝石的类型，和字符串 S代表你拥有的石头。 S 中每个字符代表了一种你拥有的石头的类型，你想知道你拥有的石头中有多少是宝石。
 * J 中的字母不重复，J 和 S中的所有字符都是字母。字母区分大小写，因此"a"和"A"是不同类型的石头。
 * 示例 1:
 * 输入: J = "aA", S = "aAAbbbb"
 * 输出: 3
 * 示例 2:
 * 输入: J = "z", S = "ZZ"
 * 输出: 0
 */
/**
 * @param {string} J
 * @param {string} S
 * @return {number}
 */
// 暴力法
var numJewelsInStones = function(J, S) {
    let res = 0
    for (let i = 0; i < J.length; i++) {
        for (let j = 0; j < S.length; j++) {
            if (J[i] === S[j]) res++
        }
    }
    return res
};
// 使用Set
var numJewelsInStones = function(J, S) {
  let set = new Set()
  let res = 0
  for (let i of J) {
      set.add(i)
  }
  for (let i of S) {
      if (set.has(i)) res++
  }
  return res
}