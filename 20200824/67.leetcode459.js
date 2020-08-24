/**
 * 2020/08/24 leetcode 每日一题459.重复的子字符串
 * 给定一个非空的字符串，判断它是否可以由它的一个子串重复多次构成。给定的字符串只含有小写英文字母，并且长度不超过10000。
 * 示例 1:
 * 输入: "abab"
 * 输出: True
 * 解释: 可由子字符串 "ab" 重复两次构成。
 * 示例 2:
 * 输入: "aba"
 * 输出: False
 * 示例 3:
 * 输入: "abcabcabcabc"
 * 输出: True
 * 解释: 可由子字符串 "abc" 重复四次构成。 (或者子字符串 "abcabc" 重复两次构成。)
 */
/**
 * @param {string} s
 * @return {boolean}
 */
// 枚举  时间复杂度O(n^2)  空间复杂度O(1)
var repeatedSubstringPattern = function (s) {
	const n = s.length
	for (let i = 1; i * 2 <= n; ++i) {
		if (n % i == 0) {
			let match = true
			for (let j = i; j < n; j++) {
				if (s.charAt(j) != s.charAt(j - i)) {
					match = false
					break
				}
			}
			if (match) return true
		}
	}
	return false
};


// 字符串匹配
var repeatedSubstringPattern = function (s) {
	return (s + s).indexOf(s, 1) != s.length
};

// KMP算法 时间复杂度O(n)  空间复杂度O(n)
var repeatedSubstringPattern = function (s) {
	const kmp = function(query, pattern) {
		let n = query.length, m = pattern.length, fail = new Array(m).fill(-1)
		for (let i = 1; i < m; i++) {
			let j = fail[i - 1]
			while(j != -1 && pattern.charAt(j + 1) != pattern.charAt(i)) {
				j = fail[j]
			}
			if (pattern.charAt(j + 1) == pattern.charAt(i)) {
				fail[i] = j + 1
			}
		}
		let match = -1
		for (let i = 1; i < n - 1; i++) {
			while (match != -1 && pattern.charAt(match + 1) != query.charAt(i)) {
				match = fail[match]
			}
			if (pattern.charAt(match + 1) == query.charAt(i)) {
				++match
				if (match == m - 1) {
					return true
				}
			}
		}
		return false
	}
	return kmp(s + s, s)
};

// 优化的KMP算法 时间复杂度O(n)  空间复杂度O(n)
var repeatedSubstringPattern = function (s) {
	const kmp = function(pattern) {
		const n = pattern.length
		let fail = new Array(n).fill(-1)
		for (let i = 1; i < n; i++) {
			let j = fail[i - 1]
			while (j != -1 && pattern.charAt(j + 1) != pattern.charAt(i)) {
				j = fail[j]
			}
			if (pattern.charAt(j + 1) == pattern.charAt(i)) {
				fail[i] = j + 1
			}
		}
		return fail[n - 1] != -1 && n % (n - fail[n - 1] - 1) == 0
	}
	return kmp(s)
};