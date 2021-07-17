/**
 * 2021/07/18 每日一题 面试题 10.02. 变位词组
 * 编写一种方法，对字符串数组进行排序，将所有变位词组合在一起。变位词是指字母相同，但排列不同的字符串。
 * 
 * 注意：本题相对原题稍作修改
 * 
 * 示例:
 * 
 * 输入: ["eat", "tea", "tan", "ate", "nat", "bat"],
 * 输出:
 * [
 *   ["ate","eat","tea"],
 *   ["nat","tan"],
 *   ["bat"]
 * ]
 * 说明：
 * 
 * 所有输入均为小写字母。
 * 不考虑答案输出的顺序。
 */
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
  const map = new Map()
  for (let str of strs) {
    let array = Array.from(str)
    array.sort()
    let key = array.toString()
    let list = map.get(key) ? map.get(key) : new Arrry()
    list.push(str)
    map.set(key, list)
  }
  return Array.from(map.values())
};

var groupAnagrams = function(strs) {
  const map = new Object()
  for (let s of strs) {
    const count = new Array(26).fill(0)
    for (let c of s) {
      count[c.charCodeAt() - 'a'.charCodeAt()]++
    }
    map[count] ? map[count].push(s) : map[count] = [s]
  }
  return Object.values(map)
};