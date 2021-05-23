/**
 * leetcode 第242场周赛
 * 5763.哪种连续子字符串更长
 * 给你一个二进制字符串 s 。如果字符串中由 1 组成的 最长 连续子字符串 严格长于 由 0 组成的 最长 连续子字符串，返回 true ；否则，返回 false 。
 * 
 * 例如，s = "110100010" 中，由 1 组成的最长连续子字符串的长度是 2 ，由 0 组成的最长连续子字符串的长度是 3 。
 * 注意，如果字符串中不存在 0 ，此时认为由 0 组成的最长连续子字符串的长度是 0 。字符串中不存在 1 的情况也适用此规则。
 * 
 *  
 * 
 * 示例 1：
 * 
 * 输入：s = "1101"
 * 输出：true
 * 解释：
 * 由 1 组成的最长连续子字符串的长度是 2："1101"
 * 由 0 组成的最长连续子字符串的长度是 1："1101"
 * 由 1 组成的子字符串更长，故返回 true 。
 * 示例 2：
 * 
 * 输入：s = "111000"
 * 输出：false
 * 解释：
 * 由 1 组成的最长连续子字符串的长度是 3："111000"
 * 由 0 组成的最长连续子字符串的长度是 3："111000"
 * 由 1 组成的子字符串不比由 0 组成的子字符串长，故返回 false 。
 * 示例 3：
 * 
 * 输入：s = "110100010"
 * 输出：false
 * 解释：
 * 由 1 组成的最长连续子字符串的长度是 2："110100010"
 * 由 0 组成的最长连续子字符串的长度是 3："110100010"
 * 由 1 组成的子字符串不比由 0 组成的子字符串长，故返回 false 。
 */
/**
 * @param {string} s
 * @return {boolean}
 */
 var checkZeroOnes = function(s) {
  let oneCount = 0, zeroCount = 0
  let nowCount = 1, nowNumber = s[0]
  for (let i = 1; i < s.length; i++) {
    if (s[i] !== nowNumber) {
      nowNumber === '1' ? oneCount = Math.max(oneCount, nowCount) : zeroCount = Math.max(zeroCount, nowCount)
      nowCount = 1
      nowNumber = s[i]
    } else {
      nowCount++
    }
  }
  nowNumber === '1' ? oneCount = Math.max(oneCount, nowCount) : zeroCount = Math.max(zeroCount, nowCount)
  return oneCount > zeroCount
};

/**
 * 5764.准时到达的列车最小时速
 * 给你一个浮点数 hour ，表示你到达办公室可用的总通勤时间。要到达办公室，你必须按给定次序乘坐 n 趟列车。另给你一个长度为 n 的整数数组 dist ，其中 dist[i] 表示第 i 趟列车的行驶距离（单位是千米）。
 * 
 * 每趟列车均只能在整点发车，所以你可能需要在两趟列车之间等待一段时间。
 * 
 * 例如，第 1 趟列车需要 1.5 小时，那你必须再等待 0.5 小时，搭乘在第 2 小时发车的第 2 趟列车。
 * 返回能满足你准时到达办公室所要求全部列车的 最小正整数 时速（单位：千米每小时），如果无法准时到达，则返回 -1 。
 * 
 * 生成的测试用例保证答案不超过 107 ，且 hour 的 小数点后最多存在两位数字 。
 * 
 *  
 * 
 * 示例 1：
 * 
 * 输入：dist = [1,3,2], hour = 6
 * 输出：1
 * 解释：速度为 1 时：
 * - 第 1 趟列车运行需要 1/1 = 1 小时。
 * - 由于是在整数时间到达，可以立即换乘在第 1 小时发车的列车。第 2 趟列车运行需要 3/1 = 3 小时。
 * - 由于是在整数时间到达，可以立即换乘在第 4 小时发车的列车。第 3 趟列车运行需要 2/1 = 2 小时。
 * - 你将会恰好在第 6 小时到达。
 * 示例 2：
 * 
 * 输入：dist = [1,3,2], hour = 2.7
 * 输出：3
 * 解释：速度为 3 时：
 * - 第 1 趟列车运行需要 1/3 = 0.33333 小时。
 * - 由于不是在整数时间到达，故需要等待至第 1 小时才能搭乘列车。第 2 趟列车运行需要 3/3 = 1 小时。
 * - 由于是在整数时间到达，可以立即换乘在第 2 小时发车的列车。第 3 趟列车运行需要 2/3 = 0.66667 小时。
 * - 你将会在第 2.66667 小时到达。
 * 示例 3：
 * 
 * 输入：dist = [1,3,2], hour = 1.9
 * 输出：-1
 * 解释：不可能准时到达，因为第 3 趟列车最早是在第 2 小时发车。
 */
/**
 * @param {number[]} dist
 * @param {number} hour
 * @return {number}
 */
 var minSpeedOnTime = function(dist, hour) {
  if (hour < dist.length - 1) return -1
  const helper = (speed) => {
    let time = 0
    for (let d of dist.slice(0, dist.length - 1)) {
      time += Math.ceil(d / speed)
    }
    time += dist[dist.length - 1] / speed
    return time <= hour
  }
  let l = 1, r = 10 ** 7 + 1
  while (l <= r) {
    let mid = (l + r) >> 1
    if (helper(mid)) {
      r = mid - 1
    } else l = mid + 1
  }
  return l
};

/** 
 * 5765. 跳跃游戏 VII
 * 给你一个下标从 0 开始的二进制字符串 s 和两个整数 minJump 和 maxJump 。一开始，你在下标 0 处，且该位置的值一定为 '0' 。当同时满足如下条件时，你可以从下标 i 移动到下标 j 处：
 * 
 * i + minJump <= j <= min(i + maxJump, s.length - 1) 且
 * s[j] == '0'.
 * 如果你可以到达 s 的下标 s.length - 1 处，请你返回 true ，否则返回 false 。
 * 示例 1：
 * 
 * 输入：s = "011010", minJump = 2, maxJump = 3
 * 输出：true
 * 解释：
 * 第一步，从下标 0 移动到下标 3 。
 * 第二步，从下标 3 移动到下标 5 。
 * 示例 2：
 * 
 * 输入：s = "01101110", minJump = 2, maxJump = 3
 * 输出：false
 */

/**
 * @param {string} s
 * @param {number} minJump
 * @param {number} maxJump
 * @return {boolean}
 */
 var canReach = function(s, minJump, maxJump) {
	let prev = [];
	// 记录当前index 之前可跳位置的个数  prev[i] - prev[j] > 0 则 j~i之间拥有可跳的位置
	prev[-1] = 0;
	for (let i = 0; i < s.length; i++) {
		if (s[i] == '0') {
			prev[i] = prev[i - 1] + 1;
		} else {
			prev[i] = prev[i - 1];
		}
	}

	let dp = new Array(s.length);
	dp[0] = true;
	for (let i = 1; i < dp.length; i++) {
		if (s[i] == '1') {
			dp[i] = false;
		} else {
			let min = i - maxJump;
			let max = i - minJump;
			if (max < 0) {
				// 根本跳不到这
				dp[i] = false;
			} else if (dp[Math.max(0,min)] || dp[max]) {
				// 两个端点就是可跳状态
				dp[i] = true;
			} else if (prev[max] - prev[Math.max(0,min)] == 0) {
				// 两个端点之间没有0  o(1)时间之道没有可跳过来的点 直接返回false  断掉了
				dp[i] = false;
				return false;
			} else {
				// 两个端点之间有0  有可跳过来的点 o(1)时间知道当前位置可以跳过来
				dp[i] = true;
			}
		}
	}
	return dp[dp.length - 1];
};