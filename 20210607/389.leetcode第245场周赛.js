/**
 * 2021/06/13 第245场周赛
 */
/**
 * 5784. 重新分配字符使所有字符串都相等
 * 给你一个字符串数组 words（下标 从 0 开始 计数）。
 * 
 * 在一步操作中，需先选出两个 不同 下标 i 和 j，其中 words[i] 是一个非空字符串，接着将 words[i] 中的 任一 字符移动到 words[j] 中的 任一 位置上。
 * 
 * 如果执行任意步操作可以使 words 中的每个字符串都相等，返回 true ；否则，返回 false 。
 * 示例 1：
 * 
 * 输入：words = ["abc","aabc","bc"]
 * 输出：true
 * 解释：将 words[1] 中的第一个 'a' 移动到 words[2] 的最前面。
 * 使 words[1] = "abc" 且 words[2] = "abc" 。
 * 所有字符串都等于 "abc" ，所以返回 true 。
 * 示例 2：
 * 
 * 输入：words = ["ab","a"]
 * 输出：false
 * 解释：执行操作无法使所有字符串都相等。
 *  
 * 
 * 提示：
 * 
 * 1 <= words.length <= 100
 * 1 <= words[i].length <= 100
 * words[i] 由小写英文字母组成
 */
/**
 * @param {string[]} words
 * @return {boolean}
 */
 var makeEqual = function(words) {
  let n = words.length
  let sum = words.reduce((target, item) => target += item, '')
  let sumBool = sum.length % n == 0
  if (!sumBool) return false
  const map = new Map()
  for (let i = 0; i < sum.length; i++) {
    if (map.has(sum[i])) map.set(sum[i], map.get(sum[i]) + 1)
    else map.set(sum[i], 1)
  }
  for (const [key, value] of map) {
    if (value % n !== 0) return false
  }
  return true
};

/**
 * 5786. 可移除字符的最大数目
 * 给你两个字符串 s 和 p ，其中 p 是 s 的一个 子序列 。同时，给你一个元素 互不相同 且下标 从 0 开始 计数的整数数组 removable ，该数组是 s 中下标的一个子集（s 的下标也 从 0 开始 计数）。
 * 
 * 请你找出一个整数 k（0 <= k <= removable.length），选出 removable 中的 前 k 个下标，然后从 s 中移除这些下标对应的 k 个字符。整数 k 需满足：在执行完上述步骤后， p 仍然是 s 的一个 子序列 。更正式的解释是，对于每个 0 <= i < k ，先标记出位于 s[removable[i]] 的字符，接着移除所有标记过的字符，然后检查 p 是否仍然是 s 的一个子序列。
 * 
 * 返回你可以找出的 最大 k ，满足在移除字符后 p 仍然是 s 的一个子序列。
 * 
 * 字符串的一个 子序列 是一个由原字符串生成的新字符串，生成过程中可能会移除原字符串中的一些字符（也可能不移除）但不改变剩余字符之间的相对顺序。
 * 
 *  
 * 
 * 示例 1：
 * 
 * 输入：s = "abcacb", p = "ab", removable = [3,1,0]
 * 输出：2
 * 解释：在移除下标 3 和 1 对应的字符后，"abcacb" 变成 "accb" 。
 * "ab" 是 "accb" 的一个子序列。
 * 如果移除下标 3、1 和 0 对应的字符后，"abcacb" 变成 "ccb" ，那么 "ab" 就不再是 s 的一个子序列。
 * 因此，最大的 k 是 2 。
 * 示例 2：
 * 
 * 输入：s = "abcbddddd", p = "abcd", removable = [3,2,1,4,5,6]
 * 输出：1
 * 解释：在移除下标 3 对应的字符后，"abcbddddd" 变成 "abcddddd" 。
 * "abcd" 是 "abcddddd" 的一个子序列。
 * 示例 3：
 * 
 * 输入：s = "abcab", p = "abc", removable = [0,1,2,3,4]
 * 输出：0
 * 解释：如果移除数组 removable 的第一个下标，"abc" 就不再是 s 的一个子序列。
 *  
 * 
 * 提示：
 * 
 * 1 <= p.length <= s.length <= 105
 * 0 <= removable.length < s.length
 * 0 <= removable[i] < s.length
 * p 是 s 的一个 子字符串
 * s 和 p 都由小写英文字母组成
 * removable 中的元素 互不相同
 */
