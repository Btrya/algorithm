/**
 * 2022/10/09 每日一题 856. 括号的分数
 * 给定一个平衡括号字符串 S，按下述规则计算该字符串的分数：
 * 
 * () 得 1 分。
 * AB 得 A + B 分，其中 A 和 B 是平衡括号字符串。
 * (A) 得 2 * A 分，其中 A 是平衡括号字符串。
 *  
 * 
 * 示例 1：
 * 
 * 输入： "()"
 * 输出： 1
 * 示例 2：
 * 
 * 输入： "(())"
 * 输出： 2
 * 示例 3：
 * 
 * 输入： "()()"
 * 输出： 2
 * 示例 4：
 * 
 * 输入： "(()(()))"
 * 输出： 6
 *  
 * 
 * 提示：
 * 
 * S 是平衡括号字符串，且只含有 ( 和 ) 。
 * 2 <= S.length <= 50
 */
 function scoreOfParentheses(s: string): number {
    const stk = new Array<number>()
    stk.push(0)
    for (const c of s) {
        if (c == '(') stk.push(0)
        else {
            const cur = stk.pop()
            stk.push(stk.pop() + Math.max(cur * 2, 1))
        }
    }
    return stk.pop()
};