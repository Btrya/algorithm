/**
 * 2021/08/19 每日一题 345. 反转字符串中的元音字母
 * 编写一个函数，以字符串作为输入，反转该字符串中的元音字母。
 * 
 * 示例 1：
 * 
 * 输入："hello"
 * 输出："holle"
 * 示例 2：
 * 
 * 输入："leetcode"
 * 输出："leotcede"
 *  
 * 
 * 提示：
 * 
 * 元音字母不包含字母 "y" 
 */
/**
 * @param {string} s
 * @return {string}
 */
 var reverseVowels = function(s) {
  const n = s.length
  const arr = Array.from(s)
  let left = 0, right = n - 1
  while(left < right) {
    while(left < n && !isYuanYin(arr[left])) {
      ++left
    }
    while(right > 0 && !isYuanYin(arr[right])) {
      --right
    }
    if (left < right) {
      swap(arr, left, right)
      ++left
      --right
    }
  }
  return arr.join('')
};

const isYuanYin = (ch) => {
  return 'aoeiuAOEIU'.indexOf(ch) !== -1
}

const swap = (arr, left, right) => {
  [arr[left], arr[right]] = [arr[right], arr[left]] 
}