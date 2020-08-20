/**
 * 2020/08/20 每日一题 leetcode 529.扫雷游戏
 * 让我们一起来玩扫雷游戏！
 * 给定一个代表游戏板的二维字符矩阵。 'M' 代表一个未挖出的地雷，'E' 代表一个未挖出的空方块，'B' 代表没有相邻（上，下，左，右，和所有4个对角线）地雷的已挖出的空白方块，
 * 数字（'1' 到 '8'）表示有多少地雷与这块已挖出的方块相邻，'X' 则表示一个已挖出的地雷。
 * 现在给出在所有未挖出的方块中（'M'或者'E'）的下一个点击位置（行和列索引），根据以下规则，返回相应位置被点击后对应的面板：
 * 如果一个地雷（'M'）被挖出，游戏就结束了- 把它改为 'X'。
 * 如果一个没有相邻地雷的空方块（'E'）被挖出，修改它为（'B'），并且所有和其相邻的未挖出方块都应该被递归地揭露。
 * 如果一个至少与一个地雷相邻的空方块（'E'）被挖出，修改它为数字（'1'到'8'），表示相邻地雷的数量。
 * 如果在此次点击中，若无更多方块可被揭露，则返回面板。
 */
/**
 * @param {character[][]} board
 * @param {number[]} click
 * @return {character[][]}
 */
// dfs + 模拟 时间复杂度O(nm) 空间复杂度O(nm) n m分别代表面板的宽和高
var updateBoard = function(board, click) {
    let dirX = [0, 1, 0, -1, 1, 1, -1, -1]
    let dirY = [1, 0, -1, 0, 1, -1, 1, -1]
    const dfs = function(x, y) {
        let cnt = 0
        for (let i = 0; i < 8; i++) {
            let tx = x + dirX[i]
            let ty = y + dirY[i]
            if (tx < 0 || tx >= board.length || ty < 0 || ty >= board[0].length) continue  // 超出边界
            if (board[tx][ty] == 'M') { // 附近藏着的雷
                ++cnt 
            }
        }
        if (cnt > 0) {
            board[x][y] = cnt + "" // 显示附近几个雷(字符串形式显示)
        } else {
            board[x][y] = 'B'
            for (let i = 0; i < 8; i++) {
                let tx = x + dirX[i]
                let ty = y + dirY[i]
                if (tx < 0 || tx >= board.length || ty < 0 || ty >= board[0].length || board[tx][ty] != 'E') continue  // 超出边界
                dfs(tx, ty)
            }
        }
    }
    let fx = click[0], fy = click[1]
    if (board[fx][fy] == 'M') {
        board[fx][fy] = 'X'  // 挖到雷，直接置为X
    } else {
        dfs(fx, fy)
    }
    return board
};