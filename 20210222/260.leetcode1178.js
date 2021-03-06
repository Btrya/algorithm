/**
 * 2021/02/26 每日一题 1178.猜字谜
 * 外国友人仿照中国字谜设计了一个英文版猜字谜小游戏，请你来猜猜看吧。
 * 
 * 字谜的迷面 puzzle 按字符串形式给出，如果一个单词 word 符合下面两个条件，那么它就可以算作谜底：
 * 
 * 单词 word 中包含谜面 puzzle 的第一个字母。
 * 单词 word 中的每一个字母都可以在谜面 puzzle 中找到。
 * 例如，如果字谜的谜面是 "abcdefg"，那么可以作为谜底的单词有 "faced", "cabbage", 和 "baggage"；
 * 而 "beefed"（不含字母 "a"）以及 "based"（其中的 "s" 没有出现在谜面中）。
 * 返回一个答案数组 answer，数组中的每个元素 answer[i] 是在给出的单词列表 words 中可以作为字谜迷面 puzzles[i] 所对应的谜底的单词数目。
 * 
 * 示例：
 * 
 * 输入：
 * words = ["aaaa","asas","able","ability","actt","actor","access"], 
 * puzzles = ["aboveyz","abrodyz","abslute","absoryz","actresz","gaswxyz"]
 * 输出：[1,1,3,2,4,0]
 * 解释：
 * 1 个单词可以作为 "aboveyz" 的谜底 : "aaaa" 
 * 1 个单词可以作为 "abrodyz" 的谜底 : "aaaa"
 * 3 个单词可以作为 "abslute" 的谜底 : "aaaa", "asas", "able"
 * 2 个单词可以作为 "absoryz" 的谜底 : "aaaa", "asas"
 * 4 个单词可以作为 "actresz" 的谜底 : "aaaa", "asas", "actt", "access"
 * 没有单词可以作为 "gaswxyz" 的谜底，因为列表中的单词都不含字母 'g'。
 *  
 * 提示：
 * 1 <= words.length <= 10^5
 * 4 <= words[i].length <= 50
 * 1 <= puzzles.length <= 10^4
 * puzzles[i].length == 7
 * words[i][j], puzzles[i][j] 都是小写英文字母。
 * 每个 puzzles[i] 所包含的字符都不重复。
 */
/**
 * @param {string[]} words
 * @param {string[]} puzzles
 * @return {number[]}
 */
var findNumOfValidWords = function (words, puzzles) {
  const map = {}; // 存放所有单词对应的二进制数
  for (const word of words) { // 遍历单词表
    const bit = getBit(word); // 单词对应的二进制数
    if (map[bit] === undefined) { // 存入map，统计出现次数
        map[bit] = 1;
    } else {
        map[bit]++;
    }
  }
  const res = new Array(puzzles.length).fill(0); // 待返回的数组，所有puzzle的谜底数量
  for (let i = 0; i < puzzles.length; i++) { // 遍历谜语
    const puzzleBit = getBit(puzzles[i]); // 当前谜语的二进制数
    const first = getBit(puzzles[i][0]); // 谜语的第一个字符对应的二进制数，比如c就是100
    let n = puzzleBit; // n初始为puzzleBit这个组合
    while (n > 0) { // 遍历puzzle的所有字母组合，当n=0时终止遍历
      // 按位都是1才为1，否则为0，即n这个组合包含puzzle的首字母
      // 而且n这个组合在map中有值，即有单词长n这样，值累加给res[i]
      if ((n & first) != 0 && map[n] > 0) {
          res[i] += map[n];
      }
      // n-1 AND puzzleBit，生成一个puzzleBit的新的子集合
      n = (n - 1) & puzzleBit;
    }
  }
  return res;
};
// word转成用二进制数表示的字符集合
function getBit(word) {
  let res = 0;
  for (const c of word) {
    const offset = c.charCodeAt(0) - 97; // a在最低位，求出当前字符的偏移位
    const status = 1 << offset; // 将二进制的1左移offset位，右边用0填充
    res = res | status; // 按位或，该位至少有一个1时，才为1（出现过），否则为0
  }
  return res;
}


/** 拓展题目 
 * 传入一段str 和一个字符x，返回str是否有且只有一个仅由x字符组成的子字符串
 * 示例1：
 * 
 * 输入：xqh12??asdvm, ?
 * 输出：true
 * 
 * 示例2：
 * 
 * 输入：xqhasd??asd?vm, ?
 * 输出：false
 * 
 * 示例3：
 * 
 * 输入：xqhasdasdvm, ?
 * 输出：false
*/
/**
 * @param {string} str
 * @param {string} x
 * @return {boolean}
 */
function xqhRegTest(str, x) {
  let n = str.length, xIndex = -1
  for (let i = 0; i < n; i++) {
    if (str[i] === x) {
      if (xIndex === -1 || xIndex === i - 1) xIndex = i
      else return false
    }
  }
  return xIndex != -1
}

console.log(xqhRegTest('xqh12??asdvm', '?'))
console.log(xqhRegTest('xqhasd??asd?vm', '?'))
console.log(xqhRegTest('xqhasdasdvm', '?'))