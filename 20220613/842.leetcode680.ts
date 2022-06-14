/**
 * 2022/06/15 每日一题 680. 验证回文字符串 Ⅱ
 * 给定一个非空字符串 s，最多删除一个字符。判断是否能成为回文字符串。
 * 
 *  
 * 
 * 示例 1:
 * 
 * 输入: s = "aba"
 * 输出: true
 * 示例 2:
 * 
 * 输入: s = "abca"
 * 输出: true
 * 解释: 你可以删除c字符。
 * 示例 3:
 * 
 * 输入: s = "abc"
 * 输出: false
 *  
 * 
 * 提示:
 * 
 * 1 <= s.length <= 105
 * s 由小写英文字母组成
 */
 function validPalindrome(s: string): boolean {
  function isHuiwen(str: string, l: number, r: number): boolean {
    while (l < r) {            
      if (str[l] != str[r]) {  // 指向的字符不一样，不是回文串
        return false
      }
      l++ // 指针相互逼近
      r--
    }
    return true // 始终没有不一样，返回true
  }
  let l = 0, r = s.length - 1 // 头尾指针
    while (l < r) { 
    if (s[l] != s[r]) { // 指向的字符不一样，还不能死刑 
      return isHuiwen(s, l + 1, r) || isHuiwen(s, l, r - 1) //转为判断删掉一个字符后，是否回文
    }
    l++
    r--
  }
  return true
};