/**
 * 2020/08/31 leetcode 每日一题 841.钥匙和房间
 * 有 N 个房间，开始时你位于 0 号房间。每个房间有不同的号码：0，1，2，...，N-1，并且房间里可能有一些钥匙能使你进入下一个房间。
 * 在形式上，对于每个房间 i 都有一个钥匙列表 rooms[i]，每个钥匙 rooms[i][j] 由 [0,1，...，N-1] 中的一个整数表示，其中 N = rooms.length。 
 * 钥匙 rooms[i][j] = v 可以打开编号为 v 的房间。
 * 最初，除 0 号房间外的其余所有房间都被锁住。
 * 你可以自由地在房间之间来回走动。
 * 如果能进入每个房间返回 true，否则返回 false。
 * 示例 1：
 * 
 * 输入: [[1],[2],[3],[]]
 * 输出: true
 * 解释:  
 * 我们从 0 号房间开始，拿到钥匙 1。
 * 之后我们去 1 号房间，拿到钥匙 2。
 * 然后我们去 2 号房间，拿到钥匙 3。
 * 最后我们去了 3 号房间。
 * 由于我们能够进入每个房间，我们返回 true。
 * 示例 2：
 * 
 * 输入：[[1,3],[3,0,1],[2],[0]]
 * 输出：false
 * 解释：我们不能进入 2 号房间。
 */
/**
 * @param {number[][]} rooms
 * @return {boolean}
 */
// 自己写栈 时间复杂度O(n + m) 时间复杂度O(n)
var canVisitAllRooms = function(rooms) {
    if (!rooms) return false
    let keyMap = new Map(), roomLen = rooms.length
    keyMap.set(0, true)
    let stack = []
    stack.push(rooms[0])
    while(stack.length > 0) {
        const now = stack.pop()
        for (let i = 0; i < now.length; i++) {
            if (!keyMap.has(now[i])) {
                keyMap.set(now[i], true)
                stack.push(rooms[now[i]])
            }
        }
    }
    return keyMap.size == roomLen
};

// 优化bfs
var canVisitAllRooms = function(rooms) {
    let opens = new Set()
    let keys = [0]
    while(keys.length) {
        let key = keys.shift()
        if (!opens.has(key)) {
            opens.add(key)
            for (let otherKey of rooms[key]) {
                keys.push(otherKey)
            }
        }
    }
    return opens.size >= rooms.length
};

// 优化dfs
var canVisitAllRooms = function(rooms) {
    let opens = new Set()
    let openRooms = (key) => {
        if (!opens.has(key)) {
            opens.add(key)
            for (let otherKey of rooms[key]) {
                openRooms(otherKey)
            }
        }
    }
    openRooms(0)
    return opens.size >= rooms.length
};