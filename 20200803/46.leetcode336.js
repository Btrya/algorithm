/**
 * 2020/08/06 每日一题 leetcode 336.回文对
 * 336. 回文对
 * 给定一组唯一的单词， 找出所有不同 的索引对(i, j)，使得列表中的两个单词， words[i] + words[j] ，可拼接成回文串。
 *
 * 示例 1:
 *
 * 输入: ["abcd","dcba","lls","s","sssll"]
 * 输出: [[0,1],[1,0],[3,2],[2,4]]
 * 解释: 可拼接成的回文串为 ["dcbaabcd","abcddcba","slls","llssssll"]
 * 示例 2:
 *
 * 输入: ["bat","tab","cat"]
 * 输出: [[0,1],[1,0]]
 * 解释: 可拼接成的回文串为 ["battab","tabbat"]
 */
/**
 * @param {string[]} words
 * @return {number[][]}
 */
// 暴力解， 遇到极端过不了
var palindromePairs = function (words) {
  if (!words) return;
  let ans = [];
  for (let i = 0; i < words.length; i++) {
    for (let j = 0; j < words.length; j++) {
      if (j == i) continue;
      if (
        words[i] + words[j] ==
        (words[i] + words[j]).split("").reverse().join("")
      )
        ans.push([i, j]);
    }
  }
  return ans;
};

// 枚举前缀和后缀 字典树
var palindromePairs = function (words) {
  //创建字典树中的节点对象
  function createNode() {
    var obj = {};
    obj.chi = new Array(26).fill(0);
    obj.flag = -1;
    return obj;
  }
  var tree = new Array();
  tree.push(createNode());
  var n = words.length;
  for (let i = 0; i < n; i++) {
    insert(words[i], i); //将字符串数组中的所有字符串先加入字典树
  }
  var ret = new Array();
  for (let i = 0; i < n; i++) {
    var m = words[i].length;
    for (let j = 0; j <= m; j++) {
      if (isPalindrome(words[i], j, m - 1)) {
        //如果字符串i的j至m-1位为回文串
        var leftId = findWord(words[i], 0, j - 1); //需要在字典树中寻找是否存在字符串i倒序的字符串
        if (leftId != -1 && leftId != i) {
          ret.push([i, leftId]);
        }
      }
      if (j != 0 && isPalindrome(words[i], 0, j - 1)) {
        var rightId = findWord(words[i], j, m - 1);
        if (rightId != -1 && rightId != i) {
          ret.push([rightId, i]);
        }
      }
    }
  }
  return ret;
  //将每一个字符串插入到字典树当中
  function insert(s, id) {
    var len = s.length,
      add = 0;
    for (let i = 0; i < len; i++) {
      var x = s[i].charCodeAt() - "a".charCodeAt();
      if (tree[add].chi[x] == 0) {
        tree.push(createNode());
        tree[add].chi[x] = tree.length - 1;
      }
      //tree[add].ch[x]保存着子节点在tree中的位置；同时，不等于0说明当前字母与节点所代表的字母相等
      add = tree[add].chi[x];
    }
    tree[add].flag = id; //标记下标为add的节点保存了第id个字符串
  }
  //判断字符串是否为回文
  function isPalindrome(s, left, right) {
    var len = right - left + 1;
    for (let i = 0; i < len / 2; i++) {
      if (s[left + i] != s[right - i]) {
        return false;
      }
    }
    return true;
  }
  //在字典树中寻找判断是否存在某字符串的倒序
  function findWord(s, left, right) {
    var add = 0;
    for (let i = right; i >= left; i--) {
      var x = s[i].charCodeAt() - "a".charCodeAt();
      if (tree[add].chi[x] == 0) {
        return -1;
      }
      add = tree[add].chi[x];
    }
    return tree[add].flag; //节点的flag在insert函数中保存了字符串在字符串数组中的下标
  }
};
