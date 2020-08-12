/**
 * 2020/08/12 每日一题 leetcode 133.克隆图
 * https://leetcode-cn.com/problems/clone-graph/
 */

 /**
 * // Definition for a Node.
 * function Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */

/**
 * @param {Node} node
 * @return {Node}
 */
// DFS 栈
var cloneGraph = function(node) {
    if (!node) return null
    let map = new Map(), stack = [node], newNode = new Node(node.val, [])
    map.set(node.val, newNode)
    while(stack.length) {
        let _node = stack.pop()
        let _newNode = map.get(_node.val)
        _node.neighbors.forEach(element => {
            let _newNB = map.get(element.val)
            if (!_newNB) {
                stack.push(element)
                _newNB = new Node(element.val, [])
                map.set(element.val, _newNB)
            }
            _newNode.neighbors.push(_newNB)
        });
    }
    return newNode
};

// 递归
var cloneGraph = function(node) {
    const clone = (n, map) => {
        if (!n) return null
        let newNode = map.get(n)
        if (newNode) return newNode
        newNode = new Node(n.val)
        map.set(n, newNode)
        n.neighbors.forEach((element) => {
            newNode.neighbors.push(clone(element, map))
        })
        return newNode
    }
    return clone(node, new Map())
};