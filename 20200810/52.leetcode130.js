/**
 * 2020/08/11 leetcode 每日一题 130.被围绕的区域
 * 给定一个二维的矩阵，包含 'X' 和 'O'（字母 O）。
 * 找到所有被 'X' 围绕的区域，并将这些区域里所有的 'O' 用 'X' 填充。
 * 示例:
 * X X X X
 * X O O X
 * X X O X
 * X O X X
 * 运行你的函数后，矩阵变为：
 * X X X X
 * X X X X
 * X X X X
 * X O X X
 */
/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
// 遍历所有边界的O，将其和其他直接或间接和它相连的O标记为A；再全部执行遍历，没有标记为A的O标记为X，标记为A的标记回O
// 深度优先搜索
var solve = function(board) {
    let n = board.length
    if (n == 0) return
    let m = board[0].length
    for (let i = 0; i < n; i++) {
        dfs(i, 0)
        dfs(i, m - 1)
    }
    for (let i = 1; i < m -1; i++) {
        dfs(0, i)
        dfs(n - 1, i)
    }
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (board[i][j] == 'A') board[i][j] = 'O'
            else if (board[i][j] == 'O') board[i][j] = 'X'
        }
    }
    function dfs(x, y) {
        if (x < 0 || x >= n || y < 0 || y >= m || board[x][y] != 'O') return
        board[x][y] = 'A'
        dfs(x + 1, y)
        dfs(x - 1, y)
        dfs(x, y + 1)
        dfs(x, y - 1)
    }
};


// 广度优先搜索
var solve = function(board) {
    let dx = [1, -1, 0, 0], dy = [0, 0, 1, -1]
    let n = board.length
    if (n == 0) return
    m = board[0].length
    let queue = []
    for (let i = 0; i < n; i++) {
        if (board[i][0] == 'O') {
            queue.push([i, 0])
        }
        if (board[i][m - 1] == 'O') {
            queue.push([i, m - 1])
        }
    }
    for (let i = 1; i < m - 1; i++) {
        if (board[0][i] == 'O') {
            queue.push([0, i])
        }
        if (board[n - 1][i] == 'O') {
            queue.push([n - 1, i])
        }
    }
    while (queue.length > 0) {
        let cell = queue.shift()
        let x = cell[0], y = cell[1]
        board[x][y] = 'A'
        for (let i = 0; i < 4; i++) {
            let mx = x + dx[i], my = y + dy[i]
            if (mx < 0 || my < 0 || mx >= n || my >= m || board[mx][my] != 'O') continue
            queue.push([mx, my])
        }
    }
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (board[i][j] == 'A') board[i][j] = 'O'
            else if (board[i][j] == 'O') board[i][j] = 'X'
        }
    }
}