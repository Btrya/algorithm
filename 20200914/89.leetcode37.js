/**
 * 2020/09/15 每日一题 37. 解数独
 * https://leetcode-cn.com/problems/sudoku-solver/
 * 编写一个程序，通过已填充的空格来解决数独问题。
 * 一个数独的解法需遵循如下规则：
 * 
 * 数字 1-9 在每一行只能出现一次。
 * 数字 1-9 在每一列只能出现一次。
 * 数字 1-9 在每一个以粗实线分隔的 3x3 宫内只能出现一次。
 * 空白格用 '.' 表示。
 */
/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
class Sudoku {
	constructor(board) {
		this.board = board
		this.rows = new Array(9).fill(0)     // 行
		this.columns = new Array(9).fill(0)  // 列
		this.boxs = Array.from({ length: 3 }, () => new Array(3).fill(0)) // 3x3方格
		this.emptyCells = new Set()
	}
	solve() {
		// 初始化已知的数字
		for (let i = 0; i < 9; i++) {
			for (let j = 0; j < 9; j++) {
				let num = this.board[i][j]
				if (num !== '.') {
					// 数字转化为二进制标记
					// 1 -> 1,  2 -> 10,  3 -> 100, 4 -> 1000...
					const sign = 1 << (Number(num) - 1)
					this.rows[i] |= sign
					this.columns[j] |= sign
					this.boxs[Math.floor(i / 3)][Math.floor(j / 3)] |= sign
				} else {
					this.emptyCells.add((i << 4) | j)
				}
			}
		}
		// 主逻辑
		return this.fillNext()
	}
	fillNext() {
		let cellInfo = this.getEmptyCell()
		if (cellInfo == null) return true // 无空格，解题成功
		let [i, j, possible] = cellInfo
		while (possible) {
			const sign = -possible & possible // 截取其中一个可能性
			this.fillCell(i, j, sign) // 填入空格
			if (this.fillNext()) return true // 填充成功
			else {
				possible ^= sign // 排除当前数字
				this.cleanCell(i, j, sign)
			}
		}
		return false  // 穷尽所有可能性，回溯
	}
	getEmptyCell() {
		let min = 10
		let cellInfo = null
		for (const id of this.emptyCells) {
			const i = id >> 4, j = id & 0b1111
			const possible = this.getCellPossible(i, j)
			const count = this.countPossible(possible)
			if (min > count) {
				// 挑选可能性最少的格子，理论上可减少犯错回溯
				cellInfo = [i, j, possible]
				min = count
			}
		}
		return cellInfo
	}
	countPossible(possible) {
		// 计算二进制1的数量
		let count = 0
		while (possible) {
			possible &= (possible - 1)
			count ++
		}
		return count
	}
	fillCell(i, j, sign) {
		// 对应位变成1，标记占用
		this.rows[i] |= sign
		this.columns[j] |= sign
		this.boxs[Math.floor(i / 3)][Math.floor(j / 3)] |= sign
		// 填入空格
		this.emptyCells.delete((i << 4) | j)
		this.board[i][j] = String(Math.log2(sign) + 1)
	}
	cleanCell(i, j, sign) {
		// 对应位变为0， 清除占用
		this.rows[i] &= ~sign
		this.columns[j] &= ~sign
		this.boxs[Math.floor(i / 3)][Math.floor(j / 3)] &= ~sign
		// 清空格子
		this.emptyCells.add((i << 4) | j)
		this.board[i][j] = '.'
	}
	getCellPossible(i, j) {
		// 获取格子可能的取值，二进制1表示可选
		return (this.rows[i] | this.columns[j] | this.boxs[Math.floor(i / 3)][Math.floor(j / 3)]) ^ 0b111111111
	}
}
var solveSudoku = function(board) {
	new Sudoku(board).solve()
};  