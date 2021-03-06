/**
 * 2020/7/26 leetcode 199 周赛
 */

 /**
 * @param {string} s
 * @param {number[]} indices
 * @return {string}
 */
var restoreString = function(s, indices) {
  if (!s || !indices) return ''
  let res = []
  for (let i = 0; i < indices.length; i++) {
    res[indices[i]] = s.substr(i, 1)
  }
  return res.join('')
};

// console.log(restoreString('codeleet', [4,5,6,7,0,2,1,3]))

/**
 * @param {string} target
 * @return {number}
 */
var minFlips = function(target) {
  if(!target || parseInt(target) < 1) return 0
  let t = target.split('0').filter((v) => v.length > 0)
  return target.substr(target.length - 1, 1) == 1 ? t.length * 2 - 1 : t.length * 2
};

// console.log(minFlips("11000"))


/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} distance
 * @return {number}
 */
var countPairs = function(root, distance) {
  const dfs = (node) => {
    if (!node) return new Array(11).fill(0) // distance [0, 10]
    if (node.left == node.right) {
      let ret = new Array(11).fill(0)
      ret[1] = 1
      return ret
    }
    let left = dfs(node.left)
    let right = dfs(node.right)
    // 计数
    for (let i = 0; i < 11; i++) {
      for (j = distance - i; j >= 0; j--) {
        res += left[i] * right[j]
      }
    }
    // 每向上一层距离加1，超过distance的节点抛弃
    for (let i = 9; i >= 0; i--) {
      left[i + 1] = right[i] + left[i]
    }
    return left
  }
  let res = 0
  dfs(root)
  return res
};



/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var getLengthOfOptimalCompression = function(s, k) {
  const _generate = function() {
    let count = 1, str = s.charAt(0), res = []
    for (let i = 1; i <= s.length; i++) {
      if (str == s.charAt(i)) {
        count ++
      } else {
        res.push(str + (count > 1 ? count : ''))
        str = s.charAt(i)
        count = 1
      }
    }
    return res
  }
  const _useK = function(strArr) {
    if (strArr.length < 3) return 
    let left = 0, right = left + 2
    while (left < right && right < strArr.length) {
      if (strArr[left].substr(0, 1) == strArr[right].substr(0, 1)) {
        
      }
    }
  }
  let strArr = _useK(_generate())
  console.log(strArr)
};

console.log(getLengthOfOptimalCompression("aaabcccd", 2))