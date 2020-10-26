/**
 * 2020/10/26 每日一题 1365. 有多少小于当前数字的数字
 * 给你一个数组 nums，对于其中每个元素 nums[i]，请你统计数组中比它小的所有数字的数目。
 * 换而言之，对于每个 nums[i] 你必须计算出有效的 j 的数量，其中 j 满足 j != i 且 nums[j] < nums[i] 。
 * 以数组形式返回答案。
 * 示例 1：
 * 
 * 输入：nums = [8,1,2,2,3]
 * 输出：[4,0,1,1,3]
 * 解释： 
 * 对于 nums[0]=8 存在四个比它小的数字：（1，2，2 和 3）。 
 * 对于 nums[1]=1 不存在比它小的数字。
 * 对于 nums[2]=2 存在一个比它小的数字：（1）。 
 * 对于 nums[3]=2 存在一个比它小的数字：（1）。 
 * 对于 nums[4]=3 存在三个比它小的数字：（1，2 和 2）。
 * 示例 2：
 * 
 * 输入：nums = [6,5,4,8]
 * 输出：[2,1,0,3]
 * 示例 3：
 * 
 * 输入：nums = [7,7,7,7]
 * 输出：[0,0,0,0]
 * 提示：
 * 2 <= nums.length <= 500
 * 0 <= nums[i] <= 100
 */
/**
 * @param {number[]} nums
 * @return {number[]}
 */
// 暴力法 时间复杂度O(N^2) 空间复杂度O(1)
var smallerNumbersThanCurrent = function(nums) {
  if (!nums) return null
  let res = []
  for (let i of nums) {
    res.push(nums.filter(val => val < i).length)
  }
  return res
};

// 快速排序 时间复杂度O(NlogN) 空间复杂度O(N)
var smallerNumbersThanCurrent = function(nums) {
  const n = nums.length, data = new Array(n).fill(0).map(v => new Array(2).fill(0))
  for (let i = 0; i < n; i++) {
    data[i][0] = nums[i]
    data[i][1] = i
  }
  data.sort((a, b) => a[0] - b[0])
  const res = new Array(n)
  let prev = -1 
  for (let i = 0; i < n; i++) {
    if (prev == -1 || data[i][0] !== data[i - 1][0]) prev = i
    res[data[i][1]] = prev
  }
  return res
};

// 计数排序 时间复杂度O(N + K) 空间复杂度O(K)  K为值域大小  
var smallerNumbersThanCurrent = function(nums) {
  // 由于题目的值域为0 <= nums[i] <= 100 即[0, 100],可创建一个频次数组cnt
  const cnt = new Array(101).fill(0), n = nums.length, res = []
  // 第一次遍历 得出每个数的对应频次
  for (let i = 0; i < n; i++) {
    cnt[nums[i]] += 1
  }
  // 第二次遍历 得出某个数的所有比他小的数频次的和
  for (let i = 1; i <= 100; i++) {
    cnt[i] += cnt[i - 1]
  }
  // 第三次遍历 根据nums的数拿到对应数前一位（不能包括他自己的频次）的频次和
  for (let i = 0; i < n; i++) {
    res.push(nums[i] ? cnt[nums[i] - 1] : 0)
  }
  return res
};


/**
 * 补周赛题 1530. 好叶子节点对的数量 https://leetcode-cn.com/problems/number-of-good-leaf-nodes-pairs/
 */
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
