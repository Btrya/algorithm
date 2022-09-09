/**
 * 2022/09/09 每日一题 1598. 文件夹操作日志搜集器
 * https://leetcode.cn/problems/crawler-log-folder/
 */
 function minOperations(logs: string[]): number {
    const stack = []
    for (let i = 0; i < logs.length; ++i) {
        if (logs[i] === './') continue
        if (logs[i] === '../') stack.length > 0 && stack.pop() 
        else stack.push(logs[i])
    }
    return stack.length
};