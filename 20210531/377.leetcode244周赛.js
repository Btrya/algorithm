/**
 * 2021/06/06 第244场周赛
 * 5776. 判断矩阵经轮转后是否一致
 * 给你两个大小为 n x n 的二进制矩阵 mat 和 target 。现 以 90 度顺时针轮转 矩阵 mat 中的元素 若干次 ，
 * 如果能够使 mat 与 target 一致，返回 true ；否则，返回 false 。
 * 示例 1：
 * 输入：mat = [[0,1],[1,0]], target = [[1,0],[0,1]]
 * 输出：true
 * 解释：顺时针轮转 90 度一次可以使 mat 和 target 一致。
 * 示例 2：
 * 输入：mat = [[0,1],[1,1]], target = [[1,0],[0,1]]
 * 输出：false
 * 解释：无法通过轮转矩阵中的元素使 equal 与 target 一致。
 * 示例 3：
 * 输入：mat = [[0,0,0],[0,1,0],[1,1,1]], target = [[1,1,1],[0,1,0],[0,0,0]]
 * 输出：true
 * 解释：顺时针轮转 90 度两次可以使 mat 和 target 一致。
 * 提示：
 * 
 * n == mat.length == target.length
 * n == mat[i].length == target[i].length
 * 1 <= n <= 10
 * mat[i][j] 和 target[i][j] 不是 0 就是 1
 */
/**
 * @param {number[][]} mat
 * @param {number[][]} target
 * @return {boolean}
 */
var findRotation = function (mat, target) {
  for (let i = 0; i < 4; i++) {
    const val = rotate(mat).flat(Infinity).join('')
    if (target.flat(Infinity).join('') == val) return true
  }
  return false
};

function rotate(martix) {
  let tR = 0;
  let tC = 0;
  let dR = martix.length - 1;
  let dC = martix[0].length - 1;
  while (tR < dR) {
    rotateEdge(martix, tR++, tC++, dR--, dC--);
  }
  return martix
}

function rotateEdge(martix, tR, tC, dR, dC) {
  let times = dC - tC;
  let temp = 0;
  for (let i = 0; i !== times; i++) {
    temp = martix[tR][tC + i];
    martix[tR][tC + i] = martix[dR - i][tC];
    martix[dR - i][tC] = martix[dR][dC - i];
    martix[dR][dC - i] = martix[tR + i][dC];
    martix[tR + i][dC] = temp;
  }
  return martix
}

/**
 * 5777. 使数组元素相等的减少操作次数
 * 给你一个整数数组 nums ，你的目标是令 nums 中的所有元素相等。完成一次减少操作需要遵照下面的几个步骤：
 * 
 * 找出 nums 中的 最大 值。记这个值为 largest 并取其下标 i （下标从 0 开始计数）。如果有多个元素都是最大值，则取最小的 i 。
 * 找出 nums 中的 下一个最大 值，这个值 严格小于 largest ，记为 nextLargest 。
 * 将 nums[i] 减少到 nextLargest 。
 * 返回使 nums 中的所有元素相等的操作次数。
 * 示例 1：
 * 
 * 输入：nums = [5,1,3]
 * 输出：3
 * 解释：需要 3 次操作使 nums 中的所有元素相等：
 * 1. largest = 5 下标为 0 。nextLargest = 3 。将 nums[0] 减少到 3 。nums = [3,1,3] 。
 * 2. largest = 3 下标为 0 。nextLargest = 1 。将 nums[0] 减少到 1 。nums = [1,1,3] 。
 * 3. largest = 3 下标为 2 。nextLargest = 1 。将 nums[2] 减少到 1 。nums = [1,1,1] 。
 * 示例 2：
 * 
 * 输入：nums = [1,1,1]
 * 输出：0
 * 解释：nums 中的所有元素已经是相等的。
 * 示例 3：
 * 
 * 输入：nums = [1,1,2,2,3]
 * 输出：4
 * 解释：需要 4 次操作使 nums 中的所有元素相等：
 * 1. largest = 3 下标为 4 。nextLargest = 2 。将 nums[4] 减少到 2 。nums = [1,1,2,2,2] 。
 * 2. largest = 2 下标为 2 。nextLargest = 1 。将 nums[2] 减少到 1 。nums = [1,1,1,2,2] 。 
 * 3. largest = 2 下标为 3 。nextLargest = 1 。将 nums[3] 减少到 1 。nums = [1,1,1,1,2] 。 
 * 4. largest = 2 下标为 4 。nextLargest = 1 。将 nums[4] 减少到 1 。nums = [1,1,1,1,1] 。
 *  
 * 
 * 提示：
 * 
 * 1 <= nums.length <= 5 * 104
 * 1 <= nums[i] <= 5 * 104
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
 var reductionOperations = function(nums) {
  let res = 0
  let map = new Map()
  nums = nums.sort((a, b) => a - b)
  let count = 0
  for (let i = 0; i < nums.length; i++) {
    if (!map.has(nums[i])) map.set(nums[i], count++)
  }
  for (let i = 0; i < nums.length; i++) {
    res += map.get(nums[i])
  }
  return res
};
/**
 * 5778. 使二进制字符串字符交替的最少反转次数
 * 给你一个二进制字符串 s 。你可以按任意顺序执行以下两种操作任意次：
 * 
 * 类型 1 ：删除 字符串 s 的第一个字符并将它 添加 到字符串结尾。
 * 类型 2 ：选择 字符串 s 中任意一个字符并将该字符 反转 ，也就是如果值为 '0' ，则反转得到 '1' ，反之亦然。
 * 请你返回使 s 变成 交替 字符串的前提下， 类型 2 的 最少 操作次数 。
 * 
 * 我们称一个字符串是 交替 的，需要满足任意相邻字符都不同。
 * 
 * 比方说，字符串 "010" 和 "1010" 都是交替的，但是字符串 "0100" 不是。
 *  
 * 
 * 示例 1：
 * 
 * 输入：s = "111000"
 * 输出：2
 * 解释：执行第一种操作两次，得到 s = "100011" 。
 * 然后对第三个和第六个字符执行第二种操作，得到 s = "101010" 。
 * 示例 2：
 * 
 * 输入：s = "010"
 * 输出：0
 * 解释：字符串已经是交替的。
 * 示例 3：
 * 
 * 输入：s = "1110"
 * 输出：1
 * 解释：对第二个字符执行第二种操作，得到 s = "1010" 。
 *  
 * 
 * 提示：
 * 
 * 1 <= s.length <= 105
 * s[i] 要么是 '0' ，要么是 '1' 。
 */
/**
 * @param {string} s
 * @return {number}
 */
 var minFlips = function(s) {

};