/**
 * @param {string} s
 * @param {string} p
 * @param {number[]} removable
 * @return {number}
 */
 var maximumRemovals = function(s, p, r) {
  let left = 0, right = r.length, pp = p.split('')
  while(left < right) {
      const mid = (left + right) >>> 1, arr = s.split('')
      for(let i = 0; i <= mid; i++) arr[r[i]] = '*'
      if (check(pp, arr)) {
          left = mid + 1
      } else {
          right = mid
      }
  }
  return left
};

var check = function(s, t) {
  let i = 0, j = 0;
  while (j < t.length) if(s[i] === t[j++]) i++
  return i === s.length
};

/**
 * 5785. 合并若干三元组以形成目标三元组
 * 三元组 是一个由三个整数组成的数组。给你一个二维整数数组 triplets ，其中 triplets[i] = [ai, bi, ci] 表示第 i 个 三元组 。同时，给你一个整数数组 target = [x, y, z] ，表示你想要得到的 三元组 。
 * 
 * 为了得到 target ，你需要对 triplets 执行下面的操作 任意次（可能 零 次）：
 * 
 * 选出两个下标（下标 从 0 开始 计数）i 和 j（i != j），并 更新 triplets[j] 为 [max(ai, aj), max(bi, bj), max(ci, cj)] 。
 * 例如，triplets[i] = [2, 5, 3] 且 triplets[j] = [1, 7, 5]，triplets[j] 将会更新为 [max(2, 1), max(5, 7), max(3, 5)] = [2, 7, 5] 。
 * 如果通过以上操作我们可以使得目标 三元组 target 成为 triplets 的一个 元素 ，则返回 true ；否则，返回 false 。
 * 示例 1：
 * 
 * 输入：triplets = [[2,5,3],[1,8,4],[1,7,5]], target = [2,7,5]
 * 输出：true
 * 解释：执行下述操作：
 * - 选择第一个和最后一个三元组 [[2,5,3],[1,8,4],[1,7,5]] 。更新最后一个三元组为 [max(2,1), max(5,7), max(3,5)] = [2,7,5] 。triplets = [[2,5,3],[1,8,4],[2,7,5]]
 * 目标三元组 [2,7,5] 现在是 triplets 的一个元素。
 * 示例 2：
 * 
 * 输入：triplets = [[1,3,4],[2,5,8]], target = [2,5,8]
 * 输出：true
 * 解释：目标三元组 [2,5,8] 已经是 triplets 的一个元素。
 * 示例 3：
 * 
 * 输入：triplets = [[2,5,3],[2,3,4],[1,2,5],[5,2,3]], target = [5,5,5]
 * 输出：true
 * 解释：执行下述操作：
 * - 选择第一个和第三个三元组 [[2,5,3],[2,3,4],[1,2,5],[5,2,3]] 。更新第三个三元组为 [max(2,1), max(5,2), max(3,5)] = [2,5,5] 。triplets = [[2,5,3],[2,3,4],[2,5,5],[5,2,3]] 。
 * - 选择第三个和第四个三元组 [[2,5,3],[2,3,4],[2,5,5],[5,2,3]] 。更新第四个三元组为 [max(2,5), max(5,2), max(5,3)] = [5,5,5] 。triplets = [[2,5,3],[2,3,4],[2,5,5],[5,5,5]] 。
 * 目标三元组 [5,5,5] 现在是 triplets 的一个元素。
 * 示例 4：
 * 
 * 输入：triplets = [[3,4,5],[4,5,6]], target = [3,2,5]
 * 输出：false
 * 解释：无法得到 [3,2,5] ，因为 triplets 不含 2 。
 *  
 * 
 * 提示：
 * 
 * 1 <= triplets.length <= 105
 * triplets[i].length == target.length == 3
 * 1 <= ai, bi, ci, x, y, z <= 1000
 */
/**
 * @param {number[][]} triplets
 * @param {number[]} target
 * @return {boolean}
 */
 var mergeTriplets = function(triplets, target) {

};