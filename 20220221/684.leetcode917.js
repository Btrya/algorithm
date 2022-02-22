/**
 * 2022/02/23 每日一题 917. 仅仅反转字母
 * 给你一个字符串 s ，根据下述规则反转字符串：
 * 
 * 所有非英文字母保留在原有位置。
 * 所有英文字母（小写或大写）位置反转。
 * 返回反转后的 s 。
 * 
 *  
 * 
 * 示例 1：
 * 
 * 输入：s = "ab-cd"
 * 输出："dc-ba"
 * 示例 2：
 * 
 * 输入：s = "a-bC-dEf-ghIj"
 * 输出："j-Ih-gfE-dCba"
 * 示例 3：
 * 
 * 输入：s = "Test1ng-Leet=code-Q!"
 * 输出："Qedo1ct-eeLg=ntse-T!"
 *  
 * 
 * 提示
 * 
 * 1 <= s.length <= 100
 * s 仅由 ASCII 值在范围 [33, 122] 的字符组成
 * s 不含 '\"' 或 '\\'
 */
/**
 * @param {string} s
 * @return {string}
 */
 var reverseOnlyLetters = function (s) {
  let left = 0,
    right = s.length - 1
  const arr = [...s]
  while (true) {
    while (left < right && !(/^[a-zA-Z]+$/.test(s[left]))) {
      left++;
    }
    while (right > left && !(/^[a-zA-Z]+$/.test(s[right]))) {
      right--;
    }
    if (left >= right) {
      break;
    }
    swap(arr, left, right);
    left++;
    right--;
  }
  return arr.join('')
};
const swap = (arr, a, b) => {
  const temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}