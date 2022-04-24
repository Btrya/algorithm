/**
 * 2022/04/24 编程入门计划
 * 709. 转换成小写字母
 * 给你一个字符串 s ，将该字符串中的大写字母转换成相同的小写字母，返回新的字符串。
 * 
 * 示例 1：
 * 
 * 输入：s = "Hello"
 * 输出："hello"
 * 示例 2：
 * 
 * 输入：s = "here"
 * 输出："here"
 * 示例 3：
 * 
 * 输入：s = "LOVELY"
 * 输出："lovely"
 *  
 * 
 * 提示：
 * 
 * 1 <= s.length <= 100
 * s 由 ASCII 字符集中的可打印字符组成
 */
 function toLowerCase(s: string): string {
  return s.toLowerCase()
};

/**
 * 1309. 解码字母到整数映射
 */ 
function freqAlphabets(s: string): string {
  const res = []
  const n = s.length
  let i = n - 1
  while (i >= 0) {
    if (s[i] === '#') {
      res.unshift(getChar(Number(s[i - 2] + s[i - 1])))
      i -= 3
    } else {
      res.unshift(getChar(Number(s[i])))
      i--
    }
  }
  function getChar(num: number) {
    return String.fromCharCode(num + 96)
  }
  return res.join('')
};


/**
 * 953. 验证外星语词典
 * 某种外星语也使用英文小写字母，但可能顺序 order 不同。字母表的顺序（order）是一些小写字母的排列。
 * 
 * 给定一组用外星语书写的单词 words，以及其字母表的顺序 order，只有当给定的单词在这种外星语中按字典序排列时，返回 true；否则，返回 false。
 * 
 * 示例 1：
 * 
 * 输入：words = ["hello","leetcode"], order = "hlabcdefgijkmnopqrstuvwxyz"
 * 输出：true
 * 解释：在该语言的字母表中，'h' 位于 'l' 之前，所以单词序列是按字典序排列的。
 * 示例 2：
 * 
 * 输入：words = ["word","world","row"], order = "worldabcefghijkmnpqstuvxyz"
 * 输出：false
 * 解释：在该语言的字母表中，'d' 位于 'l' 之后，那么 words[0] > words[1]，因此单词序列不是按字典序排列的。
 * 示例 3：
 * 
 * 输入：words = ["apple","app"], order = "abcdefghijklmnopqrstuvwxyz"
 * 输出：false
 * 解释：当前三个字符 "app" 匹配时，第二个字符串相对短一些，然后根据词典编纂规则 "apple" > "app"，因为 'l' > '∅'，其中 '∅' 是空白字符，定义为比任何其他字符都小（更多信息）。
 *  
 * 
 * 提示：
 * 
 * 1 <= words.length <= 100
 * 1 <= words[i].length <= 20
 * order.length == 26
 * 在 words[i] 和 order 中的所有字符都是英文小写字母。
 */
 function isAlienSorted(words: string[], order: string): boolean {
  const map = {}
  for (let i = 0; i < order.length; ++i) {
    map[order[i]] = i
  }
  const tmp = words.slice().sort(sortByNewMap)
  function sortByNewMap(a, b) {
    let left = 0, right = 0
    const n = a.length, m = b.length
    while (left < n && right < m) {
      const aChar = a[left], bChar = b[right]
      if (aChar === bChar) {
        left++
        right++
      } else {
        return map[aChar] - map[bChar]
      }
    }
    return n - m
  }
  return tmp.join(',') === words.join(',')
};