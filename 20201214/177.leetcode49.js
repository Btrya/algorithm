/**
 * 2020/12/14 每日一题 49. 字母异位词分组
 * 给定一个字符串数组，将字母异位词组合在一起。字母异位词指字母相同，但排列不同的字符串。
 * 示例:
 * 
 * 输入: ["eat", "tea", "tan", "ate", "nat", "bat"]
 * 输出:
 * [
 *   ["ate","eat","tea"],
 *   ["nat","tan"],
 *   ["bat"]
 * ]
 */
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
// 计数排序 很慢很慢
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

// 先对每个字符串进行排序
var groupAnagrams = function(strs) {
  const map = new Map()
  for (let str  of strs) {
    let array = Array.from(str)
    array.sort()
    let key = array.toString()
    let list = map.get(key) ? map.get(key) : new Array()
    list.push(str)
    map.set(key, list)
  }
  return Array.from(map.values())
};