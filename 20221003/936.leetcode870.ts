/**
 * 2022/10/08 每日一题 870. 优势洗牌
 * 给定两个大小相等的数组 nums1 和 nums2，nums1 相对于 nums 的优势可以用满足 nums1[i] > nums2[i] 的索引 i 的数目来描述。
 * 
 * 返回 nums1 的任意排列，使其相对于 nums2 的优势最大化。
 * 
 *  
 * 
 * 示例 1：
 * 
 * 输入：nums1 = [2,7,11,15], nums2 = [1,10,4,11]
 * 输出：[2,11,7,15]
 * 示例 2：
 * 
 * 输入：nums1 = [12,24,8,32], nums2 = [13,25,32,11]
 * 输出：[24,32,8,12]
 *  
 * 
 * 提示：
 * 
 * 1 <= nums1.length <= 105
 * nums2.length == nums1.length
 * 0 <= nums1[i], nums2[i] <= 109
 */
 function advantageCount(nums1: number[], nums2: number[]): number[] {
    nums1 = nums1.sort((a, b) => a - b)
    const n2 = nums2.map((v, i) => [i, v]).sort((a, b) => a[1] - b[1])
    let result = []
    let left = 0, right = nums1.length - 1
    for (let i = n2.length - 1; i >= 0; i--) {
        const cur2 = n2[i]
        const cur1 = nums1[right]
        if (cur1 > cur2[1]) {
            result[cur2[0]] = cur1
            right--
        } else {
            result[cur2[0]] = nums1[left]
            left++
        }
    }
    return result
};