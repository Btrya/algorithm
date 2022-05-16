/**
 * 2022/05/17 每日一题 面试题 01.04. 回文排列
 * 给定一个字符串，编写一个函数判定其是否为某个回文串的排列之一。
 * 
 * 回文串是指正反两个方向都一样的单词或短语。排列是指字母的重新排列。
 * 
 * 回文串不一定是字典当中的单词。
 * 
 * 示例1：
 * 
 * 输入："tactcoa"
 * 输出：true（排列有"tacocat"、"atcocta"，等等）
 */
 function canPermutePalindrome(s: string): boolean {
  const map = new Map()
  let count = 0
  for (let i = 0; i < s.length; ++i) {
    map.set(s[i], (map.get(s[i]) || 0) + 1)
    if (map.get(s[i]) & 1) count++
    else count--
  }
  return count <= 1
};