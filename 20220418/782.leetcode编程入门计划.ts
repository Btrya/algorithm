/**
 * 2022/04/23 编程入门计划
 * 1768. 交替合并字符串
 * 给你两个字符串 word1 和 word2 。请你从 word1 开始，通过交替添加字母来合并字符串。如果一个字符串比另一个字符串长，就将多出来的字母追加到合并后字符串的末尾。
 * 
 * 返回 合并后的字符串 。
 * 
 * 示例 1：
 * 
 * 输入：word1 = "abc", word2 = "pqr"
 * 输出："apbqcr"
 * 解释：字符串合并情况如下所示：
 * word1：  a   b   c
 * word2：    p   q   r
 * 合并后：  a p b q c r
 * 示例 2：
 * 
 * 输入：word1 = "ab", word2 = "pqrs"
 * 输出："apbqrs"
 * 解释：注意，word2 比 word1 长，"rs" 需要追加到合并后字符串的末尾。
 * word1：  a   b 
 * word2：    p   q   r   s
 * 合并后：  a p b q   r   s
 * 示例 3：
 * 
 * 输入：word1 = "abcd", word2 = "pq"
 * 输出："apbqcd"
 * 解释：注意，word1 比 word2 长，"cd" 需要追加到合并后字符串的末尾。
 * word1：  a   b   c   d
 * word2：    p   q 
 * 合并后：  a p b q c   d
 *  
 * 提示：
 * 
 * 1 <= word1.length, word2.length <= 100
 * word1 和 word2 由小写英文字母组成
 */
 function mergeAlternately(word1: string, word2: string): string {
  let index1 = 0, index2 = 0
  let res = ''
  while (index1 < word1.length && index2 < word2.length) {
    res += word1[index1++] + word2[index2++]
  }
  res += index1 === word1.length ? word2.slice(index2) :word1.slice(index1)
  return res
};

/**
 * 1678. 设计 Goal 解析器
 * 请你设计一个可以解释字符串 command 的 Goal 解析器 。command 由 "G"、"()" 和/或 "(al)" 按某种顺序组成。Goal 解析器会将 "G" 解释为字符串 "G"、"()" 解释为字符串 "o" ，"(al)" 解释为字符串 "al" 。然后，按原顺序将经解释得到的字符串连接成一个字符串。
 * 
 * 给你字符串 command ，返回 Goal 解析器 对 command 的解释结果。
 * 
 * 示例 1：
 * 
 * 输入：command = "G()(al)"
 * 输出："Goal"
 * 解释：Goal 解析器解释命令的步骤如下所示：
 * G -> G
 * () -> o
 * (al) -> al
 * 最后连接得到的结果是 "Goal"
 * 示例 2：
 * 
 * 输入：command = "G()()()()(al)"
 * 输出："Gooooal"
 * 示例 3：
 * 
 * 输入：command = "(al)G(al)()()G"
 * 输出："alGalooG"
 *  
 * 
 * 提示：
 * 
 * 1 <= command.length <= 100
 * command 由 "G"、"()" 和/或 "(al)" 按某种顺序组成
 */
function interpret(command: string): string {
  let res = ''
  let index = 0
  while (index < command.length) {
    const tmpStr = command.slice(index)
    if (tmpStr.startsWith('G')) {
      res += 'G'
      index++
    } else if (tmpStr.startsWith('()')) {
      res += 'o'
      index += 2
    } else {
      res += 'al'
      index += 4
    }
  }
  return res
};
// 正则
function interpret1(command: string): string {
  return command.replace(/\(\)/g, 'o').replace(/\(al\)/g, 'al')
};



/**
 * 389. 找不同
 * 给定两个字符串 s 和 t ，它们只包含小写字母。
 * 
 * 字符串 t 由字符串 s 随机重排，然后在随机位置添加一个字母。
 * 
 * 请找出在 t 中被添加的字母。
 * 
 * 示例 1：
 * 
 * 输入：s = "abcd", t = "abcde"
 * 输出："e"
 * 解释：'e' 是那个被添加的字母。
 * 示例 2：
 * 
 * 输入：s = "", t = "y"
 * 输出："y"
 *  
 * 
 * 提示：
 * 
 * 0 <= s.length <= 1000
 * t.length == s.length + 1
 * s 和 t 只包含小写字母
 */
 function findTheDifference(s: string, t: string): string {
  const charMap = {}
  for (let i = 0; i < s.length; ++i) {
    charMap[s[i]] = (charMap[s[i]] || 0) + 1
  }
  for (let i = 0; i < t.length; ++i) {
    if (charMap[t[i]]) charMap[t[i]]--
    else return t[i]
  }
};