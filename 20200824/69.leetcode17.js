/**
 * leetcode 2020/08/26 每日一题 17.电话号码的字母组合
 * 给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。
 *给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。
 *示例:
 *输入："23"
 *输出：["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].
 */
/**
 * @param {string} digits
 * @return {string[]}
 */
// 回溯  时间复杂度最差情况O(4^n)  空间复杂度O(n)
var letterCombinations = function (digits) {
  if (digits.length == 0) return [];
  const res = [];
  const map = {
    2: "abc",
    3: "def",
    4: "ghi",
    5: "jkl",
    6: "mno",
    7: "pqrs",
    8: "tuv",
    9: "wxyz",
  };
  const generate = (curStr, i) => {
    // curStr是当前字符串，i是扫描的指针
    if (i > digits.length - 1) {
      // 指针越界， 递归的出口
      res.push(curStr); // 将解推入res
      return; // 结束当前递归分支，进入另一个递归分支
    }
    const letters = map[digits[i]]; // 当前数字对应哪些字母
    for (const l of letters) {
      generate(curStr + l, i + 1);
    }
  };
  generate("", 0);
  return res;
};

// BFS
var letterCombinations = function (digits) {
  if (digits.length == 0) return [];
  const map = {
    2: "abc",
    3: "def",
    4: "ghi",
    5: "jkl",
    6: "mno",
    7: "pqrs",
    8: "tuv",
    9: "wxyz",
  };
  const queue = [];
  queue.push("");
  for (let i = 0; i < digits.length; i++) {
    // bfs的层数，即digits得长度
    const levelSize = queue.length; // 当前层得节点个数
    for (let j = 0; j < levelSize; j++) {
      // 逐个让当前层得节点出列
      const curStr = queue.shift();
      const letters = map[digits[i]];
      for (const l of letters) {
        queue.push(curStr + l); // 生成新的字母串入列
      }
    }
  }
  return queue; // 队列中全是最后一层生成的字母串
};
