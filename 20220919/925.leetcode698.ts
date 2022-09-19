/**
 * 2022/09/20 每日一题 698. 划分为k个相等的子集
 * 给定一个整数数组  nums 和一个正整数 k，找出是否有可能把这个数组分成 k 个非空子集，其总和都相等。
 * 
 * 示例 1：
 * 
 * 输入： nums = [4, 3, 2, 3, 5, 2, 1], k = 4
 * 输出： True
 * 说明： 有可能将其分成 4 个子集（5），（1,4），（2,3），（2,3）等于总和。
 * 示例 2:
 * 
 * 输入: nums = [1,2,3,4], k = 3
 * 输出: false
 *  
 * 
 * 提示：
 * 
 * 1 <= k <= len(nums) <= 16
 * 0 < nums[i] < 10000
 * 每个元素的频率在 [1,4] 范围内
 */
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
 var canPartitionKSubsets = function(nums, k) {
    // 首先判断一些特例
    // 如果分组数量大于 原数组的数字个数，返回 false
    if(k > nums.length)
        return false
    // 如果是只分到一个组中，必然是可以的
    if(k === 1) 
        return true
    // 如果分组数和 num 个数相等，那么只能是每一个数组都相等
    if(k === nums.length) {
        for(let i=0; i < nums.length; ++i) {
            if(nums[i] !== nums[0])
                return false
        }
        return true
    }
    // 排序
    nums.sort((a, b) => b - a);
    // 计算总值
    let sum = 0;
    for(let i = 0; i < nums.length; ++i) {
        sum += nums[i]
    }
    // 用将要分组的个数新建一个数组，将用于保存该组的数字和
    let sums = new Array(k).fill(0)

    return divideArr(nums, sums, 0, k, sum/k)
};

function divideArr(nums, sums, i, k, average) {
    if(i === nums.length) return true
    // 用分组数进行循环，计算每一种分组情况跟 平均值的大小
    for(let j = 0; j < k; ++j) {
        // 判断条件
        if(sums[j] < average && nums[i] + sums[j] <= average) {
            // 条件成立， 将当前分组中加入此 num值
            sums[j] += nums[i]
            if(divideArr(nums, sums, i+1, k, average)) {  // 继续判断
                return true
            }
            // 如果 当前num 值放入到当前 分组中，后续不能找到合适的组合，则将这个 num 从当前分组中去掉
            sums[j] -= nums[i]
        }
    }
    return false
}